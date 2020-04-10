import React, { Component } from 'react'
import TableResult from './TableResult'
import _ from 'lodash'
import PropTypes from 'prop-types'

class TableSort extends Component {

    constructor(props) {
        super(props);
    
    this.state = {
        column: null,
        direction: null,
        hasClicked: false
      }
      
    //   this.stocks = this.props.stocks
    }


    

    render() {
       
        const { column, direction,stocks } = this.state
        
    
        return (
            <div>
                <TableResult stocks={this.props.stocks} handleSort={this.handleSort} column={column} direction={direction}/>
            </div>
        )

        
    }
}

TableSort.propTypes = {
    stocks : PropTypes.array.isRequired
}

export default TableSort
