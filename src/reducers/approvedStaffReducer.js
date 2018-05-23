import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

function approvedStaffReducer(state = initialState.approvedStaff, action)
{
    switch(action.type){
        case(types.LOAD_APPROVED_STAFF_SUCCESS) :
        return action.approvedStaff;

        default:
        return state;
    }
}

export default approvedStaffReducer;