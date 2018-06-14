import * as type from '../reduxActions/actionTypes';
import initialState from './initialState';

function checkoutReducer(state = initialState.checkouts, action){
    switch(action.type) {
        case type.LOAD_CHECKOUTS_SUCCESS: {
        const checkouts = { individual: [], team: [] };
        checkouts.individual = action.individualCheckouts;
        checkouts.team = action.teamCheckouts;
        return checkouts;
        }
        
        case type.ADD_CHECKOUT_SUCCESS :
        return {
            individual: [
                ...state.individual,
                Object.assign({}, action.checkout)
            ],
            team: [
                ...state.team
            ]
        };

        default:
        return state;
    }
}

export default checkoutReducer;