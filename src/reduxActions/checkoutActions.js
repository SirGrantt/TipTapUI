import * as actions from "./actionTypes";
import Axios from "axios";
import { beginAxiosCall } from "./axiosStatusActions";

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

export function addCheckoutToServerTeamSuccess(updatedCheckoutData) {
  return { type: actions.ADD_CHECKOUT_TO_TEAM_SUCCESS, updatedCheckoutData };
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
        dispatch(
          loadCheckoutsSuccess(data.notRunCheckouts, data.teamCheckouts)
        );
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
  console.log(sourceId);
  return dispatch => {
    dispatch(addCheckoutToServerTeamSuccess({ checkoutId, sourceId, teamId }));
    if (sourceId === 'Individual')
    {
    Axios.post('http://localhost:61319/server-teams/add-checkout', {
      checkoutId,
      serverTeamId: teamId
    }).then( () => {
      
    }).catch( err => {
      throw err;
    });
  } else {
    Axios.post('http://localhost:61319/server-teams/remove-checkout-from-server-team', {
      checkoutId,
      serverTeamId: sourceId,
      stringDate,
      lunchOrDinner: 'dinner'
    }).then( () => {
      Axios.post('http://localhost:61319/server-teams/add-checkout', {
        checkoutId,
        serverTeamId: teamId
      }).then( () => {
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
  return dispatch => {
    Axios.post('http://localhost:61319/checkout/create')
  }
}

/*{
        
      stringDate: stringDate,
      nonTipOutBarSales: formattedCheckout.nonTipOutBarSales,
      numberOfBottlesSold: formattedCheckout.numberOfBottlesSold,
      lunchOrDinner: checkout.lunchOrDinner,
      sales: checkout.sales,
      grossSales: checkout.grossSales,
      barSales: checkout.barSales,
      ccTips: checkout.ccTips,
      cashTips: checkout.cashTips,
      ccAutoGrat: checkout.ccAutoGrat,
      cashAutoGrat: checkout.cashAutoGrat,
      hours: checkout.hours,
      staffMemberId: checkout.staffMemberId,
      jobWorkedTitle: checkout.jobWorkedTitle 
    }*/
