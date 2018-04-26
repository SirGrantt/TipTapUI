// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { grid, colors, borderRadius } from '../Constants';
import { Draggable } from "react-beautiful-dnd";
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import JobList from '../JobCardList';
import Title from '../Primatives/Title';
import type { Job } from '../DNDTypes';

const Container = styled.div`
    margin: ${grid}px;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: ${borderRadius}px;
    border-top-right-radius: ${borderRadius}px;
    background-color: ${({isDragging}) => (isDragging ? colors.blue.lighter : colors.blue.light)};
    transition: background-color 0.1s ease;

    &:hover {
        background-color: ${colors.blue.lighter};
    }
`;

type Props = {|
    title: string,
    jobs: Job[],
    index: number,    
|}

export default class Column extends Component<Props> {
    render(){
        const title: string = this.props.title;
        const jobs: Job[] = this.props.jobs;
        const index: number = this.props.index;
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
                    {title}
                    </Title>
                </Header>
                <JobList
                listId={title}
                listType="CARD"
                jobs={jobs}
                />
                </Container>
            )}
            </Draggable>
        );
    }
}