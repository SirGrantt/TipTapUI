import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

export default function barTeamReducer(state = initialState.barCheckouts, action) {

  switch (action.type){
    case types.LOAD_BAR_CHECKOUTS_SUCCESS : {
      return action.barCheckouts;
    }

    default:
    return state;
  }
}