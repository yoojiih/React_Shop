import React from 'react'

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function ItemList({ list },props) {
    // res.data와 같은 결과
    console.log('list[0]:',list[0]);
    //(74) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // 0: {id: 740, brand: 'dior', name: '\n                            Junon\n                            ', price: '20.0', price_sign: '£', …}
    // 1: {id: 730, brand: 'dior', name: '\n                            Matte\n                            ', price: '20.0', price_sign: '£', …}  
    const item = ['']; 
    // const item = [{id : 0, brand: '', name : '', price : '', price_sign:'' ...}];
    for (const key in list) {
        //0~73
        //console.log('key',key) 
        console.log(list[key])
        // const item = list[key];
        item.push(list[key]);
        console.log('item:',item)
        //{id: 662, brand: 'dior', name: 'Dior Holiday Couture Collection', price: '77.0', price_sign: '£', …}
        //console.log(key[0]);....
    }

    return (
    <>
        {/* ------------------- */}
        <div className="max-w-2xl my-auto mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 bg-white">
        {/* <div style={{ textAlign: 'center', marginBottom: '2rem' }}> */}
        {/* text Aligment */}
        {/* text-left, text-center, text-right, text-justify */}
            <h2 className=" text-9xl mb-8 text-center font-extrabold tracking-tight"style={{fontFamily: 'Permanent Marker'}} >Products List</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {/*  리스트 반복문 : map 안의 코드는 list array내 자료 개수만큼 실행됨 (3열짜리)
                            콜백함수 소괄호 내 파라미터로 product입력 시 array내 모든 data를 순서대로 하나씩 꺼냄
                            map을 돌 때는 항상 key가 있어야함 
                */}
                {item.map((item) => (
                    <Link to={`/detail/${item.id}`}>
                
                    <div key={item.id} className="group relative">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                        src={item.image_link}
                        alt={item.name} 
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                    </div>
                    <div className="mt-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700"> {item.name} </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900 my-2">${item.price}USD</p>
                    </div>
                </div>
                </Link>
                ))}
            </div>
            </div>
        </>
    );
}
