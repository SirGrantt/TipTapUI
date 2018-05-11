import * as type from '../reduxActions/actionTypes';
import initialState from './initialState';

function checkoutReducer(state = initialState.checkouts, action){
    switch(action.type) {
        case type.LOAD_CHECKOUTS_SUCCESS:
        const checkouts = [action.individualCheckouts, action.teamCheckouts]
        return [
            ...state,
            checkouts
        ];

        default:
        return state;
    }
}

export default checkoutReducer;