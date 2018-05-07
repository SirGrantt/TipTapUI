import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route} from 'react-router-dom';
import NotFound404 from './common/NotFound404';
import HomePage from './HomePage';
import StaffMembersContainer from './ServiceStaffComponents/StaffMembersContainer';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import ManageStaffPage from './ServiceStaffComponents/ManageStaffPage';

import Loader from './common/LoadingSpinner';

class App extends React.Component {
  render() {

    return (
      <div>
    <Navbar  inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/">TipTap</NavLink>
        </Navbar.Brand>
      <Navbar.Toggle />
      </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <LinkContainer to="/staff">
      <NavItem eventKey={1}>
      Staff
      </NavItem>
      </LinkContainer>
      <LinkContainer to="/shift-manager">
      <NavItem eventKey={2}>
      Check Out Manager
      </NavItem>
      </LinkContainer>
      <LinkContainer to="/pay-period">
      <NavItem eventKey={3}>
      Pay Period
      </NavItem>
      </LinkContainer>
      </Nav>
      <Navbar.Text pullRight>
      Virago
      </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/staff" component={StaffMembersContainer} />
          <Route exact path="/editor" component={ManageStaffPage} />
          <Route path="/editor/:id" component={ManageStaffPage} />
          <Route component={NotFound404} />
        </Switch>
      </div>
    );

  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
