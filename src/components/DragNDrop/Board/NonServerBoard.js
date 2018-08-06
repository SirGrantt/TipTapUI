import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reorder, { reorderCheckoutMap } from '../Reorder';
import { ParentContainer, ScrollWrapper, Container } from '../../../styles/StyledComponents/DnDBoardStyles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CheckoutColumn from './CheckoutColumn';
import AddCheckoutButton from '../../../styles/StyledComponents/AddCheckoutButton';

class NonServerBoard extends Component {
  static propTypes = {
    initial: PropTypes.object,

  }
constructor(props, context) {
  super(props, context);

  this.state = {
     columns: this.props.initial,
     ordered: Object.keys(this.props.initial)
  };
}

componentWillReceiveProps(nextProps){
  if (this.state.columns != nextProps.inital){
      this.setState({
          columns: nextProps.initial,
          ordered: Object.keys(nextProps.initial)
      });
  }
}

onDragEnd = (result) => {
  //dropped nowhere
  if (!result.destination) {
      return;
  }
  const source = result.source;
  const destination = result.destination;

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

  this.setState({
      columns: data.checkoutMap,
  });
}

  render() {
    const { columns, ordered } = this.state;
    const { jobSelected, ranCheckoutTeamIds } = this.props;
    const { containerHeight } = this.props;

    const board = (
      <Droppable
      droppableId = "board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
      >
      {(provided) => (
          <Container innerRef={provided.innerRef} {...provided.droppableProps}>
          {ordered.map((key: string, index: number) => (
              <CheckoutColumn
              checkoutRan={ranCheckoutTeamIds.some(i => i === Number(key.split('_').pop())) ? 
              true : false}
              key={key}
              index={index}
              title={key}
              checkouts={columns[key]}
              viewEarning={this.props.viewEarning}
              runCheckout={this.props.runCheckout}
              reviewCheckout={this.props.reviewCheckout}
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

export default NonServerBoard;