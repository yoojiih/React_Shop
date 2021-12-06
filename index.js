const express = require('express')
// express function을 이용해서 새로운 express app을 만들고 
const app = express()
// port는 아무값이나 설정해도 됨 ex) 3000, 4000, 5000 
// 5000을 back server로 둘 거기 때문에 5000으로 설정
const port = 5000
// express app은 루트 URL(/) 또는 라우트에 대한 요청에 “Hello World!”로 응답하며 다른 모든 경로에 대해서는 404 Not Found로 응답
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app은 서버를 시작하며 5000번 포트에서 연결을 listen하면 콘솔 출력되도록함
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
