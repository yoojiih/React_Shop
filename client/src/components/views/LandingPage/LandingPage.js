import React, { useEffect } from 'react'
import axios from 'axios';
function LandingPage(props) {
  // LandingPage에 들어오자마자 실행되는 부분
    useEffect(() => {
      //get request를 서버(server/index.js)로 보냄. end point는 /api/hello
        axios.get('/api/hello')
            // 서버에서 돌아오는 response를 콘솔창에 출력
            .then(response => { console.log(response) })
    }, [])
    return (
        <div>
            <h2>시작 페이지</h2>
        </div>
    )
}
export default LandingPage