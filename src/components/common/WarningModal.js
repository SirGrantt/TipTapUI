import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalConstruct } from 'react-modal-construction-kit';
import styled from 'styled-components';
import { colors } from '../DragNDrop/Constants';

const WarningHeader = styled.h1`
padding: 1em;
background-color: ${colors.blue.columnBodyBlue};
color: white;
border-top-left-radius: 2px;
border-top-right-radius: 2px;
`;

const WarningContent = styled.div`
margin-top: 2em;
margin-left: 2em;
margin-right: 2em;
margin-bottom: 2em;
font-family: Tahoma, Verdana, Segoe, sans-serif;
`;

const Footer = styled.div`
    padding: 1em;
    background-color: ${colors.blue.headerBlue};
    display: flex;
    border-radius: 0 0 2px 2px;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    justify-content: flex-end;
  
    > :not(:last-child) {
      margin-right: .25rem;
    }
`;

const WarningModal = ({title, children, footer, ...props}) => (
    <ModalConstruct
    style={{borderLeft: 'solid black', borderWidth: 'thick'}}
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