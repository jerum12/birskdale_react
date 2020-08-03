import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import { Table,Popup } from 'semantic-ui-react'
import Moment from 'moment'
import {GenericContext} from '../../context/GenericContext'
import Edit_Details_logo from '../../assets/images/edit_details.gif'
import Edit_Size_logo from '../../assets/images/edit_size.png'
import Delete_logo from '../../assets/images/delete.png'
import EditDetailsDrawer from '../Drawer/EditDetailsDrawer'
import axios from 'axios';

class TableCell extends Component {

    state = { 
                visible: false, 
                stock : '{}',
                loading : false,
            };

    showDrawer = (idClick) => {

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/stocks/data/${idClick}`,
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
            .then(res => {
                this.setState({ stock: res.data.data, loading : false, visible: true })
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading : false, visible: false })
            });

    };

    onClose = () => {
        this.setState({
        visible: false,
        id : ''
        });
    };

    static contextType = GenericContext;  

    render() {
        console.log('tableCell---------')
        const { _id, stock_no, transaction_date, stock_details,size_run_3,size_run_4,size_run_5,size_run_6,size_run_7,size_run_8,size_run_9,size_run_10,
            size_run_11,size_run_12,size_run_13,size_run_14,total_size_run } = this.props.stock;
            
        return (
                <Fragment>
                    <Table.Row>
                    <Table.Cell>{stock_no.description}</Table.Cell>
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
                    {
                    this.context.stateName.login ?
                        <Table.Cell>
                            
                            <img src={Edit_Details_logo} style={{width:'20px',height : '20px' , cursor : 'pointer'}} onClick={() => {this.showDrawer(`${_id}`)}} key={`a-${_id}`}/>
                            <img src={Edit_Size_logo} style={{width:'20px',height : '20px' , cursor : 'pointer'}}/>
                            <img src={Delete_logo} style={{width:'20px',height : '20px' , cursor : 'pointer'}}/>
                        </Table.Cell>
                    : null  
                    }
                    </Table.Row>

                    <EditDetailsDrawer visible={this.state.visible} onClose={this.onClose} stock={this.state.stock}/>
                </Fragment>
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
