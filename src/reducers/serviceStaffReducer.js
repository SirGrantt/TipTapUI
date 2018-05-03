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

    //This is working but is apprently mutating state. need to find the way to do this without mutating state.
    case types.UPDATE_STAFF_MEMBER_NAME_SUCCESS:
    let oldData = state.find(s => s.id == action.staffId);
    let index = state.indexOf(oldData);
    state.splice(index, 1);
    return [
      ...state,
      {firstName: action.firstName, lastName: action.lastName, id: action.staffId, status: "active"}
    ];

    default:
      return state;
  }
}

export default serviceStaffReducer;
