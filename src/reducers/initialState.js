import moment from 'moment';

export default {
  serviceStaff: [],
  approvedStaff: [],
  selectedJob: { value: 0, text: ""},
  jobs: [],
  approvedJobs: [],
  axiosLoading: 0,
  checkouts: {},
  startDate: moment(),
  checkoutMap: {},
  ranCheckouts: [],
  barCheckouts: {},
};
