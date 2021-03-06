import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

function approvedJobs(state = initialState.approvedJobs, action){

    switch (action.type){
        case types.LOAD_APPROVED_JOBS_SUCCESS:
        return action.jobs;

        default:
        return state;
    }
}

export default approvedJobs;