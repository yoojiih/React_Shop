import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import Item from "./Item";
//function ProductListPage(props) {

function DetailPage({ match, location }) {
    console.log("match",match)
    //{path: '/detail/:id', url: '/detail/740', isExact: true, params: {…}}
    // isExact: true
    // params: {id: '740'}
    // path: "/detail/:id"
    // url: "/detail/740"
    // [[Prototype]]: Object
    console.log("location",location)
    //{pathname: '/detail/740', search: '', hash: '', state: undefined}
    // hash: ""
    // pathname: "/detail/740"
    // search: ""
    // state: undefined
    // [[Prototype]]: Object
    const id = match.params.id;

    const [list, setList] = useState({});

    // const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=dior"
    const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
    //const API_URL = "http://makeup-api.herokuapp.com/api/v1/products/${id}.json?brand=dior"
    console.log('API_URL', API_URL);

    function getData(){
		axios.get(API_URL)
			.then((res) => {
        console.log("res.dataaaa",res.data);
        console.log("res.data.image_link",res.data.image_link); 
        setList(res.data);
        console.log("list",list); 
		});
	}
    useEffect(() => {
        getData();
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <Item list={list} />
            {/* <div onClick={() => dispatch(addToCart(list2))}></div> */}
        </div>
    )
}

export default withRouter(DetailPage)