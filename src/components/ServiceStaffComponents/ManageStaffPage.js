import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as staffActions from '../../reduxActions/serviceStaffActions';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { validateStaffMemberInput, mapJobsToJobMap } from '../../Utils/staffMemberUtilFunctions';
import ManageStaffForm from './ManageStaffForm';
import JobBoard from '../DragNDrop/Board/JobBoard';
import Loader from '../common/LoadingSpinner';

class ManageStaffPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            staffMember: getStaffMemberById(props.serviceStaff, props.match.params.id),
            approvedJobs: [],
            unapprovedJobs: [],
            jobMap: { Approved: [], Unapproved: mapJobsToJobMap(props.jobs) },
            axiosLoading: 0,
            title: "",
            redirect: false  
        };

        //Need to check that the user is not trying to add a new staff member
        //and therefore not attempt to load their approved jobs
        if (this.state.staffMember.firstName != null && 
            this.state.staffMember.lastName != null){
                this.loadApproved();
            }
        

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
            let approvedValue = mapJobsToJobMap(newProps.approvedJobs);
            let unapprovedValue = mapJobsToJobMap(unapproved);
            jm.Approved = approvedValue;
            jm.Unapproved = unapprovedValue;

            this.setState({
                approvedJobs: newProps.approvedJobs,
                unapprovedJobs: unapproved,
                jobMap: jm,
                axiosLoading: newProps.axiosLoading,
                title: this.state.staffMember.firstName + " " + this.state.staffMember.lastName

            });

        }

    }



    onSave(newApprovedJobs, newUnapprovedJobs) {
        let originalApproved = this.state.approvedJobs.map(j => j.apiId);
        let jobIds = newApprovedJobs.map(j => j.apiId);
        let unapprovedIds = newUnapprovedJobs.map(j => j.apiId);

        //Check if we are adding a new staffMember or updating one
        if (this.state.staffMember.id == null)
        {
            this.saveStaffMember(jobIds, unapprovedIds);
            this.setState({
                redirect: true
            });
        }
        else {
        //check for job changes
        if (originalApproved != jobIds) {
            this.props.actions.updateJobApproval(this.state.staffMember.id, jobIds, unapprovedIds);
        }

        //check for name changes
        let originalStaffMember = getStaffMemberById(this.state.staffMember.id);
        if (this.state.staffMember.firstName != originalStaffMember.firstName
        || this.state.staffMember.lastName != originalStaffMember.lastName)
        {
            this.props.actions.updateStaffMemberName(this.state.staffMember);
            
        }
    }

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

    saveStaffMember(jobIds, unapprovedIds) {
        if (!validateStaffMemberInput(this.state.staffMember)) {
            return;
        }
        this.props.actions.saveStaffMember(this.state.staffMember, jobIds, unapprovedIds);
    }

    deleteStaffMember(event) {
        event.preventDefault();
    }

    render() {
        if (this.state.redirect)
        {
            return <Redirect to="/staff"/>;
        }
        return (
            <div> 
                {this.props.axiosLoading > 0 ? <Loader /> :
                <ManageStaffForm
                    staffMember={this.state.staffMember}
                    title={this.state.staffMember.id == null ? "Add Staff Member" : this.state.title}
                    onSave={this.saveStaffMember}
                    onDelete={this.deleteStaffMember}
                    onChange={this.updateStaffMember}
                /> }
                {this.props.axiosLoading == 0 && <JobBoard initial={this.state.jobMap}
                    onSave={this.onSave} />}
                               
            </div>
        );
    }

}


ManageStaffPage.propTypes = {
    serviceStaff: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    axiosLoading: PropTypes.number.isRequired,

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
        axiosLoading: state.axiosLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(staffActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageStaffPage));