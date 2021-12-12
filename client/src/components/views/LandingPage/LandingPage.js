import React, { useEffect } from 'react'
import axios from 'axios';
import logo from './logo.svg';
import './index.css';

function LandingPage(props) {

//   // LandingPage에 들어오자마자 실행되는 부분
//     useEffect(() => {
//       //get request를 서버(server/index.js)로 보냄. end point는 /api/hello
//         axios.get('/api/hello')
//             // 서버에서 돌아오는 response를 콘솔창에 출력
//             .then(response => { console.log(response) })
//     }, [])

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>


            {/* <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                </header>
            </div> */}
            <div style={{ textAlign: 'center' }}>
                <h1 className="land" style={{ fontSize: '150px', color: 'white'}}>  The <a style= {{ fontSize: '200px'}}>more</a> you sweat in peace, the <a style= {{ fontSize: '200px'}}>less</a> you bleed in war.  </h1>
            </div>
            {/* The more you sweat in peace, the less you bleed in war.  */}
            {/* Filter  */}
        </div>
    )
}
export default LandingPage