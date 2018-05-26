import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalConsutruct } from 'react-modal-construction-kit';
import styled from 'styled-components';
import { colors } from '../DragNDrop/Constants';

const WarningHeader = styled.h1`
background-color: ${colors.blue.steel};
border-bottom: solid black;
border-width: thin;
`

const WarningContent = styled.div`
margin-top: 1em;
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
    ...ModalConsutruct.propTypes
}

export default WarningModal;

//made methods for checking the data, now need to create the signalContainer and modal to display when 
//something doesn't look right with the data. 