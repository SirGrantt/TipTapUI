// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CheckoutColumn from './CheckoutColumn';
import { colors } from '../Constants';
import { transformTeamData } from '../../../Utils/teamFunctions';
import reorder, { reorderCheckoutMap } from '../Reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type {
    DropResult,
    //DragStart,
    DraggableLocation,
    DroppableProvided,
} from 'react-beautiful-dnd';
import type { CheckoutMap } from '../DNDTypes';
import AddCheckoutButton from '../../../styles/StyledComponents/AddCheckoutButton';
import AddTeamButton from '../../../styles/StyledComponents/AddTeamButton';

const ParentContainer = styled.div`
    height: ${({height}) => height};
    overflow-x: hidden;
    overflow-y: auto;
`;

const ScrollWrapper = styled.div`
display: box;
flex-wrap: nowrap;
overflow-x: auto;
`;

const Container = styled.div`
 min-height: 50vh;
 min-width: 100vw;
 display: inline-flex;
 justify-content: left;
 background-color: ${colors.black};
`;

type Props = {|
  initial: CheckoutMap,
  containerHeight?: string,
  staffMemberId: number,
  onSave: (approved: any, unapproved: any) => void,
  onCancel: () => void,
  shouldMap: boolean,
  openAddCheckoutModal: () => void,
  jobSelected: Object,
  addTeam: () => void,
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

    if (result.type == 'CARD')
    {
        let transformedData = transformTeamData(result.draggableId, 
        result.source.droppableId.split('_').pop(),
        result.destination.droppableId.split('_').pop());

        if(transformedData === undefined)
        {
            return;
        }
        else if (transformedData.source === 'Individual')
        {
            console.log('I am adding to a team!');
        }
        else if (transformedData.dest === 'Individual')
        {
            console.log('I am removing from a team!');
        }
        else {
            console.log(`I am removing from team ${transformedData.source} and adding to team 
            ${transformedData.dest}`);
        }

    }
 }

 render(){
     const columns: CheckoutMap = this.state.columns;
     const ordered: string[] = this.state.ordered;
     const { containerHeight } = this.props;
     const shouldMap: boolean = this.props.shouldMap;
     const jobSelected: Object = this.props.jobSelected;

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
            <AddTeamButton onClick={this.props.addTeam}>Add Team</AddTeamButton>
            </Container>
        ) }
        </Droppable>
     );

     return(
         <DragDropContext
         onDragEnd={this.onDragEnd}
         >
         <ScrollWrapper>
         {this.props.containerHeight ? (
             <ParentContainer height={containerHeight}>{board}</ParentContainer>
         ) : (
             board
         )}
         </ScrollWrapper>
         <AddCheckoutButton onClick={this.props.openAddCheckoutModal} disabled={jobSelected.value == 0 ? true : false}>
         Add Checkout</AddCheckoutButton>
        </DragDropContext>
     );
 }
}