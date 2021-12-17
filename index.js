const express = require('express')
// express function을 이용해서 새로운 express app을 만들고 
const app = express()
const path = require("path");
const cors = require('cors')

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
const connect = mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true })
  // 연결 잘 됐을 경우
  .then(() => console.log('MongoDB Connected...'))
  // 연결 잘 안 됐을 경우 에러 표시
  .catch(err => console.log(err));

app.use(cors())

//=================================
//       body parser option
// client에서 오는 정보(application/x-www-form-urlencoded 이렇게 된 데이터)를 서버에서 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 걸 분석해서 가져올 수 있게 함
app.use(bodyParser.json());
//=================================
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
// --------------------
// express app은 루트 URL(/) 또는 라우트에 대한 요청에 “Hello World!”로 응답하며 다른 모든 경로에 대해서는 404 Not Found로 응답
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// request를 받는 router 생성 
// 클라이언트측에서 get으로 줬으니 get메소드 사용, end point는 /api/hello, (req, res) callback을 주고 
// 원래 라우터 같은 경우 request받은 걸로 처리 후 front로 다시 response줌 (지금은 프론트에 response(메시지)만 줌)
// app.get('/api/hello', (req, res) => {
//   res.send('Hello World!~~ ')
// })
//-----------------------
// port는 아무값이나 설정해도 됨 ex) 3000, 4000, 5000 
// 5000을 back server로 둘 거기 때문에 5000으로 설정
//const port = 5000
const port = process.env.PORT || 5000

// app은 서버를 시작하며 5000번 포트에서 연결을 listen하면 콘솔 출력되도록함
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})