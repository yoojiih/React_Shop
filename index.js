const express = require('express')
// express function을 이용해서 새로운 express app을 만들고 
const app = express()
// port는 아무값이나 설정해도 됨 ex) 3000, 4000, 5000 
// 5000을 back server로 둘 거기 때문에 5000으로 설정
const port = 5000
// client와 server가 통신하기 위해 필요한 것
// browser 측에서 정보를 입력 시 서버측에서 받아서 처리하는 형식 (npm i body-parser)
// 설치 후 bodyparser 가져옴
const bodyParser = require("body-parser");
// config.mongoURI: mongo db에서 유저 생성 후 복사한 connection app code
const mongoose = require("mongoose");

//useNewUrlParser: true, useUnifiedTopology: true -> 에러 방지용 코드
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// 연결 잘 됐을 경우
  .then(() => console.log('MongoDB Connected...'))
  // 연결 잘 안 됐을 경우 에러 표시
  .catch(err => console.log(err));
//----- body parser option-------
// client에서 오는 정보(application/x-www-form-urlencoded 이렇게 된 데이터)를 서버에서 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({ extended: true }));
// post 메소드를 이용하며 라우터의 end point는 register, callback function을  (req, res) => 넣어줌
// http://localhost:5000/register
app.use(bodyParser.json());
//-------------------------------

// express app은 루트 URL(/) 또는 라우트에 대한 요청에 “Hello World!”로 응답하며 다른 모든 경로에 대해서는 404 Not Found로 응답
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// post 메소드를 이용하며 라우터의 end point는 register, callback function을  (req, res) => 넣어줌
// http://localhost:5000/register
// 회원가입을 위한 register 라우터 생성
router.post("/register", (req, res) => {

  // 정보들을 db에 넣기 위해서 request.body 작성

  // User: client에서 가져온 회원 가입 할떄 필요한 정보들을 데이터 베이스에 넣어주기 위해 User model을 가져옴 
  //const user: 이걸 이용해 user 인스턴스 생성
  // (req.body): bodyparser를 이용해 받아온 json 형식으로 된 {id: "", password:""} client측 정보 들어가있음
  const user = new User(req.userInfo);
 // save: mongo db 메소드 => req.body의 정보들이 user model에 저장됨
  user.save((err, doc) => {
      // 저장 시 
      // 에러가 있다면 client에다가 json 형식으로 에러가 있다고 에러 메시지와 함께 전달
      if (err) return res.json({ success: false, err });
       // 성공한다면 저장한 user info를 client에다가 성공했다는 표시인 status(200)을 json형식으로 success: true라는 정보를 전달
      return res.status(200).json({
        success: true
      });
  });
});

// app은 서버를 시작하며 5000번 포트에서 연결을 listen하면 콘솔 출력되도록함
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
