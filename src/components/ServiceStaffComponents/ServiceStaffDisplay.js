import React from 'react';
import PropTypes from 'prop-types';
import ServiceStaffRow from './ServiceStaffRow';
import {Link} from 'react-router-dom';
import {ListGroup} from 'react-bootstrap';

const ServiceStaffDisplay = ({ serviceStaff}) => {
  return (
    <div>
    <ListGroup>
        {serviceStaff.map(staffMember =>
          (<ServiceStaffRow key={staffMember.id} firstName={staffMember.firstName}
            lastName={staffMember.lastName} id={staffMember.id} /> )
        )}
    </ListGroup>
    <Link to={"editor"} className="btn btn-primary">Add Staff Member</Link>
    </div>
  );
};

ServiceStaffDisplay.propTypes = {
  serviceStaff: PropTypes.array.isRequired
};

export default ServiceStaffDisplay;
