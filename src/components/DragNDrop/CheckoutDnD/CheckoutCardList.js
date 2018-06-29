// @flow
import React from 'react';
import styled from 'styled-components';
import CheckoutCard from './CheckoutCard';
import { grid, colors } from '../Constants';
import type { Checkout } from '../DNDTypes';
import Title from '../Primatives/Title';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import type {
    DroppableProvided,
    DroppableStateSnapshot,
    DraggableProvided,
    DraggableStateSnapshot,
} from 'react-beautiful-dnd';

const Wrapper = styled.div`
background-color: ${({isDraggingOver}) => (isDraggingOver ? colors.blue.lighter : colors.blue.columnBodyBlue)};
display: flex;
flex-direction: column;
opacity: ${({isDropDisabled}) => (isDropDisabled ? 0.5 : 'inherit')};
padding: ${grid}px;
padding-bottom: 0;
transition: background-color 0.1s ease, opacity 0.1s ease;
user-select: none;
width: 250px;
`;

const DropZone = styled.div`
/* stop list collapsing when empty */
min-height: 250px;
margin-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
overflow-x: hidden;
overflow-y: auto;
max-height: 300px;
`;

const Container = styled.div``;

type Props = {|
    listId: string,
    listType?: string,
    title?: string,
    checkouts: Checkout[],
    internalScroll?: boolean,
    isDropDisabled ?: boolean,
    style?: Object,
    ignoreContainerClipping?: boolean,
    shouldMap: boolean,
    |}

type CheckoutListProps = {|
    checkouts: Checkout[],
    |}

class InnerCheckoutList extends React.Component<CheckoutListProps>{
    shouldComponentUpdate(nextProps: CheckoutListProps){
        if (nextProps.checkouts !== this.props.checkouts) {
            return true;
        }
        
        return false;
    }

    render(){
        return this.props.checkouts.map((checkout: Checkout, index: number) => (
            <Draggable key={checkout.id} draggableId={checkout.id} index={index}>
            {
                (dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                    <CheckoutCard
                    checkout={checkout}
                    key={checkout.id}
                    title={checkout.staffMemberName}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                    />
                )
            }
            </Draggable>
            )
        ); 
    }
}

type innerListProps = {|
    dropProvided: DroppableProvided,
    checkouts: Checkout[],
    title: ?string,
    |}

class InnerList extends React.Component<innerListProps> {
    render(){
        const {checkouts, dropProvided} = this.props;
        const title = this.props.title ? ( <Title>{this.props.title}</Title>) 
        : null;

        return (
            <Container>
                {title}
                <DropZone innerRef={dropProvided.innerRef}>
                <InnerCheckoutList 
                checkouts={checkouts}
                />
                {dropProvided.placeholder}
                </DropZone>
            </Container>
        )
    }
}

export default class CheckoutCardList extends React.Component<Props> {
    render(){
        const {
            ignoreContainerClipping,
            internalScroll,
            isDropDisabled,
            listId,
            listType,
            style,
            checkouts,
            title,
            shouldMap,
        } = this.props;

        return (
            <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            >
            {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                <Wrapper
                style={style}
                isDraggingOver={dropSnapshot.isDraggingOver}
                isDropDisabled={isDropDisabled}
                {...dropProvided.droppableProps}
                >
                {internalScroll ? ( shouldMap &&
                    <ScrollContainer>
                        <InnerList
                        checkouts={checkouts}
                        title={title}
                        dropProvided={dropProvided}
                        />
                    </ScrollContainer>
                ) : ( shouldMap &&
                    <InnerList
                    checkouts={checkouts}
                    title={title}
                    dropProvided={dropProvided}
                    />
                )}
                </Wrapper>
            )}
            </Droppable> 
        );
    }
}