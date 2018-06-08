import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

export default function checkoutMapReducer(state = initialState.checkoutMap, action){
    switch(action.type){
        
        case types.CREATE_CHECKOUT_MAP_SUCCESS : {
            return action.checkoutMap;
        }

        default : 
        return state;
    }
}