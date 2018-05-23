import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

function jobSelectReducer(state = initialState.selectedJob, action){
    switch (action.type){
        case(types.APPROVED_JOB_SELECTED_SUCCESS) :
        return action.selectedJob;

        default:
        return state;
    }
}

export default jobSelectReducer;