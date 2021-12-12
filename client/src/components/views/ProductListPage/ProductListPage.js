import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import ItemList from "./ItemList";
function ProductListPage(props) {
    const [list, setList] = useState({});
    const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=dior"

    function getData(){
		axios.get(API_URL)
			.then((res) => {
        console.log("res.dataaaa",res.data);
        setList(res.data);
		});
	}
    
    //useEffect HOOK: 진입 시 한번만 api 호출하기 위함
    useEffect(() => {
        getData();
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '90%', height: '100vh'
        }}>
            <ItemList list={list} />
        </div>
    )
}

export default withRouter(ProductListPage)
