import { combineReducers } from 'redux';
import { reducer as signalReducer } from 'redux-signal';
import serviceStaff from './serviceStaffReducer';
import jobs from './jobReducer';
import approvedJobs from './approvedJobsReducer';
import axiosLoading from './axiosReducer';
import checkouts from './checkoutReducer';
import startDate from './startDateReducer';

const rootReducer = combineReducers({
  serviceStaff,
  jobs,
  approvedJobs,
  axiosLoading,
  checkouts,
  startDate,
  signal: signalReducer
});

export default rootReducer;
