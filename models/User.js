const mongoose = require('mongoose');
// DB에 저장 시 Bcrypt(비밀번호를 암호화)라는 라이브러리를 사용함으로써 관리자도 암호를 모르게 하는게 목표
const bcrypt = require('bcrypt');
//salt가 몇글자인지 나타내는 saltRounds를 먼저 지정
const saltRounds = 10
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

// schema를 model로 감싸줌 (모델 이름, 스키마 이름)
const User = mongoose.model('User', userSchema)
// 이 model을 다른 파일에서도 사용가능하도록 설정
module.exports = { User }