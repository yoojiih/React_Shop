import React, { useState } from "react";
// < 이미 아이디가 있다면 부분 1 > 
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [formErrorMessage, setFormErrorMessage] = useState('')

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
}

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

  const onSubmit= (event) => {
    event.preventDefault();
    
    const body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem('userId', response.payload.userId);
          props.history.push("/");
        } else {
          setFormErrorMessage('Check out your Account or Password again')
        }
      })
      .catch(err => {
        setFormErrorMessage('Check out your Account or Password again')
        setTimeout(() => {
          setFormErrorMessage("")
        }, 3000);
      });
    }
  return(

    <div className="app">
      
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* 로고 */}
            <h1 className="mt-6 text-center text-9xl font-extrabold text-white" style={{fontFamily: 'Permanent Marker'}}>Log In</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              <Link className="hover:text-indigo-500" style={{ color: 'gray', textDecoration: 'none', minWidth:'350px', marginTop:'10px'}} to="register">아직 아이디가 없다면...  </Link>
            </p>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={Email}
                  onChange={onEmailHandler} 
                />
              </div>
              <br />
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={Password}
                  onChange={onPasswordHandler}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-white focus:bg-yellow-200 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-white hover:text-yellow-200">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onSubmit={onSubmit}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-100"
              >
                Sign in
              </button>
            </div>
            <br />
            {formErrorMessage && (
              <label ><p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>{formErrorMessage}</p></label>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);