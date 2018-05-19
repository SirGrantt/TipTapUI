import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CheckoutModal from './CheckoutModal';
import moment from 'moment';
import styled from 'styled-components';
import * as checkoutActions from '../../reduxActions/checkoutActions';
import { bindActionCreators } from 'redux';
import { colors } from '../DragNDrop/Constants';
import CheckoutBoard from '../DragNDrop/Board/CheckoutBoard';
import * as startDateActions from '../../reduxActions/startDateActions';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = styled.h4`
margin-left: 2vw;
`
const GetCheckoutsWrapper = styled.div`
    box-sizing: border-box;
    width:100%;
    padding-right:40px;
    display: flex;
    margin-left: 2em;

`

const GetCheckoutButton = styled.button`
font: sans-serif;
font-size:1em;
white-space:nowrap;
margin-left: 1em;
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
        };

        this.handleChange = this.handleChange.bind(this);
        this.loadCheckouts = this.loadCheckouts.bind(this);
        this.buildCheckoutsMap = this.buildCheckoutsMap.bind(this);

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
        this.setState({
            isModalVisible: true
        })
    }

    render(){
        return( 
            <div>
                <h1>Check Out Manager</h1>
                <br/>
                <DateSelector>Shift Date:
                </DateSelector>
                <GetCheckoutsWrapper> 
                <h4>
                <DatePicker
                selected={this.props.startDate}
                onChange={this.handleChange}
                />
                </h4>
                <GetCheckoutButton onClick={this.loadCheckouts}>Get checkouts
                </GetCheckoutButton>
                </GetCheckoutsWrapper>
                <CheckoutModal isModalVisible={this.state.isModalVisible}/>
                <br/>
                <CheckoutBoard initial={this.state.checkoutsMap} shouldMap={this.state.shouldMap}/>
            </div>

        )
    }

}

CheckoutManagerContainer.propTypes = {
    staff: PropTypes.array,
    checkouts: PropTypes.object,

}

function mapStateToProps(state){
    return {
        staff: state.serviceStaff,
        checkouts: state.checkouts,
        startDate: state.startDate,
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(checkoutActions, dispatch),
        dateActions: bindActionCreators(startDateActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutManagerContainer);