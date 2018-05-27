import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../DragNDrop/Constants';
import { Modal, Overlay } from 'react-modal-construction-kit';
import { defaultCheckout } from '../../constants/GeneralConstants';
import NumberInput from '../common/NumberInput';
import NumberFormat from 'react-number-format';
import SelectInput from '../common/SelectInput';

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
const Form = styled.form`
    margin-left: .5em;
    margin-right: .5em;
`


const Header = styled.h1`
border-bottom: solid black;
border-width: thin;

`
const Label = styled.p`
font-weight: bold;
margin-top: 1em;
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
    }

    this.updateCheckoutDate(this.props.checkoutDate.format());
}

    componentWillReceiveProps(nextProps) {
        if (nextProps.isModalVisible != this.state.isModalVisible){
            this.setState({
                isModalVisible: nextProps.isModalVisible
            })
        }

        if(this.props.checkoutDate != nextProps.checkoutDate){
            this.updateCheckoutDate(nextProps.checkoutDate.format())
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
        const { isModalVisible } = this.state

        return (
            <div>
                <Modal
                onClickOutside={this.props.close}
                onClosed={this.props.close}
                isOpen={isModalVisible}
                >
                <Form id="checkoutModal">
                    <Header>{this.state.editingExistingCheckout ? 
                        this.props.checkout.staffMemberName : `Add ${this.props.jobSelected} Checkout`}</Header>
                    <SelectInput options={this.props.approvedStaff} name="staffid" label="Select Staff Member:" value={this.state.selectedStaffMember}
                    defaultOption="Select Staff Member" onChange={this.props.onStaffSelect} />
                    <Label>Gross Sales</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={this.props.checkout.grossSales == 0 ? "" : this.props.checkout.grossSales}
                    placeholder={"$1,000,000"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "grossSales", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                    <Label>Bar Sales</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={this.props.checkout.barSales == 0 ? "" : this.props.checkout.barSales}
                    placeholder={"$25"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "barSales", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                    <Label>Bottle Count</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    value={this.props.checkout.numberOfBottlesSold == 0 ? "" : this.props.checkout.numberOfBottlesSold}
                    placeholder={"Bottle Count"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "numberOfBottlesSold", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                    <Label>Bottle Value</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    prefix={'$'}
                    thousandSeparator={true}
                    value={this.props.checkout.nonTipOutBarSales == 0 ? "" : this.props.checkout.nonTipOutBarSales}
                    placeholder={"Don't Forget the Dom"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "nonTipOutBarSales", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                    <Label>Credit Card Tips</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={this.props.checkout.ccTips == 0 ? "" : this.props.checkout.ccTips}
                    placeholder={"$25"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "ccTips", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                    <Label>Cash Tips</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={this.props.checkout.cashTips == 0 ? "" : this.props.checkout.cashTips}
                    placeholder={"taxation is theft"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "cashTips", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                    <Label>Credit Card Auto Gratuity</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={this.props.checkout.ccAutoGrat == 0 ? "" : this.props.checkout.ccAutoGrat}
                    placeholder={"Auto Grat"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "ccAutoGrat", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                    <Label>Cash Auto Gratuity</Label>
                    <NumberFormat
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={this.props.checkout.cashAutoGrat == 0 ? "" : this.props.checkout.cashAutoGrat}
                    placeholder={"Cash Auto Grat"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "cashAutoGrat", formattedValue: formattedValue, value: value};
                        this.updateCheckout(keyValue);
                    }} />
                </Form>
                <CheckoutButtonWrapper>
                <CheckoutButton onClick={this.props.onAddCheckoutClick}>Add</CheckoutButton>
                <CheckoutButton onClick={this.props.close}>Cancel</CheckoutButton>
                </CheckoutButtonWrapper>
                <Footer />
                </Modal>
                <Overlay
                isVisible={isModalVisible} />
            </div>
        )
    }
}

CheckoutModal.propTypes = {
    onChange: PropTypes.func.isRequired,
    close: PropTypes.func,
    isModalVisible: PropTypes.bool,
    checkout: PropTypes.object.isRequired,
    approvedStaff: PropTypes.array,
    jobSelected: PropTypes.string,
    onAddCheckoutClick: PropTypes.func
}