import { combineReducers } from 'redux';
import serviceStaff from './serviceStaffReducer';
import jobs from './jobReducer';
import approvedJobs from './approvedJobsReducer';
import axiosLoading from './axiosReducer';

const rootReducer = combineReducers({
  serviceStaff,
  jobs,
  approvedJobs,
  axiosLoading,
});

export default rootReducer;
