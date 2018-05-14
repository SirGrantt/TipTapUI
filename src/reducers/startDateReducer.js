import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

function startDateReducer(state = initialState.startDate, action){
    switch(action.type){
        case types.SET_STARTDATE_SUCCESS : 

        return action.moment;

        case types.SET_INITIAL_START_DATE :
        return action.moment;

        default : 
        return state;
    }
}

export default startDateReducer;