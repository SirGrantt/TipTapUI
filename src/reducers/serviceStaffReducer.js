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
    
    case types.UPDATE_STAFF_MEMBER_NAME_SUCCESS:
    let indexOfStaffMember = state.findIndex(s => s.id == action.staffMember.id);

    return state.map((s, index) => (index == indexOfStaffMember) ? 
    { ...s, ...action.staffMember} : s);

    default:
      return state;
  }
}

export default serviceStaffReducer;
