import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';
import SelectInput from '../common/SelectInput';

const Label = styled.p`
font-weight: bold;
margin-top: 1em;
`;

const Form = styled.form`
    margin-left: .5em;
    margin-right: .5em;
`;

const ErrorMsg = styled.div`
color: maroon;
text-size: .5em;
text-align: center;
border-radius: .5em;
`;

const AlertHighlight = styled.div`
background-color: rgb(244, 241, 66);
color: black;
text-size: .5em;
text-align: center;
border-radius: .5em;
`;

let CheckoutForm = ({checkout, approvedStaff, updateCheckout, onStaffSelect, errors, alerts}) => {

    return (
        <Form id="checkoutModal">
                    <SelectInput options={approvedStaff} name="staffid" label="Select Staff Member:"
                    defaultOption="Select Staff Member" onChange={onStaffSelect} />
                    {errors.staffMember && <ErrorMsg>{errors.staffMember}</ErrorMsg>}
                    <Label>Gross Sales</Label>
                    <NumberFormat
                    allowNegative={false}
                    decimalScale={2}
                    type="tel"
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.grossSales == 0 ? "" : checkout.grossSales}
                    placeholder={"$1,000,000"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "grossSales", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {alerts.grossSales && <AlertHighlight>{alerts.grossSales}</AlertHighlight>}
                    {errors.grossSales && <ErrorMsg>{errors.grossSales}</ErrorMsg>}
                    <Label>Bar Sales</Label>
                    <NumberFormat
                    allowNegative={false}
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.barSales == 0 ? "" : checkout.barSales}
                    placeholder={"$25"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "barSales", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {errors.barSales && <ErrorMsg>{errors.barSales}</ErrorMsg>}
                    <Label>Bottle Count</Label>
                    <NumberFormat
                    allowNegative={false}
                    type="tel"
                    decimalScale={0}
                    displayType="input"
                    thousandSeparator={true}
                    value={checkout.numberOfBottlesSold == 0 ? "" : checkout.numberOfBottlesSold}
                    placeholder={"Bottle Count"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "numberOfBottlesSold", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {alerts.numberOfBottlesSold && <AlertHighlight>{alerts.numberOfBottlesSold}</AlertHighlight>}
                    <Label>Bottle Value</Label>
                    <NumberFormat
                    allowNegative={false}
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    prefix={'$'}
                    thousandSeparator={true}
                    value={checkout.nonTipOutBarSales == 0 ? "" : checkout.nonTipOutBarSales}
                    placeholder={"Don't Forget the Dom"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "nonTipOutBarSales", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {alerts.nonTipOutBarSales && <AlertHighlight>{alerts.nonTipOutBarSales}</AlertHighlight>}
                    <Label>Credit Card Tips</Label>
                    <NumberFormat
                    allowNegative={false}
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.ccTips == 0 ? "" : checkout.ccTips}
                    placeholder={"$25"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "ccTips", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {alerts.ccTips && <AlertHighlight>{alerts.ccTips}</AlertHighlight>}
                    <Label>Cash Tips</Label>
                    <NumberFormat
                    allowNegative={false}
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.cashTips == 0 ? "" : checkout.cashTips}
                    placeholder={"taxation is theft"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "cashTips", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {alerts.cashTips && <AlertHighlight>{alerts.cashTips}</AlertHighlight>}
                    <Label>Credit Card Auto Gratuity</Label>
                    <NumberFormat
                    allowNegative={false}
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    value={checkout.ccAutoGrat == 0 ? "" : checkout.ccAutoGrat}
                    placeholder={"Auto Grat"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "ccAutoGrat", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {alerts.ccAutoGrat && <AlertHighlight>{alerts.ccAutoGrat}</AlertHighlight>}
                    <Label>Cash Auto Gratuity</Label>
                    <NumberFormat
                    allowNegative={false}
                    type="tel"
                    decimalScale={2}
                    displayType="input"
                    thousandSeparator={true}
                    prefix={'$'}
                    isNumericString={true}
                    value={checkout.cashAutoGrat == 0 ? "" : checkout.cashAutoGrat}
                    placeholder={"Cash Auto Grat"}
                    onValueChange={(values) => {
                        const { value} = values;
                        const keyValue = {key: "cashAutoGrat", value: parseInt(value)};
                        updateCheckout(keyValue);
                    }} />
                    {alerts.cashAutoGrat && <AlertHighlight>{alerts.cashAutoGrat}</AlertHighlight>}
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
    errors: PropTypes.object,
    alerts: PropTypes.object,

}

export default CheckoutForm;