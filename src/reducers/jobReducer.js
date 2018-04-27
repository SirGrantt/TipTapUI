import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

function jobReducer(state = initialState.jobs, action)
{
    switch (action.type){
        case types.LOAD_ALL_JOBS_SUCCESS:
        return action.jobs;

        default:
         return state;
    }
}

export default jobReducer;