import React from 'react';
import styled from 'styled-components';
import { Modal, Overlay } from 'react-modal-construction-kit';

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

export default class CheckoutModal extends React.Component {
    constructor(props, context){
        super(props, context);
        
        this.state = {
        isModalVisible: false
    }
}

    componentWillReceiveProps(nextProps) {
        if (nextProps.isModalVisible != this.state.isModalVisible){
            this.setState({
                isModalVisible: nextProps.isModalVisible
            })
        }
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
                <h1>Add Checkout</h1>
                <p> Hi there </p>
                <Footer />
                </Modal>
                <Overlay
                isVisible={isModalVisible} />
            </div>
        )
    }
}