import React from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ListGroupItem} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

const ServiceStaffRow = ({ firstName, lastName, id}) => {

  function onListClick(){
    
  }
  return (
    <ListGroupItem onClick={onListClick}>
      <Link to={'editor/' + id}>{firstName} {lastName}</Link>
      {/*<td><Link to={'editor/' + id} className="btn btn-primary">Details</Link></td>*/}
    </ListGroupItem>
  );

};

ServiceStaffRow.propTypes = {
  firstName: Proptypes.string.isRequired,
  lastName: Proptypes.string.isRequired,
  id: Proptypes.number.isRequired
};

export default ServiceStaffRow;
