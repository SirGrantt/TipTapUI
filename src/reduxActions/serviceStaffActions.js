import MockServiceStaffApi from '../../MockAPIs/MockServiceStaffApi';
import * as types from './actionTypes';
import Axios from 'axios';

export function loadServiceStaffSuccess(staff) {
  return { type: types.LOAD_SERVICE_STAFF_SUCCESS, staff };
}

export function postStaffMemberSuccess(staffMember){
  return {type: types.POST_STAFF_MEMBER_SUCCESS, staffMember};
}

export function loadAllJobsSuccess(jobs) {
  return {type: types.LOAD_ALL_JOBS_SUCCESS, jobs};
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
}  
*/

//Create reducer to handle putting this data into state, create call for getting a specific
//staffmembers jobs, create call points for these methods, ultimately figure out how to handle
//errors as well. For now just get it up. 
export function loadAllJobs(){
  return dispatch => {
    Axios.get('http://localhost:61319/staff/jobs').then(
      res => { const jobs = res.data
      dispatch(loadAllJobsSuccess(jobs));
    }).catch(error => {
      throw (error);
    });
  };
}
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
  

