const mongoose = require('mongoose');
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
// schema를 model로 감싸줌 (모델 이름, 스키마 이름)
const User = mongoose.model('User', userSchema)
// 이 model을 다른 파일에서도 사용가능하도록 설정
module.exports = { User }