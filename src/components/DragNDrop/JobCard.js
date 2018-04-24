// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import type { DraggableProvided } from 'react-beautiful-dnd';
import type { Job } from './DNDTypes';
import { borderRadius, colors, grid } from './Constants';
import styled from 'styled-components';


type Props = {
    job: Job,
    isDragging: boolean,
    provided: DraggableProvided,
    autofocus?: boolean
}

const Container = styled.a`
border-radius: ${borderRadius}px;
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
font-size: 1.5em;
font-weight: bold;
text-align: center;
`;

export default class JobCard extends React.PureComponent<Props> {
componentDidMount(){
    if (!this.props.autofocus){
        return;
    }

    //eslint-disable-next-line react/no-find-dom-node
    const node: HTMLElement = (ReactDOM.findDOMNode(this) : any);
    node.focus();
}

render() {
    const {job, isDragging, provided} = this.props;

    return (
        <Container
        isDragging={isDragging}
        innerRef={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        >
        <Title>{job.title}</Title>
        </Container>
    );
}
}

