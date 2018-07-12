import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Overlay } from 'react-modal-construction-kit';
import { Footer, Header, CheckoutButtonWrapper, CheckoutButton } from '../../styles/StyledComponents/ModalStyledComponents/ModalCommonDesigns';
import EarningsDisplay from './EarningsDisplay';

export default class EarningModal extends React.Component{
  static propTypes = {
    earning: PropTypes.shape({
      autoGratuity: PropTypes.number.isRequired,
      cashTips: PropTypes.number.isRequired,
      ccTips: PropTypes.number.isRequired,
      jobWorked: PropTypes.string.isRequired,
      totalTipsForPayroll: PropTypes.number.isRequired,
    }),
    closeEarningsModal: PropTypes.func.isRequired,
    isEarningsModalVisible: PropTypes.bool.isRequired,
  }
  constructor(props, context){
    super(props, context);

    this.state = {
    isModalVisible: false, 
  };
}

componentWillReceiveProps(nextProps){
  if (this.state.isModalVisible !== nextProps.isEarningsModalVisible){
    this.setState({
      isModalVisible: nextProps.isEarningsModalVisible
    });
  }
}

  render(){
    const { isModalVisible } = this.state;
    const { earning, closeEarningsModal } = this.props;
    return(
      <div>
        <Modal
        isOpen={isModalVisible}
        onClickOutside={closeEarningsModal}
        onClosed={closeEarningsModal}>
          <Header>Individual Earnings: </Header>
          <EarningsDisplay earning={earning} formattedCcAndAuto={earning.cashTips + earning.autoGratuity}/>
          <CheckoutButtonWrapper>
            <CheckoutButton onClick={closeEarningsModal}>Ok</CheckoutButton>
          </CheckoutButtonWrapper>
          <Footer />
        </Modal>
        <Overlay
        isVisible={isModalVisible} />
      </div>
    )
  }
}