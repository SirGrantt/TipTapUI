import { combineReducers } from 'redux';
import serviceStaff from './serviceStaffReducer';
import jobs from './jobReducer';
import approvedJobs from './approvedJobsReducer';

const rootReducer = combineReducers({
  serviceStaff,
  jobs,
  approvedJobs,
});

export default rootReducer;
