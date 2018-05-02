import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as staffActions from '../../reduxActions/serviceStaffActions';
import { withRouter, Redirect } from 'react-router-dom';
import { validateStaffMemberInput } from '../../Utils/staffMemberUtilFunctions';
import ManageStaffForm from './ManageStaffForm';
import JobBoard from '../DragNDrop/Board/JobBoard';
import JobMap from '../DragNDrop/DNDTypes';

class ManageStaffPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            staffMember: getStaffMemberById(props.serviceStaff, props.match.params.id),
            approvedJobs: [],
            unapprovedJobs: [],
            jobMap: { Approved: [], Unapproved: [] },
            jobMapPopulated: false
        };

        this.loadApproved(this.state.staffMember.id);

        this.saveStaffMember = this.saveStaffMember.bind(this);
        this.deleteStaffMember = this.deleteStaffMember.bind(this);
        this.updateStaffMember = this.updateStaffMember.bind(this);
        this.loadApproved = this.loadApproved.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.approvedJobs != newProps.approvedJobs) {
            let jm = Object.assign({}, this.state.jobMap);
            let unapproved = newProps.jobs.filter(j => !newProps.approvedJobs.find(e => e.id == j.id));
            let approvedValue = newProps.approvedJobs.map(element => ({
                title: element.title, apiId: element.id, id: element.id.toString()
            })
            );
            let unapprovedValue = unapproved.map(e => ({
                title: e.title, apiId: e.id, id: e.id.toString()
            }));
            jm.Approved = approvedValue;
            jm.Unapproved = unapprovedValue;

            this.setState({
                approvedJobs: newProps.approvedJobs,
                unapprovedJobs: unapproved,
                jobMap: jm,
                jobMapPopulated: true

            })

        };

    }

    onSave = (event, jobIds) => {
        event.preventDefault();
        let originalApproved = this.state.approvedJobs.map(j => j.apiId);
        if (originalApproved != jobIds) {
            this.props.actions.AddJobsToStaffMember(this.props.staffMemberId, jobIds);
        };

    }

    loadApproved() {
        this.props.actions.loadApprovedJobs(this.state.staffMember.id);
    }

    updateStaffMember(e) {
        const field = e.target.name;
        let staffMember = Object.assign({}, this.state.staffMember);
        staffMember[field] = e.target.value;
        this.setState({ staffMember: staffMember });

    }

    saveStaffMember(event) {
        event.preventDefault();
        if (!validateStaffMemberInput(this.state.staffMember)) {
            return;
        }
        this.props.actions.saveStaffMember(this.state.staffMember);
        <Redirect to="/staff" />

    }

    deleteStaffMember(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <ManageStaffForm
                    staffMember={this.state.staffMember}
                    title={this.state.staffMember.firstName == null ? "Add Staff Member" : this.state.staffMember.firstName + " " + this.state.staffMember.lastName}
                    roles={this.props.roles}
                    onSave={this.saveStaffMember}
                    onDelete={this.deleteStaffMember}
                    onChange={this.updateStaffMember}
                />
                {this.state.jobMapPopulated && <JobBoard initial={this.state.jobMap}
                    onSave={this.onSave} />}
            </div>
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

function getStaffMemberById(staff, id) {
    if (id == null) {
        const staffMember = { firstName: null, lastName: null, id: null };
        return staffMember;
    }
    let x;
    x = staff.filter(s => s.id == id);
    const foundStaffMember = x[0];
    return foundStaffMember;
}

function mapStateToProps(state) {
    let defaultStaffMember = { firstName: '', lastName: '', id: 0 };

    return {
        serviceStaff: state.serviceStaff,
        defaultStaffMember: defaultStaffMember,
        jobs: state.jobs,
        approvedJobs: state.approvedJobs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(staffActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageStaffPage));