import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Overlay } from 'react-modal-construction-kit';
import momentPropTypes from 'react-moment-proptypes';
import CheckoutForm from './CheckoutForm';
import { Footer, Header, CheckoutButtonWrapper, CheckoutButton } from '../../styles/StyledComponents/ModalStyledComponents/ModalCommonDesigns';

export default class CheckoutModal extends React.Component {
    constructor(props, context){
        super(props, context);
        
        this.state = {
        isModalVisible: false,
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
        if (keyValue.value === '' || isNaN(keyValue.value)){
            keyValue.value = '0';
        }
        this.props.onChange(keyValue);
    }

    render(){
        const { isModalVisible } = this.state;
        const { updatingCheckout } = this.props;

        return (
            <div>
                <Modal
                onClickOutside={this.props.close}
                onClosed={this.props.close}
                isOpen={isModalVisible}
                >
                <Header>{this.props.updatingCheckout ? 
                this.props.selectedStaffMemberName : `Add ${this.props.jobSelected} Checkout`}</Header>
                <CheckoutForm checkout={this.props.checkout} approvedStaff={this.props.approvedStaff}
                updateCheckout={this.updateCheckout} onStaffSelect={this.props.onStaffSelect} 
                errors={this.props.errors} alerts={this.props.alerts} 
                selectedStaffMemberId={this.props.selectedStaffMemberId}
                selectedStaffMemberName={this.props.selectedStaffMemberName}/>
                { updatingCheckout ?
                <CheckoutButtonWrapper>
                <CheckoutButton onClick={this.props.onCheckoutSubmit}>Update</CheckoutButton>
                <CheckoutButton onClick={this.props.close}>Cancel</CheckoutButton>
                <CheckoutButton >Delete</CheckoutButton>
                </CheckoutButtonWrapper>
                :
                <CheckoutButtonWrapper>
                <CheckoutButton onClick={this.props.onCheckoutSubmit}>Add</CheckoutButton>
                <CheckoutButton onClick={this.props.close}>Cancel</CheckoutButton>
                </CheckoutButtonWrapper>
                }
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
    selectedStaffMemberId: PropTypes.number,
    close: PropTypes.func.isRequired,
    updatingCheckout: PropTypes.bool.isRequired,
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
    onCheckoutSubmit: PropTypes.func,
    onStaffSelect: PropTypes.func,
    checkoutDate: momentPropTypes.momentObj,
    errors: PropTypes.object,
    alerts: PropTypes.object,
};