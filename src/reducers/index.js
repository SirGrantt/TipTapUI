import { combineReducers } from 'redux';
import { reducer as signalReducer } from 'redux-signal';
import { reducer as formReducer } from 'redux-form';
import serviceStaff from './serviceStaffReducer';
import checkoutMap from './checkoutMapReducer';
import jobs from './jobReducer';
import approvedJobs from './approvedJobsReducer';
import axiosLoading from './axiosReducer';
import checkouts from './checkoutReducer';
import startDate from './startDateReducer';
import approvedStaff from './approvedStaffReducer';
import jobSelected from './jobSelectedReducer';
import ranCheckouts from './ranCheckoutsTeamReducer';
import barTeam from './barTeamReducer';

const rootReducer = combineReducers({
  serviceStaff,
  jobs,
  approvedJobs,
  axiosLoading,
  checkouts,
  startDate,
  checkoutMap,
  signal: signalReducer,
  approvedStaff,
  jobSelected,
  form: formReducer,
  ranCheckouts,
  barTeam,
});

export default rootReducer;
