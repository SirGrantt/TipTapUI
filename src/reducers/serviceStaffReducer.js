import * as types from '../reduxActions/actionTypes';
import initialState from './initialState';

function serviceStaffReducer(state = initialState.serviceStaff, action) {

  switch (action.type) {
    case types.LOAD_SERVICE_STAFF_SUCCESS:
      return action.staff;

    case types.POST_STAFF_MEMBER_SUCCESS:
    return [
      ...state,
      Object.assign({}, action.staffMember)
    ];

    default:
      return state;
  }
}

export default serviceStaffReducer;
