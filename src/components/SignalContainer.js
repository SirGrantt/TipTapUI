import React from 'react';
import PropTypes from 'prop-types';
import WarningModal from '../components/common/WarningModal';
import styled from 'styled-components';

import { createContainer, SignalEvents, SignalTypes } from 'redux-signal';

const Button = styled.button`
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
background-color: ${props => props.primary ? '#4eb5f1' : 'red' };
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
`;

const SignalContainer = 
({ event,
//destroy,
close,
modal }) => {
    return (
        <WarningModal
            isOpen={modal.isVisible}
            title={modal.title}
            onClosed={close}
            footer={getFooter(modal, eventType => event(modal, eventType))}>
            {modal.message}
        </WarningModal>
    )
}

SignalContainer.propTypes = {
    event: PropTypes.func,
    destroy: PropTypes.func,
    close: PropTypes.func,
    modal: PropTypes.object
}

function getModalLabel(modal, labelType, otherwise){
    return (modal.labels && modal.labels[labelType]) || <span>{otherwise}</span>
}

function getFooter(modal, onModalEvent){
    switch (modal.type){
        case SignalTypes.YES_NO :
        return [
            <Button
            key='no'
            reject
            onClick={() => onModalEvent(SignalEvents.BTN_NO)}>
            {getModalLabel(modal, 'no', 'No Way!')}
            </Button>,
            <Button
            key='yes'
            primary
            onClick={() => onModalEvent(SignalEvents.BTN_YES)}>
            {getModalLabel(modal, 'yes', 'All Good')}
            </Button>
        ]
        case SignalTypes.YES_NO_CANCEL :
        return [
            <Button
            key='cancel'
            onClick={() => onModalEvent(SignalEvents.BTN_CANCEL)}>
            {getModalLabel(modal, 'cancel', 'Cancel')}
        </Button>,
        <Button
          key='no'
          reject
          onClick={() => onModalEvent(SignalEvents.BTN_NO)}>
          {getModalLabel(modal, 'no', 'Nope')}
        </Button>,
        <Button
          key='yes'
          reject
          onClick={() => onModalEvent(SignalEvents.BTN_YES)}>
          {getModalLabel(modal, 'yes', 'Yep')}
        </Button>
      ]

    case SignalTypes.OK_CANCEL:
      return [
        <Button
          key='cancel'
          onClick={() => onModalEvent(SignalEvents.BTN_CANCEL)}>
          {getModalLabel(modal, 'cancel', 'Cancel')}
        </Button>,
        <Button
          key='ok'
          primary
          onClick={() => onModalEvent(SignalEvents.BTN_OK)}>
          {getModalLabel(modal, 'ok', 'Ok')}
        </Button>
      ]
    case SignalTypes.OK:
      return (
        <Button
          primary
          onClick={() => onModalEvent(SignalEvents.BTN_OK)}>
          {getModalLabel(modal, 'ok', 'Ok')}
        </Button>
      )
    }
    return null;
}

export default createContainer(SignalContainer);