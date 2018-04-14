import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';


const ManageStaffForm = ({staffMember, onSave, onChange, onDelete, roles, title}) => {
    return(
        <form id="editorInput">
            <h1>{title}</h1>
            <TextInput
            name="firstName"
            label="First Name"
            value={staffMember.firstName}
            onChange={onChange}
            />

            <TextInput
            name="lastName"
            label="Last Name"
            value={staffMember.lastName}
            onChange={onChange}
            />
            <input
            type="submit"
            className="btn btn-primary"
            value="Save"
            />
            <input 
            type="submit"
            className="btn btn-danger"
            value="Delete"/>
        </form>
    );
};

ManageStaffForm.propTypes = {
    staffMember: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    roles: PropTypes.array,
    creating: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default ManageStaffForm;