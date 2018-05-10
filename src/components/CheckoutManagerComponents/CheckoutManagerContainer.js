import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = styled.h4`
margin-left: 2vw;
`


class CheckoutManagerContainer extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(date){
        this.setState({
            startDate: date
        });
    }

    render(){
        return( 
            <div>
                <h1>Check Out Manager</h1>
                <br/>
                <DateSelector>Shift Date: 
                <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                />
                </DateSelector>
            </div>

        )
    }

}

CheckoutManagerContainer.propTypes = {
    staff: PropTypes.array,

}

function mapStateToProps(state){
    return {
        staff: state.serviceStaff
    };
}

function mapDispatchToProps(disptatch){
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutManagerContainer);