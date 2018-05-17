// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CheckoutColumn from './CheckoutColumn';
import { colors } from '../Constants';
import reorder, { reorderCheckoutMap } from '../Reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type {
    DropResult,
    DragStart,
    DraggableLocation,
    DroppableProvided,
} from 'react-beautiful-dnd';
import type { CheckoutMap } from '../DNDTypes';

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
  initial: CheckoutMap,
  containerHeight?: string,
  staffMemberId: number,
  onSave: (approved: any, unapproved: any) => void,
  onCancel: () => void,
  shouldMap: boolean,
|}

type State = {|
    columns: CheckoutMap,
    ordered: string[],    
|}

export default class CheckoutBoard extends Component<Props, State> {
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

     console.log(this.state.columns);
 }


 //boardRef: ?HTMLElement

 //Whenever a page is refreshed while on the manage staff screen, there
 //needs to be a check for when the completed list of approved jobs comes in
componentWillReceiveProps(nextProps: any){
    if (this.state.columns != nextProps.inital){
        this.setState({
            columns: nextProps.initial,
            ordered: Object.keys(nextProps.initial)
        });
    }
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

    const data = reorderCheckoutMap({
        checkoutMap: this.state.columns,
        source,
        destination,
    });

    //reoderJobMap sets its jobMap property as the result of the reorder function
    //so it has to be accesed as a property and not the result of a function
    this.setState({
        columns: data.checkoutMap,
    });
 }

 render(){
     const columns: CheckoutMap = this.state.columns;
     const ordered: string[] = this.state.ordered;
     const { containerHeight } = this.props;
     const shouldMap: boolean = this.props.shouldMap;

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
                <CheckoutColumn
                shouldMap={shouldMap}
                key={key}
                index={index}
                title={key}
                checkouts={columns[key]}
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
        </DragDropContext>
     );
 }
}