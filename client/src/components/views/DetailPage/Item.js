import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

//tailwind
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ItemList({ list }) {

    const dispatch = useDispatch();
    console.log('list',list);
    const list2 = [];
    const json = Object.create(null);
    json.Id = list.id;
    json.Name = list.name;
    json.Img = list.image_link;
    json.Price = list.price;
    json.Description = list.count;
    json.Quantity = 1;

    list2.push(json);
    return (
    <div>
{/* ----------------- */}
<div className="">
    <div className="pt-0 flex flex-col">
        <h2 className=" text-9xl my-auto mb-8 text-center font-extrabold tracking-tight text-white" style={{fontFamily: 'Permanent Marker'}} >Detail Page</h2>        
        {/* Image gallery */}
        <div className="flex justify-around ">
        <div className="mt-6 ">
            {/* mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:gap-x-8 */}
            {/* <div className="hidden aspect-w-3 aspect-h-5 rounded-lg overflow-hidden lg:block"> */}
                <img
                src={list.image_link}
                alt={list.name}
                className="w-full h-full object-center object-cover"
                />
            {/* </div> */}
        </div>
        {/* <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-1"> </div> */}

        <div className="flex flex-col">
            
                <h1 className="font-extrabold tracking-tight text-white sm:text-4xl" style={{fontFamily: 'Permanent Marker'}}>{list.name}</h1>
                <br />
                <p className="text-3xl text-white" style={{fontFamily: 'Permanent Marker'}}>${list.price}</p>
                <form className="mt-1">
                <button
                    type="submit"
                    onClick={() => dispatch(addToCart(list2))}
                    className="mt-10 w-full bg-white border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add to Cart
                </button>
                </form>
        </div>
        {/* Product info */}
        </div>
        </div>
    </div>
    </div>
    );
}