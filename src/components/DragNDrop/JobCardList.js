// @flow
import React from 'react';
import styled from 'styled-components';
import JobCard from './JobCard';
import { grid, colors } from './Constants';
import type { CardTitle, Job } from './DNDTypes';
import Title from './Primatives/Title';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import type {
    DroppableProvided,
    DroppableStateSnapshot,
    DraggableProvided,
    DraggableStateSnapshot,
} from 'react-beautiful-dnd';

const Wrapper = styled.div`
background-color: ${({isDraggingOver}) => (isDraggingOver ? colors.blue.lighter : colors.blue.light)};
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
    jobs: Job[],
    internalScroll?: boolean,
    isDropDisabled ?: boolean,
    style?: Object,
    ignoreContainerClipping?: boolean
    |}

type JobListProps = {|
    jobs: Job[]
    |}

class InnerJobList extends React.Component<JobListProps>{
    shouldComponentUpdate(nextProps: JobListProps){
        if (nextProps.jobs !== this.props.jobs) {
            return true;
        }
        
        return false;
    }

    render(){
        return this.props.jobs.map((job: Job, index: number) => (
            <Draggable key={job.apiId} draggableId={job.id} index={index}>
            {
                (dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                    <JobCard
                    job={job}
                    key={job.id}
                    title={job.title}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                    />
                )
            }
            </Draggable>)

        )
    }
}
