import initialState from './initialState';
import * as types from '../reduxActions/actionTypes';

export default function ranCheckoutsTeamReducer(state = initialState, action) {

  switch (action.type) {

    case types.TRACK_RAN_CHECKOUTS_SUCCESS : {
     let teamIds = [];

     action.teamCheckouts.map(t => t.checkoutHasBeenRun && teamIds.push(t.teamId));

     return teamIds;
    }

    case types.REMOVE_TRACKED_RAN_CHECKOUT_TEAMS : {
      let stateCopy = state.slice();
      let filteredState = stateCopy.filter(t => t !== action.destId && t !== action.sourceId);

      return filteredState;
    }

    default :
    return state;
  }
}