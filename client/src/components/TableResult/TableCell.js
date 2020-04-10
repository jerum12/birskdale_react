import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table,Popup } from 'semantic-ui-react'
import Moment from 'moment'

class TableCell extends Component {
    render() {
        const { id, stock_no, transaction_date, stock_details,size_run_3,size_run_4,size_run_5,size_run_6,size_run_7,size_run_8,size_run_9,size_run_10,
            size_run_11,size_run_12,size_run_13,size_run_14,total_size_run } = this.props.stock;
        return (
            
                <Table.Row>
                  <Table.Cell>{stock_no}</Table.Cell>
                  <Table.Cell>{Moment(transaction_date).format('MM-DD-YYYY')}</Table.Cell>
                  <Popup
                     trigger={<Table.Cell className='td-details'>
                            {stock_details}
                      </Table.Cell>}
                     content= {stock_details}
                     position='right center'
                     style={toolTip}
                    />
                  <Table.Cell>{size_run_3}</Table.Cell>
                  <Table.Cell>{size_run_4}</Table.Cell>
                  <Table.Cell>{size_run_5}</Table.Cell>
                  <Table.Cell>{size_run_6}</Table.Cell>
                  <Table.Cell>{size_run_7}</Table.Cell>
                  <Table.Cell>{size_run_8}</Table.Cell>
                  <Table.Cell>{size_run_9}</Table.Cell>
                  <Table.Cell>{size_run_10}</Table.Cell>
                  <Table.Cell>{size_run_11}</Table.Cell>
                  <Table.Cell>{size_run_12}</Table.Cell>
                  <Table.Cell>{size_run_13}</Table.Cell>
                  <Table.Cell>{size_run_14}</Table.Cell>
                  <Table.Cell>{total_size_run}</Table.Cell>
                </Table.Row>
            
        )
    }
}

const toolTip = {
    fontWeight: 'bold',
    fontSize: '18px',
    backgroundColor: 'sandybrown',
    wordWrap: 'break-word',
    borderRadius: 0,
    padding: '2em',
}

TableCell.propTypes = {
    stock : PropTypes.object.isRequired
}

export default TableCell
