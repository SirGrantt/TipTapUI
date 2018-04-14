import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class SalesContainer extends React.Component{
constructor(props, context){
    super(props, context);
}


render()
 {
     return(

        <div>
            <h2>Yesterday's Sales Breakdown</h2>
            <SalesSnippet />
        </div>
     );
 };
}

SalesContainer.propTypes = {
yesterdaysSales: PropTypes.object
};

function mapStateToProps(state){

    return{
        yesterdaysSales: state.yesterdaysSales
    }
};

function mapDispatchToProps(dispatch){

};

export default connect(mapStateToProps, mapDispatchToProps)(SalesContainer);