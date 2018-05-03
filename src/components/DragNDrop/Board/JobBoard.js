// @flow
import React, { Component } from 'react';
//may need , { injectGlobal } from styled-components, but leaving out for now as
//it may only be a way for the dnd example to achieve their style that I don't
//want to copy
import styled from 'styled-components';
import Column from './Column';
import { colors } from '../Constants';
import reorder, { reorderJobMap } from '../Reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type {
    DropResult,
    DragStart,
    DraggableLocation,
    DroppableProvided,
} from 'react-beautiful-dnd';
import { updateStaffMemberError } from '../../../reduxActions/serviceStaffActions';
import type { JobMap } from '../DNDTypes';

const ParentContainer = styled.div`
    height: ${({height}) => height};
    overflow-x: hidden;
    overflow-y: auto;
`;

const Container = styled.div`
 min-height: 50vh;
 min-width: 100vw;
 display: inline-flex;
 justify-content: center;
`;

const Button = styled.button`
background: ${colors.blue.light};
color: ${colors.black};
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid blue;
border-radius: 3px;
float: right;
`

type Props = {|
  initial: JobMap,
  containerHeight?: string,
  staffMemberId: number,
  onSave: (approved: any, unapproved: any) => void  
|}

type State = {|
    columns: JobMap,
    ordered: string[],    
|}

export default class JobBoard extends Component<Props, State> {
 /*eslint-disable react/sort-comp */

 state: State = {
     columns: this.props.initial,
     ordered: Object.keys(this.props.initial),
 }

 constructor(props: Props, context: any){
     super(props, context)
     this.state = ({
         columns: this.props.initial,
         ordered: Object.keys(this.props.initial)
     });

     //$FlowFixMe
     this.updateStaffMember = this.updateStaffMember.bind(this);
 }


 boardRef: ?HTMLElement


 /* if I decide to go with the global inject style option then it goes here
 with an eslint disable
 componentDidMount() {
     injectGlobal`
        body {
            background: ${colors.blue.deep}

        }
     `;
 }
 */

updateStaffMember(event: any){
    event.preventDefault();
    this.props.onSave(this.state.columns["Approved"], this.state.columns["Unapproved"]);
}

 onDragEnd = (result: DropResult) => {

    //dropped nowhere
    if (!result.destination) {
        return;
    }

    const source: DraggableLocation = result.source;
    const destination : DraggableLocation = result.destination;

    //did not move anywhere
    if (source.droppableId == destination.droppableId &&
    source.index == destination.index)
    {
        return;
    }

    if (result.type == 'COLUMN')
    {
        const ordered: string[] = reorder(
            this.state.ordered,
            source.index,
            destination.index,
        );
        
        this.setState({
            ordered,
        });

        return;
    }

    const data = reorderJobMap({
        jobMap: this.state.columns,
        source,
        destination,
    });

    //reoderJobMap sets its jobMap property as the result of the reorder function
    //so it has to be accesed as a property and not the result of a function
    this.setState({
        columns: data.jobMap,
    });
 }

 render(){
     const columns: JobMap = this.state.columns;
     const ordered: string[] = this.state.ordered;
     const { containerHeight } = this.props;

     const board = (
        <Droppable
        droppableId = "board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        >
        {(provided: DroppableProvided) => (
            <Container innerRef={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key: string, index: number) => (
                <Column
                key={key}
                index={index}
                title={key}
                jobs={columns[key]}
                />
            ))}
            </Container>
        ) }
        </Droppable>
     );

     return(
         <DragDropContext
         onDragEnd={this.onDragEnd}
         >
         {this.props.containerHeight ? (
             <ParentContainer height={containerHeight}>{board}</ParentContainer>
         ) : (
             board
         )}
         <Button>Cancel</Button>
        <Button onClick={this.updateStaffMember}>Save</Button>
        </DragDropContext>
     );
 }
}
//<Button onClick={)}>Save</Button>