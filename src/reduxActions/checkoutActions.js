import * as actions from "./actionTypes";
import Axios from "axios";
import { beginAxiosCall } from "./axiosStatusActions";
import { removeServerTeamEarning } from './teamActions';
import { loadBarCheckoutsSuccess } from './barCheckoutActions';

export function loadCheckoutsSuccess(individualCheckouts, teamCheckouts) {
  return {
    type: actions.LOAD_CHECKOUTS_SUCCESS,
    individualCheckouts,
    teamCheckouts
  };
}

export function addCheckoutSuccess(checkout) {
  return { type: actions.ADD_CHECKOUT_SUCCESS, checkout };
}

export function createCheckoutMapSuccess(checkoutMap) {
  return { type: actions.CREATE_CHECKOUT_MAP_SUCCESS, checkoutMap };
}

export function removeCheckoutFromServerTeamSuccess(removeFromTeamData) {
  return { type: actions.REMOVE_CHECKOUT_FROM_TEAM_SUCCESS, removeFromTeamData };
}

export function addCheckoutToServerTeamSuccess(updatedCheckoutData) {
  return { type: actions.ADD_CHECKOUT_TO_TEAM_SUCCESS, updatedCheckoutData };
}

export function updateCheckoutSuccess(updatedCheckout) {
  return { type: actions.UPDATE_CHECKOUT_SUCCESS, updatedCheckout };
}

export function deleteCheckoutSuccess(checkoutId, teamId) {
  return { type: actions.DELETE_CHECKOUT_SUCCESS, checkoutId, teamId };
}

export function trackRanCheckoutsSuccess(teamCheckouts){
  return {type: actions.TRACK_RAN_CHECKOUTS_SUCCESS, teamCheckouts};
}

export function removeTrackedRanCheckoutTeamsSuccess(destId, sourceId) {
  return { type: actions.REMOVE_TRACKED_RAN_CHECKOUT_TEAMS, destId, sourceId};
}


export function loadCheckouts(stringDate, lunchOrDinner) {
  return dispatch => {
    dispatch(beginAxiosCall());
    Axios.post("http://localhost:61319/checkout/get-all-for-shift", {
      stringDate: stringDate,
      lunchOrDinner: lunchOrDinner
    })
      .then(res => {
        const data = res.data;
        dispatch(trackRanCheckoutsSuccess(data.teamCheckouts));
        dispatch(
          loadCheckoutsSuccess(data.notRunCheckouts, data.teamCheckouts)
        );
        dispatch(loadBarCheckoutsSuccess(data.barCheckouts));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addCheckout(checkout) {
  return dispatch => { 
    Axios.post("http://localhost:61319/checkout/create", checkout)
      .then(res => {
        const checkout = res.data;
        checkout.staffMemberName = `${checkout.staffMember.firstName} ${checkout.staffMember.lastName}`;
        dispatch(addCheckoutSuccess(checkout));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addCheckoutToServerTeam(addToTeamData) {
 const { checkoutId, teamId, sourceId, stringDate } = addToTeamData;
  return dispatch => {
    dispatch(removeTrackedRanCheckoutTeamsSuccess(teamId, sourceId));
    dispatch(beginAxiosCall());
    if (sourceId === 'Individual')
    {
    Axios.post('http://localhost:61319/team/add-checkout', {
      checkoutId,
      serverTeamId: teamId
    }).then( () => {
      dispatch(addCheckoutToServerTeamSuccess({ checkoutId, sourceId, teamId }));
    }).catch( err => {
      throw err;
    });
  } else {
    Axios.post('http://localhost:61319/team/remove-checkout-from-server-team', {
      checkoutId,
      serverTeamId: sourceId,
      stringDate,
      lunchOrDinner: 'dinner'
    }).then( () => {
      Axios.post('http://localhost:61319/team/add-checkout', {
        checkoutId,
        serverTeamId: teamId
      }).then( () => {
        dispatch(addCheckoutToServerTeamSuccess({ checkoutId, sourceId, teamId }));
      }).catch( err => {
        throw err;
      });
    }).catch(err => {
      throw err;
    });
  }
  };
}


export function removeCheckoutFromServerTeam(removeFromTeamData) {
  const { checkoutId, sourceId, stringDate } = removeFromTeamData;
  return dispatch => {
    dispatch(removeTrackedRanCheckoutTeamsSuccess(-1, sourceId));
    dispatch(removeCheckoutFromServerTeamSuccess(removeFromTeamData));
    Axios.post('http://localhost:61319/team/remove-checkout-from-server-team', {
      checkoutId,
      serverTeamId: sourceId,
      stringDate,
      lunchOrDinner: 'dinner'
    }).catch(error => {
      throw error;
    });
  };
}

export function updateCheckout(checkout, teamId, stringDate) {
  return dispatch => {
    if (teamId === null) {
    dispatch(updateCheckoutSuccess(checkout));
    Axios.post('http://localhost:61319/checkout/update',
      checkout
    ).catch(err => {
      throw err;
    });
  }
  else {
    dispatch(removeTrackedRanCheckoutTeamsSuccess(-1, teamId));
    dispatch(removeServerTeamEarning(teamId));
    Axios.post('http://localhost:61319/team/reset-checkout', {
      serverTeamId: teamId,
      stringDate,
      lunchOrDinner: 'dinner'
    }).then(dispatch(updateCheckoutSuccess(checkout))).then(
      Axios.post('http://localhost:61319/checkout/update',
        checkout
      ).catch(err => {
        throw err;
      })
    );
  }
  };
}

export function deleteCheckout(checkoutId, teamId, stringDate) {
  return dispatch => {
    if (teamId === null) {
      dispatch(deleteCheckoutSuccess(checkoutId, teamId));
      Axios.post('http://localhost:61319/checkout/delete', {
        checkoutId
      }).catch(err => {
        throw err; });
    }
    else {
      dispatch(removeTrackedRanCheckoutTeamsSuccess(-1, teamId));
      dispatch(removeServerTeamEarning(teamId));
      Axios.post('http://localhost:61319/team/reset-checkout', {
      serverTeamId: teamId,
      stringDate,
      lunchOrDinner: 'dinner'
      }).then(dispatch(deleteCheckoutSuccess(checkoutId, teamId))).then(
      Axios.post('http://localhost:61319/checkout/delete', {
        checkoutId
      })).catch(err => {
        throw err; });
    }
  };
}
