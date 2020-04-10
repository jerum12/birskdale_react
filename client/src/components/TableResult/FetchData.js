import React, { Component }  from 'react'
import axios from 'axios';
import { Icon, Pagination,Loader } from 'semantic-ui-react'
import TableResult from './TableResult'
import SearchBody from './../SearchBody/SearchBody'
import _ from 'lodash'

class FetchData extends Component {

    constructor(props) {
        super(props);

        this.state = {
          stocks : [],
          page: 1,
          itemsPerPage: 3,
          filter: '',
          dataFilter : [],
          sortBy : 'default',
          column: null,
          direction: null,
          loading : true

        }
    
      }
    
      //get stocks onload
     componentDidMount() {
        this.getStocks();
     }

     //get Stocks from api
     getStocks = () => {
        axios
            .get("http://localhost:5000/api/stocks/getAllData")
            .then(data => {
                this.setState({ stocks: data.data.data.docs, loading : false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading : false })
                return null;
            });
     };

     //handle table sorting
     handleTableSort = (clickedColumn) => () => {
        const { column, stocks, direction } = this.state

            if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                stocks: _.sortBy(stocks, [clickedColumn]),
                direction: 'ascending',
            })

            return
            }

            this.setState({
                stocks: stocks.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending',
            })
      }

      //handle serach input
     handleChangeSearch = event => {
        this.setState({ filter: event.target.value });
      };
    
      //set page number click
      setPageNum = (event, { activePage }) => {
        this.setState({ page: activePage });
      };
    
      //get Filter data input
      getDataFilter = (data) => {
        //console.log(data)
        this.setState({
          dataFilter : data
        })
      }
    
      // for sort by transaction date
      handleChangeSort = column  => {
        //console.log(column)
             let nextSort;
    
             if (column === 'lto') nextSort = 'down';
             else if (column === 'otl') nextSort = 'up';
             else if (column === 'default') nextSort = 'down';
    
             this.setState({
                sortBy: nextSort
             });
      }

    
    render(){
        
        
    const { page,itemsPerPage,filter,dataFilter,column,direction,stocks,loading } = this.state;

    

    // FOR PAGING 
    const totalPages = stocks.length / itemsPerPage;
    let sliceStocks = stocks.slice(
      (Math.ceil(page) - 1) * itemsPerPage,
      (Math.ceil(page) - 1) * itemsPerPage + itemsPerPage
    );    

    // FOR SEARCH
    const lowercasedFilter = filter.toLowerCase();
    sliceStocks = sliceStocks.filter(item => {
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



        if (loading) {
            return (
                    <h1>
                        <Loader size='huge' active inline='centered' style={loaderStyle}>Loading Data</Loader>
                    </h1>
             )
          }
    
        return (
            <div className="content-body">

                <div className="search-group">
                    <SearchBody filter={filter} handleChangeSearch={this.handleChangeSearch} sendDataFilter={this.getDataFilter}  handleChangeSort={this.handleChangeSort} currentSort={this.currentSort}/>
                </div>

                { sliceStocks.length != 0 && 
                    <div className="paging-group">
        
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
                <div className="table-group">
                    <TableResult  page={Math.ceil(page)} totalPages={Math.ceil(totalPages)} stocks={sliceStocks} sortBy={this.state.sortBy} column={column} direction={direction} handleTableSort={this.handleTableSort}/>
                </div>
            </div>
        )
    }
      
      
}


const loaderStyle = {
    top: '150px'
}


const pagingStyle = {
    float : 'right'
  }
  
  const inputStyle = {
    width: '95%',
  }
  
  const dataFilterOrig = ['stock_no','stock_details','size_run_3','size_run_4','size_run_5','size_run_6',
                          'size_run_7','size_run_8','size_run_9','size_run_10','size_run_11','size_run_12','size_run_13','size_run_14']

  

export default FetchData