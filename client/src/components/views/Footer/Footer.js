import React from 'react'
import './index.css';
function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', fontSize:'1rem',
            backgroundColor: '#c8bbab'
        }}>
        {/* <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            backgroundColor: '#c8bbab'
        }}></div> */}
            <p className="pp" style={{color: 'white'}}> ENQUIRIES maintain126@namver.com </p> 
        </div>
    )
}
export default Footer