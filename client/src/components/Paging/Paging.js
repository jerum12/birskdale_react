import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Paging.css';
import { Pagination,Icon } from 'semantic-ui-react'
import TableResult from './../TableResult/TableResult'
import TableSort from './../TableResult/TableSort'
import SearchBody from './../SearchBody/SearchBody'
import _ from 'lodash'

class Paging extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemsPerPage: 3,
      filter: '',
      dataFilter : [],
      currentSort : 'default',
      column: null,
      data: props.stocks,
      direction: null,
      firstClick : '',
      isSort: false
    }

    this.stocks = props.stocks
  }

  handleSortColumn = (clickedColumn) => () => {
    const { column, data, direction,firstClick } = this.state

    this.setState({
      isSort : true
    })

    if (column !== clickedColumn) {
     
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
        firstClick: 'firstClick'
      })

      return
    }


    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
      firstClick: 'remainingClick'
    })

    //let stocks = data;
    //console.log(data)

    //this.props.updateStockValue(data);

    
  }

  handleChangeSearch = event => {
    this.setState({ filter: event.target.value });
  };

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

  getData = (data) => {
    //console.log(data)
    this.setState({
      dataFilter : data
    })
  }

  handleChangeSort = column  => {
    //console.log(column)
		 let nextSort;

		 if (column === 'lto') nextSort = 'down';
		 else if (column === 'otl') nextSort = 'up';
		 else if (column === 'default') nextSort = 'down';

		 this.setState({
		 	currentSort: nextSort
		 });
  }

   
  render() {
    const { page,itemsPerPage,filter,dataFilter,data,column,direction,firstClick,clickedColumn } = this.state;

    // FOR PAGING 
    const totalPages = this.props.stocks.length / itemsPerPage;
    let stocks = this.props.stocks.slice(
      (Math.ceil(page) - 1) * itemsPerPage,
      (Math.ceil(page) - 1) * itemsPerPage + itemsPerPage
    );    
      

    // FOR SEARCH
    const lowercasedFilter = filter.toLowerCase();
    stocks = stocks.filter(item => {
    let forId = ['_id']
      if(dataFilter.length > 0){
          return Object.keys(dataFilter).some(i =>
              Object.keys(item).some(key =>
              item[dataFilter[i]].toString().toLowerCase().includes(lowercasedFilter)
            )
        );
      }else{
          
          return Object.keys(dataFilterOrig).some(i =>
              Object.keys(item).some(key =>
              item[dataFilterOrig[i]].toString().toLowerCase().includes(lowercasedFilter)
            )
        );
      }

    });

    return (
      <div>
          <div className="seacrh-group">

            <SearchBody filter={filter} handleChangeSearch={this.handleChangeSearch} sendData={this.getData}  handleChangeSort={this.handleChangeSort} currentSort={this.currentSort}/>

          { stocks.length != 0 &&
             
                <div className="search-paging">
                  <span id='page-of'>Page {Math.ceil(page)} of {Math.ceil(totalPages)}</span>
                  <Pagination
                  style={pagingStyle}
                  prevItem={{ content: <Icon name='angle left' className='disabled-btn'/>, icon: true, disabled: Math.ceil(page) === 1 ? true : false }}
                  nextItem={{ content: <Icon name='angle right' />, icon: true, disabled: Math.ceil(page) === Math.ceil(totalPages) ? true : false  }}
                  ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                  firstItem={null}
                  lastItem={null}
                  activePage={Math.ceil(page)}
                  totalPages={totalPages}
                  pointing
                  secondary
                  boundaryRange= {0}
                  siblingRange= {1}
                  onPageChange={this.setPageNum}
                  />
                </div>            
          }
          </div>

          {/* <TableSort stocks={stocks} handleSort={this.handleSort} column={column} direction={direction}/> */}
          <TableResult isSort={this.state.isSort} firstClick={this.state.firstClick} stocks={stocks} handleSort={this.handleSort} currentSort={this.state.currentSort} column={this.state.column} direction={this.state.direction} handleSortColumn={this.handleSortColumn}/>
      </div>
    )
  }
}

const pagingStyle = {
  float : 'right'
}

const inputStyle = {
  width: '95%',
}

const dataFilterOrig = ['stock_no','stock_details','size_run_3','size_run_4','size_run_5','size_run_6',
                        'size_run_7','size_run_8','size_run_9','size_run_10','size_run_11','size_run_12','size_run_13','size_run_14']

Paging.propTypes = {};

Paging.defaultProps = {};

export default Paging;
