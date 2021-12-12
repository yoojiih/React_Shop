// < 유효성 체크 UI 1 - 기본 셋팅> , < UseRef - 3 > import useRef 라이브러리에서 가져옴
import React, { useRef, useState } from 'react'
// < 유효성 체크 1 - react-hook-form 사용 이유 : 간단하게 폼의 유효성을 검사가능 (state 대체) > < auth >
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from "../../../_actions/user_actions";
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();
    // < 유효성 체크 >
    // 사용자가 입력할 때마다 추적 하기 위한 register, watch, formState을 import useForm을 통해 가져옴
    //  version 1. 입력시 즉각적으로 유효성 체크 에러표시
    //             const { register, watch, formState: { errors }, handleSubmit} = useForm({mode: "onChange"});
    // version 2. submit button누르기 전까진 유효성 체크 안함
    //            const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const { register, watch, formState: { errors }, handleSubmit} = useForm({mode: "onChange"});
    // < 에러메시지 출력 1 >
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    
    // < Button 누르지 못하게 막기 1>
    const [loading, setLoading] = useState(false);
    
    //< UseRef 2 > 
    const password = useRef();
    
    //< UseRef 3 >
    password.current = watch("password");
    //실시간 입력되는지 테스트 : console.log('password.current', password.current)

    const onSubmit = async (data) => {
       // event.preventDefault();
        try {
            setLoading(true)
            //console.log('data',data);
            // if (Password !== ConfirmPassword) {
            //     return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
            // }
            // 대소문자 주의!
            const body = {
                email: data.email,
                password: data.password,
                name: data.name
            }
            dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
            setLoading(false)
    } catch (error) {
        // < 에러메시지 출력 3 - 에러시 에러메시지 담아줄 state인 setErrorFromSubmit에다가 "message"부분만 에러메시지 저장
        setErrorFromSubmit(error.message)

        // < Button 누르지 못하게 막기 4 -firebase에서 에러를 전달해 주더라도 false로 state변환 >
        setLoading(false)

        //  < 에러메시지 출력 5 - 오류메시지 5초후에 사라지게 >
        setTimeout(() => {
            setErrorFromSubmit("")
        }, 5000);
    }
}

return (
  <div className="app">
      
  <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        {/* 로고 */}
        <h1 className="mt-6 text-center text-8xl font-extrabold text-white" style={{fontFamily: 'Permanent Marker'}}>Sign Up</h1>
      </div>
      {/*  Submit버튼 눌렀을 때 onSubmit 이벤트에 따른 함수처리
      react-hook-form'이용 시 useForm에서 handleSubmit이라는 코드를 가져와서 form에 넣은 다음 여기다가 함수를 넣어줘야함*/}
      {/* (Form태그 안에서 파라미터 형식으로 handleSubmit(onSubmit) 불러옴) */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {/* 유효성 체크 - 위 required 위반시 에러문구 설정 */}
            {errors.email && <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>This email field is required</p>}
          </div>
          <br />
          <div>
            <label htmlFor="email-address" className="sr-only">
              Name
            </label>
            <input
              id="email-address"
              name="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="name"
             // < 유효성 체크 >
            // 관찰할 때 register로 등록해줘야함 
            // required: true => 이메일은 not null값이라는 의미 (필수 입력 값)
            // pattern: 이메일에 맞는 정규식  
            {...register("name", { required: true, maxLength: 10 })}
            />
            {/* 유효성 체크 - 위 required 위반시 에러문구 설정 */}
            {/* 조건 2개중 required 위반 시 */}
            {errors.name && errors.name.type === "required" && <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>This name field is required</p>}
            {/* 조건 2개중 maxLength 위반 시 */}
            {errors.name && errors.name.type === "maxLength" && <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>Your input exceed maximum length</p>}
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
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === "required" && <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>This password field is required</p>}
            {errors.password && errors.password.type === "minLength" && <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>Password must have at least 6 characters</p>}
          </div>
          <br />
          {/* UseRef를 이용해 Password와 Password Confirm 일치 여부 구현 */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password Confirm
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="password confirm"
              {...register("password_confirm", {
                required: true,
                // < useRef 5 >
                validate: (value) =>
                    value === password.current
              })}
            />
            {errors.password_confirm && errors.password_confirm.type === "required" && <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>This password confirm field is required</p>}
            {/* < useRef 5 >*/}
            {errors.password_confirm && errors.password_confirm.type === "validate" && <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>The passwords do not match</p>}
          </div>
          {/* < 에러메시지 출력 4> */}
          {errorFromSubmit &&
              <p style={{ color: '#ff0000bf', fontSize: '1rem', padding: '0.3rem', borderRadius: '10px', minWidth: '350px'}}>{errorFromSubmit}</p>
          }
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            onSubmit={onSubmit}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-100"
          >
            SUBMIT
          </button>
        </div>
        <br />
      </form>
    </div>
  </div>
</div>
  )
}

export default withRouter(RegisterPage)