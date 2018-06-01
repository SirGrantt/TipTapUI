import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';
import SelectInput from '../common/SelectInput';

const Label = styled.p`
font-weight: bold;
margin-top: 1em;
`

const Form = styled.form`
    margin-left: .5em;
    margin-right: .5em;
`

const CheckoutForm = ({checkout, approvedStaff, updateCheckout, onStaffSelect}) => {

    return (
        <Form id="checkoutModal">
                    <SelectInput options={approvedStaff} name="staffid" label="Select Staff Member:"
                    defaultOption="Select Staff Member" onChange={onStaffSelect} />
                    <Label>Gross Sales</Label>
                    <NumberFormat
                    decimalScale={2}
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.grossSales == 0 ? "" : checkout.grossSales}
                    placeholder={"$1,000,000"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "grossSales", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                    <Label>Bar Sales</Label>
                    <NumberFormat
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.barSales == 0 ? "" : checkout.barSales}
                    placeholder={"$25"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "barSales", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                    <Label>Bottle Count</Label>
                    <NumberFormat
                    type="tel"
                    decimalScale={0}
                    displayType="input"
                    thousandSeparator={true}
                    value={checkout.numberOfBottlesSold == 0 ? "" : checkout.numberOfBottlesSold}
                    placeholder={"Bottle Count"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "numberOfBottlesSold", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                    <Label>Bottle Value</Label>
                    <NumberFormat
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    prefix={'$'}
                    thousandSeparator={true}
                    value={checkout.nonTipOutBarSales == 0 ? "" : checkout.nonTipOutBarSales}
                    placeholder={"Don't Forget the Dom"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "nonTipOutBarSales", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                    <Label>Credit Card Tips</Label>
                    <NumberFormat
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.ccTips == 0 ? "" : checkout.ccTips}
                    placeholder={"$25"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "ccTips", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                    <Label>Cash Tips</Label>
                    <NumberFormat
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.cashTips == 0 ? "" : checkout.cashTips}
                    placeholder={"taxation is theft"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "cashTips", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                    <Label>Credit Card Auto Gratuity</Label>
                    <NumberFormat
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.ccAutoGrat == 0 ? "" : checkout.ccAutoGrat}
                    placeholder={"Auto Grat"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "ccAutoGrat", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                    <Label>Cash Auto Gratuity</Label>
                    <NumberFormat
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.cashAutoGrat == 0 ? "" : checkout.cashAutoGrat}
                    placeholder={"Cash Auto Grat"}
                    onValueChange={(values) => {
                        const { formattedValue, value} = values;
                        const keyValue = {key: "cashAutoGrat", formattedValue: formattedValue, value: value};
                        updateCheckout(keyValue);
                    }} />
                </Form>
    );
};

CheckoutForm.propTypes = {
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
        hours: PropTypes.number,
    }),
    updateCheckout: PropTypes.func,
    approvedStaff: PropTypes.arrayOf( PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        status: PropTypes.string,
        id: PropTypes.number
    })),
    onStaffSelect: PropTypes.func,

}

export default CheckoutForm;