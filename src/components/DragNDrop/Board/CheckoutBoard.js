// @flow
import React, { Component } from 'react';
import CheckoutColumn from './CheckoutColumn';
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
import { ParentContainer, ScrollWrapper, Container } from '../../../styles/StyledComponents/DnDBoardStyles';

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
  ranCheckoutTeamIds: Array<number>,
  addCheckoutToTeam: (transformedData: Object) => void,
  removeCheckoutFromTeam: (transformedData: Object) => void,
  reviewCheckout: () => void,
  viewEarning: () => void,
  runCheckout: () => void,
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
     super(props, context);
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
        // $FlowFixMe
        result.destination.droppableId.split('_').pop());

        if(transformedData === undefined)
        {
            return;
        }
        else if (transformedData.sourceId === 'Individual')
        {
            this.props.addCheckoutToTeam(transformedData);
        }
        else if (transformedData.teamId === 'Individual')
        {
            this.props.removeCheckoutFromTeam(transformedData);
        }
        else {
            this.props.addCheckoutToTeam(transformedData);
        }

    }
 }

 render(){
     const columns: CheckoutMap = this.state.columns;
     const ordered: string[] = this.state.ordered;
     const { containerHeight } = this.props;
     const shouldMap: boolean = this.props.shouldMap;
     const jobSelected: Object = this.props.jobSelected;
     const ranCheckoutTeamIds: Array<number> = this.props.ranCheckoutTeamIds;

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
                checkoutRan={ranCheckoutTeamIds.some(i => i === Number(key.split('_').pop())) ? 
                true : false}
                shouldMap={shouldMap}
                key={key}
                index={index}
                title={key}
                checkouts={columns[key]}
                viewEarning={this.props.viewEarning}
                runCheckout={this.props.runCheckout}
                reviewCheckout={this.props.reviewCheckout}
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