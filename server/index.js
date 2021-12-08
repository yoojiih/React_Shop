const express = require('express')
// express function을 이용해서 새로운 express app을 만들고 
const app = express()
// port는 아무값이나 설정해도 됨 ex) 3000, 4000, 5000 
// 5000을 back server로 둘 거기 때문에 5000으로 설정
const port = 5000
// client와 server가 통신하기 위해 필요한 것 -> browser 측에서 정보를 입력 시 서버측에서 받아서 처리하는 형식 
// npm i body-parser 설치 후 bodyparser 가져옴
const bodyParser = require("body-parser");
// cookie parser 사용하기 위한 작업
const cookieParser = require('cookie-parser');
// 개발환경 분리(로컬 vs 배포모드)
const config = require("./config/key");
// config.mongoURI: mongo db에서 유저 생성 후 복사한 connection app code
const mongoose = require("mongoose");

//useNewUrlParser: true, useUnifiedTopology: true -> 에러 방지용 코드
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // 연결 잘 됐을 경우
  .then(() => console.log('MongoDB Connected...'))
  // 연결 잘 안 됐을 경우 에러 표시
  .catch(err => console.log(err));

//=================================
//       body parser option
// client에서 오는 정보(application/x-www-form-urlencoded 이렇게 된 데이터)를 서버에서 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 걸 분석해서 가져올 수 있게 함
app.use(bodyParser.json());
//=================================

app.use(cookieParser());

// express app은 루트 URL(/) 또는 라우트에 대한 요청에 “Hello World!”로 응답하며 다른 모든 경로에 대해서는 404 Not Found로 응답
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// request를 받는 router 생성 
// 클라이언트측에서 get으로 줬으니 get메소드 사용, end point는 /api/hello, (req, res) callback을 주고 
// 원래 라우터 같은 경우 request받은 걸로 처리 후 front로 다시 response줌 (지금은 프론트에 response(메시지)만 줌)
app.get('/api/hello', (req, res) => {
  res.send('Hello World!~~ ')
})
//=================================
//  auth router 생성 (접근 권한 설정)
//=================================
// 미들웨어를 추가 (미들웨어: end point(/api/users/auth)의 request를 받은 후 callback function을 하기 전 중간(auth)에서 뭔갈 작업하기 위함) 
// (middleware/auth.js)
app.get("/api/users/auth", auth, (req, res) => {
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
app.post("/api/users/register", (req, res) => {
  // 정보들을 db에 넣기 위해서 request.body 작성
  // - User: client에서 가져온 회원 가입 할떄 필요한 정보들을 데이터 베이스에 넣어주기 위해 User model을 가져옴 
  // - const user: 이걸 이용해 user 인스턴스 생성
  // - (req.body): bodyparser를 이용해 받아온 json 형식으로 된 {id: "", password:""} client측 정보 들어가있음
  const user = new User(req.userInfo);
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


app.post("/api/users/login", (req, res) => {
  //=================================
  //요청된(브라우저에 입력한) 이메일이 데이터베이스에 있는지 찾기
  //=================================
  // User모델을 가져와서 findOne(mongoDB method)으로 찾고자 하는 이메일을 넣어 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
       // return시 response를 client에다가 json 데이터로 loginSuccess와 message를 줌
          return res.json({
              loginSuccess: false,
              message: "제공된 이메일에 해당하는 User가 존재하지 않습니다"
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
              return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" });
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
app.get("/api/users/logout", auth, (req, res) => {
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

// app은 서버를 시작하며 5000번 포트에서 연결을 listen하면 콘솔 출력되도록함
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
