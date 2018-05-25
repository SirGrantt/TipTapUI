import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CheckoutModal from './CheckoutModal';
import SelectInput from '../common/SelectInput';
import moment from 'moment';
import styled from 'styled-components';
import * as checkoutActions from '../../reduxActions/checkoutActions';
import { bindActionCreators } from 'redux';
import { colors } from '../DragNDrop/Constants';
import CheckoutBoard from '../DragNDrop/Board/CheckoutBoard';
import * as startDateActions from '../../reduxActions/startDateActions';
import * as staffActions from '../../reduxActions/serviceStaffActions';
import 'react-datepicker/dist/react-datepicker.css';
import { defaultCheckout } from '../../constants/GeneralConstants';
import { mapJobsForDropdown, mapStaffForDropDown } from '../../Utils/staffMemberUtilFunctions';

const DateSelectorTitle = styled.h4`
margin-left: 2vw;
`
const GetCheckoutsWrapper = styled.div`
    box-sizing: border-box;
    width:100%;
    padding-right:40px;
    display: flex;
    margin-left: 2em;

`

const SelectWrapper = styled.div`
width: 20%;
margin-left: auto;
`

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
  border:3px solid ${colors.blue.steel};
  border-radius:2px;
  position:relative;
  box-shadow: 0 2px 10px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.1);
  z-index:2;
  &:before {
    -webkit-transition:0.5s all ease;
    transition:0.5s all ease;
    position:absolute;
    top:0;
    left:50%;
    right:50%;
    bottom:0;
    opacity:0;
    content:'';
    background-color:${colors.blue.steel};
    z-index:-1;
  }
  &:hover {
    &:before {
      -webkit-transition:0.5s all ease;
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
  &:focus {
    &:before {
      -webkit-transition:0.5s all ease;
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
`


class CheckoutManagerContainer extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            checkoutsMap: this.buildCheckoutsMap(props.checkouts),
            shouldMap: false,
            isModalVisible: false,
            currentCheckout: defaultCheckout,
            currentCheckoutSanitized: defaultCheckout,
            jobSelected: this.props.jobSelected,
            approvedStaff: mapStaffForDropDown(this.props.approvedStaff),
            selectedStaffMemberId: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.loadCheckouts = this.loadCheckouts.bind(this);
        this.buildCheckoutsMap = this.buildCheckoutsMap.bind(this);
        this.openAddCheckoutModal = this.openAddCheckoutModal.bind(this);
        this.onCheckoutEditorChange = this.onCheckoutEditorChange.bind(this);
        this.onJobSelect = this.onJobSelect.bind(this);
        this.onStaffSelect = this.onStaffSelect.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(this.props.checkouts != newProps.checkouts){
            if (newProps.checkouts.individual != undefined){
                this.setState({
                    shouldMap: true,
                    checkoutsMap: this.buildCheckoutsMap(newProps.checkouts),
                });
            }
            else if (newProps.checkouts.team != undefined){
                this.setState({
                    shouldMap: true,
                    checkoutsMap: this.buildCheckoutsMap(newProps.checkouts)
                });
            }
        }

        if(this.props.jobSelected != newProps.jobSelected){
            let currentCheckout = {...this.state.currentCheckout};
            currentCheckout.jobWorkedTitle = newProps.jobSelected.text.toLowerCase();
            this.setState({
                jobSelected: newProps.jobSelected,
                currentCheckout: currentCheckout
            })
        }

        if (this.props.approvedStaff != newProps.approvedStaff){
            this.setState({
                approvedStaff: mapStaffForDropDown(newProps.approvedStaff)
            })
        }
    }

    closeModal = () => {
        this.setState({
            isModalVisible: false,
            selectedStaffMemberId: 0,
            currentCheckout: defaultCheckout,
            currentCheckoutSanitized: defaultCheckout
        })
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

            if (team.isSoloTeam == true){
                builtMap["Individual"].push(team.teamCheckouts[0]);
            }
            else
            {
            let title;
            for (var i = 0; i < team.teamCheckouts.length; i++){
                if (i == 0){
                    title = team.teamCheckouts[i].staffMemberName;
                }
                else {
                    title = title + " & " + team.teamCheckouts[i].staffMemberName; 
                }
            }
            builtMap[`${title}`] = team.teamCheckouts;
        }});
        return builtMap;
    }
    
    loadCheckouts(){
        let date = this.props.startDate.format();
        this.props.actions.loadCheckouts(date, "dinner");
    }

    openAddCheckoutModal(){
        this.setState({
            isModalVisible: true
        })
    }

    //update the default checkout for submitting new checkouts
    //Sanitized & Current Checkout represent the two things i need to do with
    //checkout data. I need it presented a certain way, but the numeric input also provides
    //a non prefixed and numeric value, so I need to display the prefixed but save the sanitized
    //for submission
    onCheckoutEditorChange(keyValue){
        const field = keyValue.key;
        let sanitizedCheckout = Object.assign({}, this.state.currentCheckoutSanitized);
        let checkout = Object.assign({}, this.state.currentCheckout);
        checkout[field] = keyValue.formattedValue;
        sanitizedCheckout[field] = keyValue.value;
        this.setState({ currentCheckout: checkout, currentCheckoutSanitized: sanitizedCheckout });
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
        let staffId = { key: "staffMemberId", formattedValue: `${event.target.value}`, value: event.target.value }
        this.onCheckoutEditorChange(staffId);
    }

    onAddCheckoutClick(event){
        event.preventDefault();
        //this is where the checking of the data needs to occur, I will do this elsewhere
    }

    render(){
        return( 
            <div>
                <h1>Check Out Manager</h1>
                <br/>
                <DateSelectorTitle>Shift Date:
                </DateSelectorTitle>
                <GetCheckoutsWrapper> 
                <h4>
                <DatePicker
                selected={this.props.startDate}
                onChange={this.handleChange}
                />
                </h4>
                <GetCheckoutButton onClick={this.loadCheckouts}>Get checkouts
                </GetCheckoutButton>
                <SelectWrapper>
                <SelectInput options={this.props.jobs} name="jobId" label="Job : " value={this.props.jobSelected.text}
                defaultOption="Select Job" onChange={this.onJobSelect} />
                </SelectWrapper>
                </GetCheckoutsWrapper>
                <CheckoutModal close={this.closeModal} isModalVisible={this.state.isModalVisible} 
                defaultCheckout={this.state.defaultCheckout} onChange={this.onCheckoutEditorChange}
                checkout={this.state.currentCheckout} editingExistingCheckout={this.state.editingExistingCheckout} 
                approvedStaff={this.state.approvedStaff} onStaffSelect={this.onStaffSelect} 
                checkoutDate={this.props.startDate} jobSelected={this.state.jobSelected.text}/>
                <br/>
                <CheckoutBoard initial={this.state.checkoutsMap} shouldMap={this.state.shouldMap} openAddCheckoutModal={this.openAddCheckoutModal}/>
            </div>

        )
    }

}

CheckoutManagerContainer.propTypes = {
    staff: PropTypes.array,
    checkouts: PropTypes.object,
    jobs: PropTypes.array,
    jobSelected: PropTypes.object,
}

function mapStateToProps(state){
    return {
        staff: state.serviceStaff,
        checkouts: state.checkouts,
        startDate: state.startDate,
        jobs: mapJobsForDropdown(state.jobs),
        approvedStaff: state.approvedStaff,
        jobSelected: state.jobSelected
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(checkoutActions, dispatch),
        dateActions: bindActionCreators(startDateActions, dispatch),
        staffActions: bindActionCreators(staffActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutManagerContainer);