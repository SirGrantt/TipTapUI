import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Overlay } from 'react-modal-construction-kit';
import momentPropTypes from 'react-moment-proptypes';
import CheckoutForm from './CheckoutForm';

const Footer = styled.div`
    padding: 1em;
    display: flex;
    border-radius: 0 0 2px 2px;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    justify-content: flex-end;
  
    > :not(:last-child) {
      margin-right: .25rem;
    }
`

const Header = styled.h1`
border-bottom: solid black;
border-width: thin;

`

const CheckoutButtonWrapper = styled.div`
float: right;
margin-left: auto;
margin-right: auto;
margin-top: 1em;
`

const CheckoutButton = styled.button`
width: 7em;
display:inline-block;
padding:0.35em 1.2em;
border:0.1em solid #FFFFFF;
margin:0 0.3em 0.3em 0;
border-radius:0.5em;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:300;
background-color: #4eb5f1;
text-align:center;
transition: all 0.2s;

:hover{
    color:#000000;
    background-color:#FFFFFF;
    }

@media all and (max-width:1.5em){
    a.button1{
    display:block;
    margin:0.4em auto;
    }
`

export default class CheckoutModal extends React.Component {
    constructor(props, context){
        super(props, context);
        
        this.state = {
        isModalVisible: false,
        editingExistingCheckout: false,
    };

    this.updateCheckoutDate(this.props.checkoutDate.format());
}

    componentWillReceiveProps(nextProps) {
        if (nextProps.isModalVisible != this.state.isModalVisible){
            this.setState({
                isModalVisible: nextProps.isModalVisible
            });
        }

        if(this.props.checkoutDate != nextProps.checkoutDate){
            this.updateCheckoutDate(nextProps.checkoutDate.format());
        }
    }

    updateCheckoutDate = (stringDate) => {
        let checkoutDate = {key: "stringDate", value: stringDate};
        this.updateCheckout(checkoutDate);
    }

    updateCheckout = (keyValue) => {
        this.props.onChange(keyValue);
    }

    render(){
        const { isModalVisible } = this.state;

        return (
            <div>
                <Modal
                onClickOutside={this.props.close}
                onClosed={this.props.close}
                isOpen={isModalVisible}
                >
                <Header>{this.state.editingExistingCheckout ? 
                this.props.checkout.staffMemberName : `Add ${this.props.jobSelected} Checkout`}</Header>
                <CheckoutForm checkout={this.props.checkout} approvedStaff={this.props.approvedStaff}
                updateCheckout={this.updateCheckout} onStaffSelect={this.props.onStaffSelect} 
                errors={this.props.errors}/>
                <CheckoutButtonWrapper>
                <CheckoutButton onClick={this.props.onAddCheckoutClick}>Add</CheckoutButton>
                <CheckoutButton onClick={this.props.close}>Cancel</CheckoutButton>
                </CheckoutButtonWrapper>
                <Footer />
                </Modal>
                <Overlay
                isVisible={isModalVisible} />
            </div>
        );
    }
}

CheckoutModal.propTypes = {
    onChange: PropTypes.func.isRequired,
    close: PropTypes.func,
    isModalVisible: PropTypes.bool,
    checkout: PropTypes.shape({
        grossSales: PropTypes.number,
        barSales: PropTypes.number,
        staffMemberName: PropTypes.string,
        numberOfBottlesSold: PropTypes.number,
        nonTipOutBarSales: PropTypes.number,
        ccTips: PropTypes.number,
        cashTips: PropTypes.number,
        ccAutoGrat: PropTypes.number,
        cashAutoGrat: PropTypes.number,
        hours: PropTypes.number
    }),
    approvedStaff: PropTypes.array,
    jobSelected: PropTypes.string,
    onAddCheckoutClick: PropTypes.func,
    onStaffSelect: PropTypes.func,
    checkoutDate: momentPropTypes.momentObj,
    errors: PropTypes.object,
};