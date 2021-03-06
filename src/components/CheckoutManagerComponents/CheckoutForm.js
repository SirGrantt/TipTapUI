import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import SelectInput from "../common/SelectInput";
import { colors } from '../DragNDrop/Constants';

const Label = styled.p`
  font-weight: bold;
  margin-top: 1em;
`;

const Form = styled.form`
  margin-left: 0.5em;
  margin-right: 0.5em;
`;

const ErrorMsg = styled.div`
  color: ${colors.red.errorRed};
  text-size: 0.5em;
  text-align: center;
  border-radius: 0.5em;
`;

const AlertHighlight = styled.div`
  background-color: rgb(244, 241, 66);
  color: black;
  text-size: 0.5em;
  text-align: center;
  border-radius: 0.5em;
`;

const Column = styled.div`
float: left;
width: 50%
`;

const Row = styled.div`
overflow: hidden;
padding: 10px;
`;

let CheckoutForm = ({
  checkout,
  approvedStaff,
  updateCheckout,
  onStaffSelect,
  errors,
  alerts,
  selectedStaffMemberName
}) => {
  return (
    <Form id="checkoutModal">
      <SelectInput
        options={approvedStaff}
        name="staffid"
        label="Select Staff Member:"
        defaultOption={selectedStaffMemberName}
        onChange={onStaffSelect}
      />
      {errors.staffMember && <ErrorMsg>{errors.staffMember}</ErrorMsg>}
      <Column>
      <Row>
      <Label>Gross Sales</Label>
      <NumberFormat
        allowNegative={false}
        decimalScale={2}
        type="tel"
        displayType="input"
        thousandSeparator={true}
        prefix={"$"}
        value={checkout.grossSales == 0 ? "" : checkout.grossSales}
        placeholder={"$1,000,000"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "grossSales", value: value};
          updateCheckout(keyValue);
        }}
      />
      {alerts.grossSales && (
        <AlertHighlight>{alerts.grossSales}</AlertHighlight>
      )}
      {errors.grossSales && <ErrorMsg>{errors.grossSales}</ErrorMsg>}
      </Row>
      <Row>
      <Label>Bar Sales</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        thousandSeparator={true}
        prefix={"$"}
        value={checkout.barSales == 0 ? "" : checkout.barSales}
        placeholder={"$25"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "barSales", value: value};
          updateCheckout(keyValue);
        }}
      />
      {errors.barSales && <ErrorMsg>{errors.barSales}</ErrorMsg>}
      </Row>
      <Row>
      <Label>Bottle Count</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={0}
        displayType="input"
        thousandSeparator={true}
        value={
          checkout.numberOfBottlesSold == 0 ? "" : checkout.numberOfBottlesSold
        }
        placeholder={"Bottle Count"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "numberOfBottlesSold", value: value};
          updateCheckout(keyValue);
        }}
      />
      {alerts.numberOfBottlesSold && (
        <AlertHighlight>{alerts.numberOfBottlesSold}</AlertHighlight>
      )}
      </Row>
      <Row>
      <Label>Bottle Value</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        prefix={"$"}
        thousandSeparator={true}
        value={
          checkout.nonTipOutBarSales == 0 ? "" : checkout.nonTipOutBarSales
        }
        placeholder={"Don't Forget the Dom"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "nonTipOutBarSales", value: value};
          updateCheckout(keyValue);
        }}
      />
      {errors.nonTipOutBarSales && (
        <ErrorMsg>{errors.nonTipOutBarSales}</ErrorMsg>
      )}
      {alerts.nonTipOutBarSales && (
        <AlertHighlight>{alerts.nonTipOutBarSales}</AlertHighlight>
      )}
      </Row>
      <Row>
      <Label>Bar Special Line</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        prefix={"$"}
        thousandSeparator={true}
        value={
          checkout.barSpecialLine == 0 ? "" : checkout.barSpecialLine
        }
        placeholder={"transfers or special cases"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "barSpecialLine", value: value};
          updateCheckout(keyValue);
        }}
      />
      {errors.barSpecialLine && (
        <ErrorMsg>{errors.barSpecialLine}</ErrorMsg>
      )}
      {alerts.barSpecialLine && (
        <AlertHighlight>{alerts.barSpecialLine}</AlertHighlight>
      )}
      </Row>
      </Column>
      <Column>
      <Row>
      <Label>Credit Card Tips</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        thousandSeparator={true}
        prefix={"$"}
        value={checkout.ccTips == 0 ? "" : checkout.ccTips}
        placeholder={"$25"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "ccTips", value: value };
          updateCheckout(keyValue);
        }}
      />
      {errors.tips && <ErrorMsg>{errors.tips}</ErrorMsg>}
      {alerts.ccTips && <AlertHighlight>{alerts.ccTips}</AlertHighlight>}
      </Row>
      <Row>
      <Label>Cash Tips</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        thousandSeparator={true}
        prefix={"$"}
        value={checkout.cashTips == 0 ? "" : checkout.cashTips}
        placeholder={"taxation is theft"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "cashTips", value: value};
          updateCheckout(keyValue);
        }}
      />
      {errors.tips && <ErrorMsg>{errors.tips}</ErrorMsg>}
      {alerts.cashTips && <AlertHighlight>{alerts.cashTips}</AlertHighlight>}
      </Row>
      <Row>
      <Label>Credit Card Auto Gratuity</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        thousandSeparator={true}
        prefix={"$"}
        value={checkout.ccAutoGrat == 0 ? "" : checkout.ccAutoGrat}
        placeholder={"Auto Grat"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "ccAutoGrat", value: value};
          updateCheckout(keyValue);
        }}
      />
      {alerts.ccAutoGrat && (
        <AlertHighlight>{alerts.ccAutoGrat}</AlertHighlight>
      )}
      </Row>
      <Row>
      <Label>Cash Auto Gratuity</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        thousandSeparator={true}
        prefix={"$"}
        isNumericString={true}
        value={checkout.cashAutoGrat == 0 ? "" : checkout.cashAutoGrat}
        placeholder={"Cash Auto Grat"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "cashAutoGrat", value: value };
          updateCheckout(keyValue);
        }}
      />
      {alerts.cashAutoGrat && (
        <AlertHighlight>{alerts.cashAutoGrat}</AlertHighlight>
      )}
      </Row>
      <Row>
      <Label>SA Special Line</Label>
      <NumberFormat
        allowNegative={false}
        type="tel"
        decimalScale={2}
        displayType="input"
        prefix={"$"}
        thousandSeparator={true}
        value={
          checkout.saSpecialLine == 0 ? "" : checkout.saSpecialLine
        }
        placeholder={"when extra tipout is needed"}
        onValueChange={values => {
          const { value } = values;
          const keyValue = { key: "saSpecialLine", value: value};
          updateCheckout(keyValue);
        }}
      />
      {errors.saSpecialLine && (
        <ErrorMsg>{errors.saSpecialLine}</ErrorMsg>
      )}
      {alerts.saSpecialLine && (
        <AlertHighlight>{alerts.saSpecialLine}</AlertHighlight>
      )}
      </Row>
      </Column>
    </Form>
  );
};

CheckoutForm.propTypes = {
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
  updateCheckout: PropTypes.func,
  approvedStaff: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      status: PropTypes.string,
      id: PropTypes.number
    })
  ),
  onStaffSelect: PropTypes.func,
  errors: PropTypes.object,
  alerts: PropTypes.object,
  selectedStaffMemberName: PropTypes.string,
};

export default CheckoutForm;
