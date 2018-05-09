import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceStaffDisplay from './ServiceStaffDisplay';
import * as staffActions from '../../reduxActions/serviceStaffActions';
import Loader from '../common/LoadingSpinner';  


class StaffMembersContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      serviceStaff: this.props.serviceStaff,
      axiosLoading: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>Staff Members</h1>
        <h2 id="sectionSubHeader">Edit Staff and their Job Approvals.</h2>
        <br />
        {this.props.axiosLoading > 0 ? <Loader /> :
        <ServiceStaffDisplay serviceStaff={this.props.serviceStaff}/>
        }
      </div>
    );
  }
}

StaffMembersContainer.propTypes = {
  serviceStaff: PropTypes.array.isRequired,
  axiosLoading: PropTypes.number.isRequired
};


function mapStateToProps(state) {

  return {
    serviceStaff: state.serviceStaff,
    jobs: state.jobs,
    axiosLoading: state.axiosLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(staffActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffMembersContainer);
