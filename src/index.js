/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import { loadServiceStaff, loadAllJobs, jobSelectedSuccess } from './reduxActions/serviceStaffActions';
import { setInitialStartDate } from './reduxActions/startDateActions';
import { loadCheckouts } from './reduxActions/checkoutActions'; 
import moment from 'moment'; 
import './styles/styles.css';
require('./favicon.ico'); //tell webpack to include favicon.ico

const store = configureStore();
store.dispatch(jobSelectedSuccess({value: 1, text: 'Server'}));
store.dispatch(loadServiceStaff());
store.dispatch(loadAllJobs());
store.dispatch(setInitialStartDate());
store.dispatch(loadCheckouts(moment().format(), 'dinner'));


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const newRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <newRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
