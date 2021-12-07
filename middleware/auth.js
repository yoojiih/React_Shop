const { User } = require('../models/User');
// auth 정의
const auth = (req, res, next) => {
    //=================================
    //          인증 처리
    //=================================
    // 1. cookie parser를 이용해 클라이언트 쿠키(w_auth라는 이름으로 넣음)에서 토큰을 가져옴
    const token = req.cookies.w_auth;
    // 2. 유저 모델{ User }을 불러 온 후 server/models/User.js에서 메소드를 만들어서 토큰을 복호화 한후 유저 찾음
    User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저 없다면 (= 인증 실패)
    // index.js내 findByToken메소드로 돌아가지 못하고 클라이언트에  isAuth: false, error: true 정보 전해주고 빠져나가게 됨 
    if (!user)
        return res.json({
        isAuth: false,
        error: true
        });
    // 유저 있다면 (= 인증 완료)

    // router(index.js)에서 request 받아서 사용하게 하기 위해 미들웨어에서 token(위에서 받아옴)과 user를 넣어줌
    req.token = token;
    req.user = user;
    // 미들웨어에서 다음으로 넘어갈 수 있게함
    next();
    });
};
// auth를 다른 파일에서도 사용가능하도록 export - index.js에서 import
module.exports = { auth };
