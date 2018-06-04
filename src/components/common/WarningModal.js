import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalConstruct } from 'react-modal-construction-kit';
import styled from 'styled-components';

const WarningHeader = styled.h1`
color: maroon;
border-bottom: solid black;
border-width: thin;
`

const WarningContent = styled.div`
margin-top: 1em;
margin-left: 1em;
margin-right: 1em;
font-family: Tahoma, Verdana, Segoe, sans-serif;
`

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

const WarningModal = ({title, children, footer, ...props}) => (
    <ModalConstruct
    {...props}
    >
    <WarningHeader>
    {title}
    </WarningHeader>
    {children && (
        <WarningContent>
        {children}
        </WarningContent>
    )}
    {footer && (
        <Footer>{footer}</Footer>
    )}
    </ModalConstruct>

)

WarningModal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
    ...ModalConstruct.propTypes
}

export default WarningModal;

//made methods for checking the data, now need to create the signalContainer and modal to display when 
//something doesn't look right with the data. 