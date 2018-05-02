import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

function typeEndsInSuccess(type){
    return type.substring(type.length - 8) == '_SUCCESS';
}

export default function (state = initialState.axiosLoading, action){
    if (action.type == types.BEGIN_AXIOS_CALL){
        return state = true;
    }
    else if (action.type == types.AXIOS_ERROR || 
        typeEndsInSuccess(action.type)){
            return state = false;
        }
    
    return state;

}