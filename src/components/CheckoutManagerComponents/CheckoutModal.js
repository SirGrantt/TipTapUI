import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Overlay } from 'react-modal-construction-kit';
import momentPropTypes from 'react-moment-proptypes';
import CheckoutForm from './CheckoutForm';
import { colors } from '../DragNDrop/Constants';

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
`;

const Header = styled.h1`
border-bottom: solid black;
border-width: thin;

`;

const CheckoutButtonWrapper = styled.div`
float: right;
margin-left: auto;
margin-right: auto;
margin-top: 1em;
`;

const CheckoutButton = styled.button`
color: white;
width: 7em;
display:inline-block;
padding:0.35em 1.2em;
border:0.1em solid #FFFFFF;
margin:0 0.3em 0.3em 0;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:300;
background-color: ${colors.blue.columnBodyBlue};
text-align:center;
transition: all 0.2s;

:hover{
    color: white;
    background-color: ${colors.blue.headerBlue};
    }

@media all and (max-width:1.5em){
    a.button1{
    display:block;
    margin:0.4em auto;
    }
`;

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

    //Perform validation against values we don't want
    updateCheckout = (keyValue) => {
        if (keyValue.value == '' || isNaN(keyValue.value)){
            keyValue.value = '';
        }
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
                errors={this.props.errors} alerts={this.props.alerts} 
                selectedStaffMemberId={this.props.selectedStaffMemberId}
                selectedStaffMemberName={this.props.selectedStaffMemberName}/>
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
    selectedStaffMemberName: PropTypes.string,
    close: PropTypes.func.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    checkout: PropTypes.shape({
        grossSales: PropTypes.string,
        barSales: PropTypes.string,
        staffMemberName: PropTypes.string,
        numberOfBottlesSold: PropTypes.string,
        nonTipOutBarSales: PropTypes.string,
        ccTips: PropTypes.string,
        cashTips: PropTypes.string,
        ccAutoGrat: PropTypes.string,
        cashAutoGrat: PropTypes.string,
        hours: PropTypes.string
    }),
    approvedStaff: PropTypes.array.isRequired,
    jobSelected: PropTypes.string,
    onAddCheckoutClick: PropTypes.func,
    onStaffSelect: PropTypes.func,
    checkoutDate: momentPropTypes.momentObj,
    errors: PropTypes.object,
    alerts: PropTypes.object,
};