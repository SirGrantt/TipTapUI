import * as types from './actionTypes';
import moment from 'moment';

export function setStartDateSuccess(moment){
    return { type: types.SET_STARTDATE_SUCCESS, moment };
}

export function setInitialStartDate(){
    return {type: types.SET_INITIAL_START_DATE, moment: moment() };
}