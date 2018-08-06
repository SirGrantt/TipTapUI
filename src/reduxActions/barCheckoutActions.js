import * as types from './actionTypes';

export function loadBarCheckoutsSuccess(barCheckouts) {
  return { type: types.LOAD_BAR_CHECKOUTS_SUCCESS, barCheckouts}
}