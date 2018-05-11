import * as actions from './actionTypes';
import Axios from 'axios';
import { beginAxiosCall } from './axiosStatusActions';

export function loadCheckoutsSuccess(individualCheckouts, teamCheckouts)
{
    return { type: actions.LOAD_CHECKOUTS_SUCCESS, individualCheckouts, teamCheckouts };
}

export function loadCheckouts(stringDate, lunchOrDinner){
    return dispatch => {
        dispatch(beginAxiosCall());
        Axios.post('http://localhost:61319/checkout/get-all-for-shift', {
            stringDate: stringDate,
            lunchOrDinner: lunchOrDinner
        }).then(res => 
        {
            const data = res.data;
            dispatch(loadCheckoutsSuccess(data.notRunCheckouts, data.teamCheckouts));
        }).catch(error => { throw(error);
        });
    }

}



