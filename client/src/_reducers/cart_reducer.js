import {
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER,
    INCREMENT,
    DECREMENT,
} from '../_actions/types';

const initialState = { 
    cart: [],
    total: 0,
 }; // 초기 상태 정의

const cart = (state = initialState, action) => {
//export default function (state = {}, action) {
    switch (action.type) {
        case ADD_TO_CART_USER:
            const list = state.cart.find((request) => request.id === action.payload.id)
            if (list) {
                list.count += action.payload.count;
            }else {
                const addToCart = {
                    id: action.payload.id,
                    name: action.payload.name,
                    image_link: action.payload.image_link,
                    price: action.payload.price,
                    count: 1,
                };
                state.cart.push(addToCart);
            }
            return {
                ...state,
                cart: [...state.cart],
                total: state.total + action.payload.price,
                ...state, userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case GET_CART_ITEMS_USER:
            return {
                ...state, cartDetail: action.payload
            }
        case REMOVE_CART_ITEM_USER:
            return {
                ...state,
                cart: state.cart.filter((request) => request.id !== action.payload.id),
                total: state.total - (action.payload.price * action.payload.count),
            };   
        case ON_SUCCESS_BUY_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetail: action.payload.cartDetail
            }
        case INCREMENT: 
            const plus = state.cart.find((request) => request.id === action.payload.id);
            
            if (plus) {
                plus.count += 1;
            }

            return {
                ...state,
                cart: [...state.cart],
                total: state.total + action.payload.price,
            };
        case DECREMENT:
            const minus = state.cart.find((request) => request.id === action.payload.id);
            
            if (minus && minus.count > 1) {
                minus.count -= 1;

                return {
                    ...state,
                    cart: [...state.cart],
                    total: state.total - action.payload.price,
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart],
                    total: state.total,
                };
            }
        default:
            return state;
    }
}
export default cart;