import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as staffActions from '../../reduxActions/serviceStaffActions';
import {withRouter, Redirect} from 'react-router-dom';
import {validateStaffMemberInput} from '../../Utils/staffMemberUtilFunctions';
import ManageStaffForm from './ManageStaffForm';

class ManageStaffPage extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            staffMember: getStaffMemberById(props.serviceStaff, props.match.params.id)
        };     

        this.saveStaffMember = this.saveStaffMember.bind(this);
        this.deleteStaffMember = this.deleteStaffMember.bind(this);
        this.updateStaffMember = this.updateStaffMember.bind(this);
    }

    updateStaffMember(e){
        const field = e.target.name;
        let staffMember = Object.assign({}, this.state.staffMember);
        staffMember[field] = e.target.value;
        this.setState({staffMember: staffMember});

    }

    saveStaffMember(event){
        event.preventDefault();
        if (!validateStaffMemberInput(this.state.staffMember))
        {
           return;
        }
        this.props.actions.saveStaffMember(this.state.staffMember);
        <Redirect to="/staff" />

    }

    deleteStaffMember(event){
     event.preventDefault();
    }

    render(){
        return (
            <ManageStaffForm
            staffMember={this.state.staffMember}
            title={this.state.staffMember.firstName == null ? "Add Staff Member" : this.state.staffMember.firstName + " " + this.state.staffMember.lastName}
            roles={this.props.roles}
            onSave={this.saveStaffMember}
            onDelete={this.deleteStaffMember}
            onChange={this.updateStaffMember}
            />
        );
    }

}


ManageStaffPage.propTypes = {
serviceStaff: PropTypes.array.isRequired,
match: PropTypes.object.isRequired
};

ManageStaffPage.contextTypes = {
    router: PropTypes.object
};

function getStaffMemberById(staff, id){
    if (id == null){
        const staffMember = {firstName: null, lastName: null, id: null};
        return staffMember;
    }
    let x;
    x = staff.filter(s => s.id == id);
    const foundStaffMember = x[0];
    return foundStaffMember;
}

function mapStateToProps(state) {
    let defaultStaffMember = {firstName: '', lastName: '', id: 0};
    
    return {
        serviceStaff: state.serviceStaff,
        defaultStaffMember: defaultStaffMember
        //next step is providing all of the created jobs and formatting for dropdown list
    };
}

function mapDispatchToProps(dispatch){
    return{
    actions: bindActionCreators(staffActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageStaffPage));