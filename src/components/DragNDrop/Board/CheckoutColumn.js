// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { grid, colors } from '../Constants';
import { Draggable } from "react-beautiful-dnd";
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import CheckoutCardList from '../CheckoutDnD/CheckoutCardList';
import Title from '../Primatives/Title';
import type { Checkout } from '../DNDTypes';


const Container = styled.div`
    margin: ${grid}px;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border-top-left-radius: .5em;
    border-top-right-radius: .5em;
    background-color: ${({isDragging}) => (isDragging ? colors.blue.lighter : colors.headerGreen)};
    transition: background-color 0.1s ease;
    
    &:hover {
        background-color: ${colors.blue.lighter};
    }
`;

type Props = {|
    title: string,
    checkouts: Checkout[],
    index: number,   
    shouldMap: boolean 
|}

export default class CheckoutColumn extends Component<Props> {
    render(){
        const title: string = this.props.title;
        const checkouts: Checkout[] = this.props.checkouts;
        const index: number = this.props.index;
        const shouldMap: boolean = this.props.shouldMap;
        return(
            <Draggable draggableId={title} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <Container
                innerRef={provided.innerRef}
                {...provided.draggableProps}
                >
                <Header isDragging={snapshot.isDragging}>
                    <Title
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    >
                    {title === 'Individual'? title : 'Team'}
                    </Title>
                </Header>
                <CheckoutCardList
                shouldMap={shouldMap}
                listId={title}
                listType="CARD"
                checkouts={checkouts}
                />
                </Container>
            )}
            </Draggable>
        );
    }
}