import MockServiceStaffApi from '../../MockAPIs/MockServiceStaffApi';
import * as types from './actionTypes';
import Axios from 'axios';
import { beginAxiosCall, AxiosError } from './axiosStatusActions';

export function loadServiceStaffSuccess(staff) {
  return { type: types.LOAD_SERVICE_STAFF_SUCCESS, staff };
}

export function postStaffMemberSuccess(staffMember){
  return {type: types.POST_STAFF_MEMBER_SUCCESS, staffMember};
}

export function loadAllJobsSuccess(jobs) {
  return {type: types.LOAD_ALL_JOBS_SUCCESS, jobs};
}

export function loadApprovedJobsSuccess(jobs){
  return { type: types.LOAD_APPROVED_JOBS_SUCCESS, jobs};
}

export function updateStaffMemberJobsSuccess(){
  return { type: types.UPDATE_STAFF_MEMBER_SUCCESS };
}

export function updateStaffMemberError(){
  return { type: types.AXIOS_ERROR };
}

export function updateStaffMemberNameSuccess(staffMember){
  return { type: types.UPDATE_STAFF_MEMBER_NAME_SUCCESS, staffMember }
}


export function loadServiceStaff() {
  return dispatch => {
    dispatch(beginAxiosCall());
    Axios.get('http://localhost:61319/staff').then( res => {
      const staff = res.data;
      dispatch(loadServiceStaffSuccess(staff));
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateJobApproval(staffMemberId, approvedJobIds, unappprovedJobIds){
  return dispatch => {
    dispatch(beginAxiosCall());
    return Axios.post('http://localhost:61319/staff/add-approved-job', {
      staffMemberId: staffMemberId,
      jobIds: approvedJobIds
    }).then(
    Axios.post('http://localhost:61319/staff/remove-job-approval',
    {
      staffMemberId: staffMemberId,
      jobIds: unappprovedJobIds 
    })).then(
    dispatch(updateStaffMemberJobsSuccess())
  ).catch(error => { dispatch(updateStaffMemberError());
  });
  };
}

//Create reducer to handle putting this data into state, create call for getting a specific
//staffmembers jobs, create call points for these methods, ultimately figure out how to handle
//errors as well. For now just get it up. 
export function loadAllJobs(){
  return dispatch => {
    Axios.get('http://localhost:61319/staff/jobs').then(
      res => { const jobs = res.data;
      dispatch(loadAllJobsSuccess(jobs));
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateStaffMemberName(staffMember){
    return dispatch => {
      return Axios.put('http://localhost:61319/staff/staff-editor/' + staffMember.id,{
        firstName: staffMember.firstName,
        lastName: staffMember.lastName
      }).then(dispatch(updateStaffMemberNameSuccess(staffMember)))
      .catch(error => {dispatch(updateStaffMemberError())
      });
    };
}

  export function saveStaffMember(staffMember){
    return dispatch => {
      dispatch(beginAxiosCall());
      Axios.post('http://localhost:61319/staff/staff-editor', {
        firstName: staffMember.firstName,
        lastName: staffMember.lastName
      }).then(dispatch(postStaffMemberSuccess(staffMember)))
      .catch(error => {
        throw (error);
      });
    };
  }

  export function loadApprovedJobs(staffId){
    return dispatch => {
      dispatch(beginAxiosCall());
      Axios.post('http://localhost:61319/staff/staff-member-jobs', {
        staffMemberId: staffId
      }).then(res => {
        const jobs = res.data;
        dispatch(loadApprovedJobsSuccess(jobs))})
        .catch(error => {
          throw (error);
        });
    };
  }
  