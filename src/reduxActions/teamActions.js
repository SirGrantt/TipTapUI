import * as actions from './actionTypes';
import Axios from 'axios';
import { beginAxiosCall } from './axiosStatusActions';

export function addServerTeamSuccess(serverTeam) {
  return { type: actions.ADD_SERVER_TEAM_SUCCESS, serverTeam };
}

export function runTeamCheckoutSuccess(teamId) {
  return { type: actions.RUN_TEAM_CHECKOUT_SUCCESS, teamId};
}

export function addEarningToTeamSuccess(teamId, teamEarning) {
  return { type: actions.ADD_EARNING_TO_TEAM, teamId, teamEarning };
}

export function removeServerTeamEarning(teamId) {
  return { type: actions.REMOVE_SERVER_TEAM_EARNING, teamId };
}

export function addServerTeam(date) {
  return dispatch => {
    dispatch(beginAxiosCall);
    Axios.post('http://localhost:61319/team/create', {
      lunchOrDinner: 'dinner',
      stringDate: date
    }).then(
      res => {
        const team = res.data;

        // These values have to be added because the expected data structure down the line will look for them
        // when updating state as changes are made, particularly in the checkout board mappings
        team.teamId = team.id;
        team.teamCheckouts = [];
        dispatch(addServerTeamSuccess(team));
      }).catch(err => {
        throw(err);
    });
  };
}

export function runServerTeamCheckout(teamId, lunchOrDinner, stringDate){
  return dispatch => {
    dispatch(beginAxiosCall);
    Axios.post('http://localhost:61319/team/run-checkout', {
      serverTeamId: teamId,
      stringDate,
      lunchOrDinner
    }).then(res => {
      let data = res.data;
      dispatch(runTeamCheckoutSuccess(teamId));
      dispatch((addEarningToTeamSuccess(teamId, data.serverEarnings[0])));
    }).catch(err => {
      throw err;
    });
  };

}

