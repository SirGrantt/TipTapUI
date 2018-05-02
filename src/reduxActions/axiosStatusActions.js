import * as types from './actionTypes';

export function beginAxiosCall(){
    return {type: types.BEGIN_AXIOS_CALL};
}

export function AxiosError(){
    return {type: types.AXIOS_ERROR};
}