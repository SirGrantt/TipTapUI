import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styled from 'styled-components';
import * as checkoutActions from '../../reduxActions/checkoutActions';
import { bindActionCreators } from 'redux';
import { colors } from '../DragNDrop/Constants';

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
  width:15vw;
  height: 8vh;
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
            startDate: moment()
        };

        this.loadCheckouts(moment().toDate());

        this.handleChange = this.handleChange.bind(this);
        this.loadCheckouts = this.loadCheckouts.bind(this);

    }

    handleChange(date){
        this.setState({
            startDate: date
        });
    }

    loadCheckouts(moment){
        this.props.actions.loadCheckouts(moment, "dinner");
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
                selected={this.state.startDate}
                onChange={this.handleChange}
                />
                </h4>
                <GetCheckoutButton>Get checkouts
                </GetCheckoutButton>
                </GetCheckoutsWrapper>

            </div>

        )
    }

}

CheckoutManagerContainer.propTypes = {
    staff: PropTypes.array,

}

function mapStateToProps(state){
    return {
        staff: state.serviceStaff,
        checkouts: state.checkouts,
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(checkoutActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutManagerContainer);