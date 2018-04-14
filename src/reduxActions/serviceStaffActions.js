import MockServiceStaffApi from '../../MockAPIs/MockServiceStaffApi';
import * as types from './actionTypes';
import Axios from 'axios';

export function loadServiceStaffSuccess(staff) {
  return { type: types.LOAD_SERVICE_STAFF_SUCCESS, staff };
}

export function postStaffMemberSuccess(staffMember){
  return {type: types.POST_STAFF_MEMBER_SUCCESS, staffMember};
}

/*
export function loadServiceStaff() {
  return dispatch => {
    Axios.get('http://localhost:61319/staff').then( res => {
      const staff = res.data
      dispatch(loadServiceStaffSuccess(staff));
    }).catch(error => {
      throw (error);
    });
  };
  
*/
 export function loadServiceStaff() {
  return dispatch => {
    MockServiceStaffApi.getAllStaff().then( staff => {
      dispatch(loadServiceStaffSuccess(staff));
    }).catch(error => {
      throw (error);
    });
  };
 }
  export function saveStaffMember(staffMember){
    return dispatch => {
      Axios.post('http://localhost:61319/staff/staff-editor', {
        firstName: staffMember.firstName,
        lastName: staffMember.lastName
      }).then(dispatch(postStaffMemberSuccess(staffMember)))
      .catch(error => {
        throw (error);
      });
    };
  }
  

