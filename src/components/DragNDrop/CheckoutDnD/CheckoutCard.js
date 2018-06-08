// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import type { DraggableProvided } from 'react-beautiful-dnd';
import type { Checkout } from '../DNDTypes';
import {  colors, grid } from '../Constants';
import styled from 'styled-components';


type Props = {
    checkout: Checkout,
    isDragging: boolean,
    provided: DraggableProvided,
    autofocus?: boolean
}

const Container = styled.a`
border-radius: .5em;
border: 1px solid grey;
background-color: ${({isDragging}) => (isDragging ? colors.green : colors.white)};

box-shadow: ${({isDragging}) => (isDragging ? `2px 2px 1px ${colors.shadow}` : 'none')};
padding: ${grid}px;
min-height: 40px;
margin-bottom: ${grid}px;
user-select: none;
transition: background-color 0.1s ease;

/* anchor overrides */
color: ${colors.black};

&:hover {
    color: ${colors.black};
    text-decoration: none;
}
&:focus {
    outline: 2px solid ${colors.purple};
    box-shadow: none;
}

/* flexbox */
display: flex;
align-items: center;
`;

const Title = styled.h1`
color: ${colors.blue};
font-size: 1.25em;
font-weight: bold;
text-align: center;
margin-right: .75em;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;
const GrossSales = styled.div`
font-family: Verdana,Geneva,sans-serif;
&::before {
    content: "Gross Sales: "
}
`;

const CredCardTips = styled.div`
&::before {
    content: "Credit Card Tips: "
}
`;

const AutoGrat = styled.div`
&::before {
    content: "Auto Gratuity: "
}
`; 

export default class CheckoutCard extends React.PureComponent<Props> {
componentDidMount(){
    if (!this.props.autofocus){
        return;
    }

    //eslint-disable-next-line react/no-find-dom-node
    const node: HTMLElement = (ReactDOM.findDOMNode(this) : any);
    node.focus();
}


calculateAutoGrat = () => {
        return this.props.checkout.ccAutoGrat;
}

render() {
    const {checkout, isDragging, provided} = this.props;

    return (
        <Container
        isDragging={isDragging}
        innerRef={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        >
        <Title>{checkout.staffMemberName}</Title>
        <Content>
            <GrossSales>{checkout.grossSales}</GrossSales>
            <CredCardTips>{checkout.ccTips}</CredCardTips>
            <AutoGrat>{checkout.ccAutoGrat + checkout.cashAutoGrat}</AutoGrat>
        </Content>
        </Container>
    );
}
}