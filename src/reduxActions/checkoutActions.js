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
      console.log(checkout);  
    Axios.post("http://localhost:61319/checkout/create", checkout)
      .then(res => {
        const checkout = res.data;
        dispatch(addCheckoutSuccess(checkout));
      })
      .catch(error => {
        throw error;
      });
  };
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
