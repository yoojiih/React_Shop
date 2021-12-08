const mongoose = require('mongoose');
// DB에 저장 시 Bcrypt(비밀번호를 암호화)라는 라이브러리를 사용함으로써 관리자도 암호를 모르게 하는게 목표
const bcrypt = require('bcrypt');
//salt가 몇글자인지 나타내는 saltRounds를 먼저 지정
const saltRounds = 10

const jwt = require('jsonwebtoken');
//mongoose를 이용해 schema 생성
const userSchema = mongoose.Schema({
  // 하나하나의 필드 작성
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        //입력한 이메일에 공백이 포함되어있을 경우 없애주는 역할
        trim: true,
        // 똑같은 이메일을 쓰지 못하게, 이메일 중복 방지
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    //일반 유저와 관리자를 구분
    role: {
        type: Number,
        default: 0
    },
    //object를 주지않고 string 이런식으로만 해도 됨
    image: String,
    //유효성 관리
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// < 회원가입(register) 라우터 작성 이후 >
// Register Router에서 유저 정보들을 데이터베이스(user model인 userSchema)에 저장(user.save)하기 전 
// 암호화하기 위해 server/models/User.js에서 유저 스키마를 가져와서 mongoose 메소드인 pre를 사용
// function 내 작업 끝나면 다시 user.save로 돌아가게끔 파라미터로 next를 넣어 이후에 next()function으로 user.save로 보냄
userSchema.pre('save', function (next) {
    var user = this;
    // userSchema 모델안의 필드 중 password가 변환될 때에만 비밀번호 암호화 되게 조건 달아줌
    // 조건 안달아주면 유저정보를 변경해 저장할 때마다 userSchema.pre쪽을 계속 바꾸게 되어 이메일만 변경해도 비밀번호를 암호화해버리는 문제가 발생하기 때문
    if (user.isModified('password')) {
        console.log('password changed')
        // < 비밀번호 암호화  - salt 생성> 후 salt를 생성함 
        // 다운받은 bcrypt를 가져와 salt생성 시 saltRounds(10)과 callback function()을 넣어줌
        bcrypt.genSalt(saltRounds, function (err, salt) {
            // 에러나면 err를 가져와서 리턴시켜 user.save로 돌아가고
            if (err) return next(err);

            //=================================
            //       To hash a password
            //=================================
            // salt를 제대로 생성했다면 다시 bcrypt를 가져와 암호화 되지 않은 비밀번호(user.password)와 생성된 salt를 이용해서 해시에 넣어줌으로써 비밀번호를 암호화 시킴
            // callback function으로 err와 hash(암호화된 비밀번호)를 넣어줌 
            // user.password: const user = new User(req.body)이런식으로 User 모델에 넣었기 때문에 
            //                var user = this;를 이용해 userSchema의 password를 user.password로 가져옴
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                // hash 생성 성공 시 user.password(암호화 되지 않은 비밀번호)를 hash된 비밀번호로 교체해주고 
                user.password = hash
                 // next()를 이용해서 user.save로 돌아감
                next()
            })
        })
    } else {
         //userSchema 모델안의 필드 중 password가 아닌 다른걸 바꾸면 바로 next()
        next()
    }
});


// < 로그인 라우터 작성 이후 - 받은 plainPassword를 암호화해 db에 있는 암호화된 비밀번호와 비교 >

// userSchema를 가져온 다음에 comparePassword function에 plainPassword, cb 을 준다음
userSchema.methods.comparePassword = function (plainPassword, cb) {

    // bcrypt를 가져와서 compare(plainPassword, userSchema에서 password(암호화된 비밀번호)를 가져옴, callback function )
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {

        // 비밀번호가 다르면 callback error를 줌
        if (err) return cb(err);

        // 같다면 cb을 줄때 에러는 없고(null) isMatch: 비밀번호가 같음(true)을 넘겨줌
        cb(null, isMatch);
    })
// 다시 login 라우터 쪽의 user.comparePassword(req.body.password, (err, isMatch) => { 로 가서 comparePassword 실행
}

// json Web Token 
userSchema.methods.generateToken = function (cb) {
    var user = this;
    // jsonwebtoken(jwt의 sign 메소드)을 이용해서 db내 user._id와 secretToken(아무거나)를 합쳐 token을 생성함
    // -> 나중에 token 해석 시 secretToken를 넣으면 user._id가 나오게 되기 때문에 이 사람이 누구인지 알 수 있음
    // toHexString(): toHexString을 사용해 user._id를 plain object로 변환시켜야 에러 발생하지 않음
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // 생성한 token을 userSchema에 있는 token 필드에 넣어줌
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        // save 성공 시 err는 없고(null) user정보만 user.generateToken((err, user) => { 로 다시 전달해줌 (index.js에서 token꺼내 씀)
        cb(null, user)
    })
} 
// Auth
userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    // 가져온 토큰을 decode(복호화)할 땐 verify 사용
    // 토큰 생성시 사용했던 secretToken을 넣어주면 decoded(디코드 된 결과물 = user_id)나옴
    jwt.verify(token, 'secret', function (err, decode) {
        // user_id 이용해서 유저를 찾은 다음 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        // user 가져온 후 findOne(mongoDB 메소드)을 통해 user_id(decoded)와 token으로 찾음 
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            // 에러 있다면 callback으로 에러를 전달해줌
            if (err) return cb(err);
            // 에러 없다면 user정보를 전달해주고 다시 미들웨어 auth.js에 가서 token과 err, user callback 써줌
            cb(null, user);
        })
    })
}

// schema를 model로 감싸줌 (모델 이름, 스키마 이름)
const User = mongoose.model('User', userSchema)
// 이 model을 다른 파일에서도 사용가능하도록 설정
module.exports = { User }