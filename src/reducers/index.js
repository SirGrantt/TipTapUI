import { combineReducers } from 'redux';
import { reducer as signalReducer } from 'redux-signal';
import { reducer as formReducer } from 'redux-form';
import serviceStaff from './serviceStaffReducer';
import jobs from './jobReducer';
import approvedJobs from './approvedJobsReducer';
import axiosLoading from './axiosReducer';
import checkouts from './checkoutReducer';
import startDate from './startDateReducer';
import approvedStaff from './approvedStaffReducer';
import jobSelected from './jobSelectedReducer';

const rootReducer = combineReducers({
  serviceStaff,
  jobs,
  approvedJobs,
  axiosLoading,
  checkouts,
  startDate,
  signal: signalReducer,
  approvedStaff,
  jobSelected,
  form: formReducer,
});

export default rootReducer;
