import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import './TableResult.css';
import { Table, Button, Icon } from 'semantic-ui-react'

import TableCell from './TableCell'

function  TableResult(props)  {
  
  const sortTypes = {

    up: {
      class: 'sort-up',
      fn: (a, b) => new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime()
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
    },
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
  };

  return (
      <div className='table-result-data'>
        <Table sortable celled fixed singleLine color='blue'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={props.column === 'stock_no' ? props.direction : null}
              onClick={props.handleTableSort('stock_no')}
              >Stack Number</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'transaction_date' ? props.direction : null}
            onClick={props.handleTableSort('transaction_date')}
            >Transaction Date</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'stock_details' ? props.direction : null}
            onClick={props.handleTableSort('stock_details')}
            >Stock Details</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_3' ? props.direction : null}
            onClick={props.handleTableSort('size_run_3')}
            >Size Run 3</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_4' ? props.direction : null}
            onClick={props.handleTableSort('size_run_4')}
            >Size Run 4</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_5' ? props.direction : null}
            onClick={props.handleTableSort('size_run_5')}
            >Size Run 5</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_6' ? props.direction : null}
            onClick={props.handleTableSort('size_run_6')}
            >Size Run 6</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_7' ? props.direction : null}
            onClick={props.handleTableSort('size_run_7')}
            >Size Run 7</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_8' ? props.direction : null}
            onClick={props.handleTableSort('size_run_8')}
            >Size Run 8</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_9' ? props.direction : null}
            onClick={props.handleTableSort('size_run_9')}
            >Size Run 9</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_10' ? props.direction : null}
            onClick={props.handleTableSort('size_run_10')}
            >Size Run 10</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_11' ? props.direction : null}
            onClick={props.handleTableSort('size_run_11')}
            >Size Run 11</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_12' ? props.direction : null}
            onClick={props.handleTableSort('size_run_12')}
            >Size Run 12</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_13' ? props.direction : null}
            onClick={props.handleTableSort('size_run_13')}
            >Size Run 13</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'size_run_14' ? props.direction : null}
            onClick={props.handleTableSort('size_run_14')}
            >Size Run 14</Table.HeaderCell>
            <Table.HeaderCell
            sorted={props.column === 'total_size_run' ? props.direction : null}
            onClick={props.handleTableSort('total_size_run')}
            >Total Size Run</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

            {[...props.stocks].sort(sortTypes[props.sortBy].fn).map(stock => (
                  <TableCell key={stock._id} stock={stock}/>
                ))}

        </Table.Body>
            
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='15'>
            {props.stocks.length != 0 ?
                <p>Record Count : {props.stocks.length}</p>
               :
               <p className='no-record'>No Records Retrieve</p>
            }
            </Table.HeaderCell>
            <Table.HeaderCell style={cellStyle}>
              {props.stocks.length != 0 ?
              <span>Page {props.page} of {props.totalPages}</span> : ''  
              }  
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>

  );

}
const cellStyle = {
  borderLeft: 'none'
}

export default TableResult;
