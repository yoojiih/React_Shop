import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import Gnb from "./views/Gnb/Gnb";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';

import ProductListPage from './views/ProductListPage/ProductListPage';
import DetailPage from './views/DetailPage/DetailPage.js';
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      {/* 전체 레이아웃 */}
      <div style={{backgroundColor: '#c8bbab'}}>
          <Gnb />
          {/* 랜딩화면 전체 속성 지정 */}
          {/* HTML에 스타일을 직접 넣고 싶으면(비추) JSX 상에서는 무조건 {} 스타일용 오브젝트로 바꿔 넣어야함 
          속성명 규칙:-(대쉬)기호 X, 모든 단어 붙여써야 되고 붙일 때 앞글자 → 대문자로 치환
            <div style={ 속성명 : '속성값' }> 글씨 </div>
          ex) <div style={ {color : 'blue', fontSize : '30px'} }> 글씨 </div> */}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 1px)', background: '#C8BBAB', minWidth: '100%'}}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
            <Route exact path="/user/cart" component={Auth(CartPage, true)} />
            <Route exact path="/history" component={Auth(HistoryPage, true)} />

            <Route exact path="/product" component={Auth(ProductListPage, null)} />
            <Route exact path="/detail/:id" component={Auth(DetailPage, null)} />
          </Switch>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;