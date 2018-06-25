import * as actions from './actionTypes';
import Axios from 'axios';
import { beginAxiosCall } from './axiosStatusActions';

export function addServerTeamSuccess(serverTeam) {
  return { type: actions.ADD_SERVER_TEAM_SUCCESS, serverTeam };
}

export function addServerTeam(date) {
  return dispatch => {
    dispatch(beginAxiosCall);
    Axios.post('http://localhost:61319/server-teams/create', {
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

