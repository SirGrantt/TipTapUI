import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

export default function checkoutMapReducer(state = initialState.checkoutMap, action){
    switch(action.type){
        
        case types.CREATE_CHECKOUT_MAP_SUCCESS : {
            return action.checkoutMap;
        }

        
        case types.ADD_SERVER_TEAM_SUCCESS : {
        let title = `Team: ${action.serverTeam.id}`;
        let newState = {...state};
        newState[title] = [];
        return {
            ...newState
        };
    }
        default : 
        return state;
    }
}