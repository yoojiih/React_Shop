import { combineReducers } from 'redux';
import user from './user_reducer';
import cart from './cart_reducer';

const rootReducer = combineReducers({
    user,
    cart

})

export default rootReducer;