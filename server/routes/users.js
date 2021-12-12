const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require('../models/Product');
const { auth } = require("../middleware/auth");
const { Payment } = require('../models/Payment');

const async = require('async');

//=================================
//             User
//=================================

//=================================
//  auth router 생성 (접근 권한 설정)
//=================================
// 미들웨어를 추가 (미들웨어: end point(/api/users/auth)의 request를 받은 후 callback function을 하기 전 중간(auth)에서 뭔갈 작업하기 위함) 
// (middleware/auth.js)
// app.get("/api/users/auth", auth, (req, res) => {
router.get("/auth", auth, (req, res) => {
    // 여기 까지 미들웨어를 통과해 온 건 Authentication = True 라는 뜻
    // res.status(200): 클라이언트에 authentication = ture 라는 정보를 전달해주기 위함
    // json데이터로 클라이언트에 원하는 유저 정보(server/models/User.js내 userSchema)를 제공해줌
    res.status(200).json({
         //req.user._id => middleware에서 req.user = user 이런식으로 request에 넣어줬었기 때문에 가능함
        //이렇게 정보를 주면 어떤 페이지에서든지 유저 정보를 이용 가능함
        _id: req.user._id,
         // 0이면 false(일반유저) 아니면 ture(관리자)
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});
  //=================================
  //  회원가입을 위한 register 라우터 생성
  //=================================
  // user에 관한 api를 생성  -> express에서 제공되는 router를 이용
  // post 메소드를 이용하며 라우터의 end point는 register, callback function을  (req, res) => 넣어줌
  // http://localhost:5000/register
router.post("/register", (req, res) => {
    // 정보들을 db에 넣기 위해서 request.body 작성
    // - User: client에서 가져온 회원 가입 할떄 필요한 정보들을 데이터 베이스에 넣어주기 위해 User model을 가져옴 
    // - const user: 이걸 이용해 user 인스턴스 생성
    // - (req.body): bodyparser를 이용해 받아온 json 형식으로 된 {id: "", password:""} client측 정보 들어가있음
    const user = new User(req.body);
    //  ------------저장하기 전-----------------
    // save (mongo db 메소드): req.body의 정보들이 user model에 저장
    user.save((err, doc) => {
        // 에러가 있다면 client에다가 json 형식으로 에러가 있다고 에러 메시지와 함께 전달
        if (err) return res.json({ success: false, err });
        // 성공한다면 저장한 user info를 client에다가 성공 표시인 status(200)을 json형식으로 success: true라는 정보를 전달
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    //=================================
    //요청된(브라우저에 입력한) 이메일이 데이터베이스에 있는지 찾기
    //=================================
    // User모델을 가져와서 findOne(mongoDB method)으로 찾고자 하는 이메일을 넣어 찾음
    User.findOne({ email: req.body.email }, (err, user) => {
         // return시 response를 client에다가 json 데이터로 loginSuccess와 message를 줌
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        //=================================
        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 같은지 확인
        //=================================
        // user안에는 유저의 이름, 비밀번호, 이메일이 들어있음
        // 여기서 comparePassword(작명가능) 메소드를 생성해 req.body.password(암호화 되기 전 비밀번호)와 callback function으로 두가지 인자(argument)를 넣음
        // 에러 시 err, 비밀번호를 비교해서(브라우저 == db)일치 시 isMatch로 맞는지 가져오는 메소드를 유저 모델에서 만듦
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            // isMatch가 없으면 비밀번호가 틀렸다는 뜻
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
            //=================================
            //비밀번호가 맞다면 그 유저를 위한 토큰을 생성
            //=================================
            // 토큰 생성 시 generateToken(작명가능) 메소드를 생성   
            user.generateToken((err, user) => {
                // 에러가 있다면 res.status(400)을 클라이언트에 전해주고 err메시지도 같이 전달해줌
                if (err) return res.status(400).send(err);
                // user: (User.js) user.token에 넣은 토큰을 받아온 상태 
                // 받아온 토큰을 보통 쿠키 or 로컬스토리지 or session 저장을 해서 보관하는데 여기선 쿠키에다가 저장함 (보안문제로 나뉨)
                // 쿠키에다 저장 시 토큰 저장을 user.token을 아무 이름(w_auth)으로 지정
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});
  //=================================
  //        로그아웃 라우터 생성
  //=================================
  // 로그인된 상태기 때문에 auth 미들웨어를 넣어줌
router.get("/logout", auth, (req, res) => {
    // 로그아웃 하려는 유저(User)를 데이터베이스에서 찾아서 그 유저의 토큰을 지워줌 (업데이트)
    // 첫번째 object: 유저를 찾을 땐 auth 미들웨어에서 request에 넣어준 _id로 찾음
    User.findOneAndUpdate({ _id: req.user._id }, 
        // 두번재 object : 토큰을 지워줌
        // 인증 시 클라이언트 쿠키에 있는 토큰을 서버쪽 db에 있는 토큰과 같은지 확인을 함으로써 인증을 완료했었기 때문에 
        // 로그아웃 시 토큰을 지워주면 인증실패해 로그인 기능이 풀려버림
        { token: "", tokenExp: "" }
        // 마지막으로 callback function
        , (err, doc) => {
        // 에러 시
        if (err) return res.json({ success: false, err });
        // 성공 시
        return res.status(200).send({
            success: true
        });
    });
});


router.get('/addToCart', auth, (req, res) => {

    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        let duplicate = false;

        console.log(userInfo)

        userInfo.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })


        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.query.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.query.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
});


router.get('/removeFromCart', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query._id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
})


router.get('/userCartInfo', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })


            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({ success: true, cartDetail, cart })
                })

        }
    )
})




router.post('/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {};

    //1.Put brief Payment Information inside User Collection 
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    //2.Put Payment Information that come from Paypal into Payment Collection 
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData;
    transactionData.product = history


    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });


            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });

                //3. Increase the amount of number for the sold information 

                //first We need to know how many product were sold in this transaction for 
                // each of products

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                // first Item    quantity 2
                // second Item  quantity 3

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })

            })
        }
    )
})


router.get('/getHistory', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, doc) => {
            let history = doc.history;
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, history })
        }
    )
})


module.exports = router;