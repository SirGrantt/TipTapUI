import { combineReducers } from 'redux';
import serviceStaff from './serviceStaffReducer';
import jobs from './jobReducer';
import approvedJobs from './approvedJobsReducer';
import axiosCallInProgress from './axiosReducer';

const rootReducer = combineReducers({
  serviceStaff,
  jobs,
  approvedJobs,
  axiosCallInProgress,
});

export default rootReducer;
