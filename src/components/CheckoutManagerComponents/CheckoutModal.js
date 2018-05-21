import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Overlay } from 'react-modal-construction-kit';
import { defaultCheckout } from '../../constants/GeneralConstants';
import NumberInput from '../common/NumberInput';
import NumberFormat from 'react-number-format';

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

export default class CheckoutModal extends React.Component {
    constructor(props, context){
        super(props, context);
        
        this.state = {
        isModalVisible: false,
        editingExistingCheckout: false,

    }
}

    componentWillReceiveProps(nextProps) {
        if (nextProps.isModalVisible != this.state.isModalVisible){
            this.setState({
                isModalVisible: nextProps.isModalVisible
            })
        }
    }

    updateCheckout = (keyValue) => {
        this.props.onChange(keyValue);
    }

    close = () => {
        this.setState({
            isModalVisible: false
        })
    }

    render(){
        const { isModalVisible } = this.state

        return (
            <div>
                <Modal
                onClickOutside={this.close}
                onClosed={this.close}
                isOpen={isModalVisible}
                >
                <Form id="checkoutModal">
                    <Header>{this.state.editingExistingCheckout ? this.props.checkout.staffMemberName : "Add Checkout"}</Header>
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
                        const keyValue = {key: "grossSales", value: formattedValue};
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
                        const keyValue = {key: "barSales", value: formattedValue};
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
                        const keyValue = {key: "ccTips", value: formattedValue};
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
                        const keyValue = {key: "cashTips", value: formattedValue};
                        this.updateCheckout(keyValue);
                    }} />
                </Form>
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
    checkout: PropTypes.object.isRequired
}