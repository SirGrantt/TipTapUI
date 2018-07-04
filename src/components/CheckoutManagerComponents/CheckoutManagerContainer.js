import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CheckoutModal from './CheckoutModal';
import SelectInput from '../common/SelectInput';
import styled from 'styled-components';
import * as checkoutActions from '../../reduxActions/checkoutActions';
import { bindActionCreators } from 'redux';
import { colors } from '../DragNDrop/Constants';
import CheckoutBoard from '../DragNDrop/Board/CheckoutBoard';
import * as startDateActions from '../../reduxActions/startDateActions';
import * as staffActions from '../../reduxActions/serviceStaffActions';
import * as teamActions from '../../reduxActions/teamActions';
import 'react-datepicker/dist/react-datepicker.css';
import { defaultCheckout } from '../../constants/GeneralConstants';
import { mapJobsForDropdown, mapStaffForDropDown } from '../../Utils/staffMemberUtilFunctions';
import { withSignal, SignalTypes } from 'redux-signal';
import {checkoutFormIsValid, shouldAlertUser, transformCheckout} from '../../Utils/checkoutUtilFunctions';
import { objectsAreEqual } from '../../Utils/ObjectComparison';
import Loader from '../common/LoadingSpinner';

const DateSelectorTitle = styled.h4`
margin-left: 2vw;
`;
const GetCheckoutsWrapper = styled.div`
    box-sizing: border-box;
    width:100%;
    padding-right:40px;
    display: flex;
    margin-left: 2em;
`;

const SelectWrapper = styled.div`
width: 20%;
margin-left: auto;
`;

const GetCheckoutButton = styled.button`
font: sans-serif;
font-size:1em;
white-space:nowrap;
margin-left: 1em;
margin-right: 1em;
  letter-spacing:2px;
  text-transform:uppercase;
  display:inline-block;
  text-align:center;
  width:12em;
  height: 4em;
  font-weight:bold;
  padding:14px 0px;
  border:3px solid ${colors.blue.columnBodyBlue};
  border-radius:2px;
  position:relative;
  box-shadow: 0 2px 10px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.1);
  z-index:2;
  &:before {
    color: white;
    -webkit-transition:0.5s all ease;
    transition:0.5s all ease;
    position:absolute;
    top:0;
    left:50%;
    right:50%;
    bottom:0;
    opacity:0;
    content:'';
    background-color:${colors.blue.columnBodyBlue};
    z-index:-1;
  }
  &:hover {
    color: white;
    &:before {
      -webkit-transition:0.5s all ease;
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
  &:focus {
      color: white;
    &:before {
      -webkit-transition:0.5s all ease;
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
`;

class CheckoutManagerContainer extends React.Component{
    static propTypes = {
        staff: PropTypes.array,
        checkouts: PropTypes.object,
        jobs: PropTypes.array,
        jobSelected: PropTypes.object,
        staffActions: PropTypes.object,
        approvedStaff: PropTypes.array,
        actions: PropTypes.object,
        dateActions: PropTypes.object,
        teamActions: PropTypes.object,
        createSignal: PropTypes.func,
        axiosLoading: PropTypes.number,
        checkoutMap: PropTypes.object,
    }
    constructor(props, context){
        super(props, context);

        this.state = {
            shouldMap: true,
            isModalVisible: false,
            currentCheckout: Object.assign({}, defaultCheckout),
            jobSelected: Object.assign({}, this.props.jobSelected),
            approvedStaff: mapStaffForDropDown(this.props.approvedStaff),
            selectedStaffMemberId: -1,
            selectedStaffMemberName: '',
            updatingCheckout: false,
            errors: {},
            alerts: { initial: ''},
        };

        this.handleChange = this.handleChange.bind(this);
        this.loadCheckouts = this.loadCheckouts.bind(this);
        this.buildCheckoutsMap = this.buildCheckoutsMap.bind(this);
        this.openAddCheckoutModal = this.openAddCheckoutModal.bind(this);
        this.onCheckoutEditorChange = this.onCheckoutEditorChange.bind(this);
        this.onJobSelect = this.onJobSelect.bind(this);
        this.onStaffSelect = this.onStaffSelect.bind(this);
        this.onAddCheckoutClick = this.onAddCheckoutClick.bind(this);
        this.submitCheckout = this.submitCheckout.bind(this);
    }

    componentDidMount() {
        this.props.staffActions.loadApprovedStaff(this.props.jobSelected.value);
    }

    componentWillReceiveProps(newProps){
        if(this.props.checkouts != newProps.checkouts){
            if (newProps.checkouts.individual != undefined){
                let checkoutMap = this.buildCheckoutsMap(newProps.checkouts);
                this.props.actions.createCheckoutMapSuccess(checkoutMap);
                this.setState({
                    shouldMap: true,
                });
            }
            else if (newProps.checkouts.team != undefined){
                this.setState({
                    shouldMap: true,
                    checkoutsMap: this.buildCheckoutsMap(newProps.checkouts)
                });
            }
        }

        //adjusting for when a new job is selected
        if(this.props.jobSelected != newProps.jobSelected){
            let currentCheckout = {...this.state.currentCheckout};
            currentCheckout.jobWorkedTitle = newProps.jobSelected.text.toLowerCase();
            this.setState({
                jobSelected: Object.assign({}, newProps.jobSelected),
                currentCheckout: currentCheckout
            });
        }
        //when a new job is selected the approved staff will also change
        if (this.props.approvedStaff != newProps.approvedStaff){
            this.setState({
                approvedStaff: mapStaffForDropDown(newProps.approvedStaff)
            });
        }
    }

    closeModal = () => {
        this.setState({
            errors: {},
            alerts: {},
            isModalVisible: false,
            selectedStaffMemberId: -1,
            currentCheckout: defaultCheckout,
            selectedStaffMemberName: '',
            updatingCheckout: false,
        });
    }

    handleChange(date){
        this.props.dateActions.setStartDateSuccess(date);
    }

    //Need to map the initial checkouts to the correct teams
    buildCheckoutsMap(checkouts){
        let builtMap = {};
        builtMap["Individual"] = checkouts.individual;

        //Check for there to be teams to format and load in, and bail if there is not
        if (checkouts.team == undefined){
            return builtMap;
        }

        //dynamically add create the name to pass to the columns and individual
        //teams
        checkouts.team.map(team => {
          builtMap[`Team:_${team.teamId.toString()}`] = team.teamCheckouts;
        });

        return builtMap;
    }

    addTeam = () => {
        if (this.props.jobSelected.text === 'Server') {
            this.props.teamActions.addServerTeam(this.props.startDate);
        }
    }

    addCheckoutToTeam = (addData) => {
        addData.stringDate = this.props.startDate;
        this.props.actions.addCheckoutToServerTeam(addData);
    }

    removeCheckoutFromTeam = (removeData) => {
        removeData.stringDate = this.props.startDate;
        this.props.actions.removeCheckoutFromServerTeam(removeData);
    }
    
    //currently dinner is hard coded here, but needs to have the option built in for the user
    loadCheckouts(){
        let date = this.props.startDate.format();
        this.props.actions.loadCheckouts(date, "dinner");
    }

    openAddCheckoutModal(){
        this.setState({
            isModalVisible: true
        });
    }


    onCheckoutEditorChange(keyValue){
        const field = keyValue.key;
        let checkout = Object.assign({}, this.state.currentCheckout);
        checkout[field] = keyValue.value;
        this.setState({ currentCheckout: checkout});
    }

    //Update approved staff to show when a certain job is selected
    onJobSelect(event){
        let jobs = this.props.jobs.filter(j => j.value == event.target.value);
        let job = jobs[0];
        this.props.staffActions.jobSelectedSuccess(job);
        this.props.staffActions.loadApprovedStaff(job.value);
    }

    //Update when a staff member is selected in the Add chekcout modal
    onStaffSelect(event){
        let staffId = { key: "staffMemberId", value: event.target.value == '' ? -1 : event.target.value };
        this.onCheckoutEditorChange(staffId);
    }

    onAddCheckoutClick(event){
        event.stopPropagation();
        this.setState({
            errors: {}
        });
        let formData = checkoutFormIsValid(this.state.currentCheckout);
        let userAlerter = shouldAlertUser(this.state.currentCheckout);

        //Make sure the same alert hasn't been presented already
        if (!formData.isValid){
            this.setState({
                errors: formData.errors
            });
        }
        else if (userAlerter.shouldAlert && !objectsAreEqual(userAlerter.alerts, this.state.alerts)){
            this.setState({
                alerts: userAlerter.alerts
            });
            this.props.createSignal({
            type: SignalTypes.OK,
            title: `One sec,`,
            message: 'We noticed a view values you might want to double check, we highlighted them for you.',
            });    
        }
        else {
            this.submitCheckout();
        }
    }

    async submitCheckout () {
        let formattedCheckout = await transformCheckout(this.state.currentCheckout,
            this.state.jobSelected, this.props.startDate, "dinner");
            this.props.actions.addCheckout(formattedCheckout);
            this.closeModal();
    }

    reviewCheckout = (checkoutId, staffMemberName) => {
        let checkout = this.props.checkouts.individual.find(c => c.id === checkoutId);

        if (checkout === undefined){
            let team = this.props.checkouts.team.find(t => t.teamCheckouts.find(c => c.id === checkoutId));
            checkout = team.teamCheckouts.find(c => c.id === checkoutId);
        }

        let staffMember = this.props.staff.find(s => s.firstName + ' ' + s.lastName === staffMemberName);

        this.setState({
            currentCheckout: checkout,
            updatingCheckout: true,
            isModalVisible: true,
            selectedStaffMemberId: staffMember.id,
            selectedStaffMemberName: staffMemberName,
        });
    }    

    render(){
        const { jobSelected, jobs, startDate, checkoutMap, axiosLoading } = this.props;
        const { isModalVisible, defaultCheckout, currentCheckout, approvedStaff, errors,
                alerts, selectedStaffMemberId, selectedStaffMemberName, 
                updatingCheckout, shouldMap } = this.state;
        return( 
            <div>
                <h1>Check Out Manager</h1>
                <br/>
                <DateSelectorTitle>Shift Date:
                </DateSelectorTitle>
                <GetCheckoutsWrapper> 
                <h4>
                <DatePicker
                selected={startDate}
                onChange={this.handleChange}
                />
                </h4>
                <GetCheckoutButton onClick={this.loadCheckouts}>Get checkouts
                </GetCheckoutButton>
                <SelectWrapper>
                <SelectInput options={jobs} name="jobId" label="Job : " value={jobSelected.text}
                defaultOption={jobSelected.text} onChange={this.onJobSelect} />
                </SelectWrapper>
                </GetCheckoutsWrapper>
                <CheckoutModal close={this.closeModal} isModalVisible={isModalVisible} 
                defaultCheckout={defaultCheckout} onChange={this.onCheckoutEditorChange}
                checkout={currentCheckout} approvedStaff={approvedStaff} 
                onStaffSelect={this.onStaffSelect} checkoutDate={startDate} 
                jobSelected={jobSelected.text} onAddCheckoutClick={this.onAddCheckoutClick} 
                errors={errors} alerts={alerts} 
                selectedStaffMemberId={selectedStaffMemberId}
                selectedStaffMemberName={selectedStaffMemberName} 
                updatingCheckout={updatingCheckout}/>
                <br/>
                {axiosLoading > 0 ? <Loader /> :
                <CheckoutBoard initial={checkoutMap} shouldMap={shouldMap} 
                openAddCheckoutModal={this.openAddCheckoutModal} jobSelected={jobSelected}
                addTeam={this.addTeam} addCheckoutToTeam={this.addCheckoutToTeam}
                removeCheckoutFromTeam={this.removeCheckoutFromTeam} reviewCheckout={this.reviewCheckout}/>
                }
            </div>

        );
    }

}

function mapStateToProps(state){
    return {
        staff: state.serviceStaff,
        checkouts: state.checkouts,
        startDate: state.startDate,
        jobs: mapJobsForDropdown(state.jobs),
        approvedStaff: state.approvedStaff,
        jobSelected: state.jobSelected,
        axiosLoading: state.axiosLoading,
        checkoutMap: state.checkoutMap,
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(checkoutActions, dispatch),
        dateActions: bindActionCreators(startDateActions, dispatch),
        staffActions: bindActionCreators(staffActions, dispatch),
        teamActions : bindActionCreators(teamActions, dispatch),
    };
}

export default withSignal(connect(mapStateToProps, mapDispatchToProps)(CheckoutManagerContainer));