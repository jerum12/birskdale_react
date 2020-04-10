import React, { useState, useEffect }  from 'react'
import './SearchBody.css';
import { Dropdown,Input,Form,Popup,Button,Divider,Transition } from 'semantic-ui-react'
import {Animated} from "react-animated-css";
import ModalFilter from './../Modals/ModalFilter'

 function SearchBody(props) {

  const sortOptions = [
    { "key": "Default", "text": "Default","value": "default"},
    { "key": "Oldest to Lates","text": "Oldest to Latest Transaction","value": "otl"},
    { "key": "Latest to Oldest", "text": "Latest to Oldest Transaction","value": "lto"}
  ];

  const filterOptions = [
    { "key": "Stock Number", "text": "Stock Number","value": "stock_no"},
    { "key": "Stock Details","text": "Stock Details","value": "stock_details"},
    { "key": "Size Run 3","text": "Size Run 3","value": "size_run_3"},
    { "key": "Size Run 4","text": "Size Run 4","value": "size_run_4"},
    { "key": "Size Run 5","text": "Size Run 5","value": "size_run_5"},
    { "key": "Size Run 6","text": "Size Run 6","value": "size_run_6"},
    { "key": "Size Run 7","text": "Size Run 7","value": "size_run_7"},
    { "key": "Size Run 8","text": "Size Run 8","value": "size_run_8"},
    { "key": "Size Run 9","text": "Size Run 9","value": "size_run_9"},
    { "key": "Size Run 10","text": "Size Run 10","value": "size_run_10"},
    { "key": "Size Run 11","text": "Size Run 11","value": "size_run_11"},
    { "key": "Size Run 12","text": "Size Run 12","value": "size_run_12"},
    { "key": "Size Run 13","text": "Size Run 13","value": "size_run_13"},
    { "key": "Size Run 14","text": "Size Run 14","value": "size_run_14"},
  ];
  const [selectValue, setSelectValue] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);

  const handleChangeFilter = (e, { searchQuery, value }) => {
     setSelectValue(value)
     setSearchQuery(searchQuery)
     props.sendDataFilter(value); 
   }

   const handleSearchChangeFilter  = (e, { searchQuery }) => {
    setSearchQuery(searchQuery)
   }

    const handleChangeSortBy = ((e, {value}) => {
      //console.log(value)
      setSortValue(value)
      props.handleChangeSort(value);
    })

    const filterClick = () => {
      setShowFilter(!showFilter)            

      if(!showFilter){
        setSelectValue([])
        setSearchQuery('')
      }  
    }
 
    const sortByClick = () => {
      setShowSortBy(!showSortBy)

      if(!showSortBy){
        setSortValue('')
      }  
    }


  return (
        <div className="search-div">
                <Form>
                  <Form.Field>
                    
           
                      <div className='form-search-div' id='search-input-div' style={searchInputStyle}>
                        <Input
                        label={{ icon: 'search' }}
                        labelPosition='right corner'
                        placeholder='Search...'
                        size='large'
                        name="filter"
                        value={props.filter}
                        onChange={props.handleChangeSearch} 
                        />
                      </div>


                      
                

                    <div className='form-search-additional' style={additionalInputStyle}>

              
                       <Popup
                          trigger={<div className='filter-sort' id="filter-logo" onClick={filterClick}></div>}
                          content= {`Filter Input`}
                          position='top center'
                        />
                  

                        <Popup
                          trigger={ <div className='filter-sort' id="sort-logo" onClick={sortByClick}></div>}
                          content= {`Sort By`}
                          position='top center'
                        />
                     

                    </div>

                      { showFilter ? 
                            // <Animated animationIn="zoomIn" animationOut="rotateOutDownRight" isVisible={showFilter}>
                            <div className='form-search-div' id='filter-div'>
                                <Dropdown
                                  fluid
                                  selection
                                  multiple={true}
                                  search={true}
                                  value={selectValue}
                                  options={filterOptions}
                                  placeholder='Add Filter'
                                  onChange={handleChangeFilter}
                                  onSearchChange={handleSearchChangeFilter}
                                  searchQuery={searchQuery}
                                  selection
                                />
                              </div> 
                          // </Animated>
                          : ''
                      }

                      { showSortBy ? 
                            //  <Animated animationIn="zoomIn" animationOut="" isVisible={showSortBy}>
                             <div className='form-search-div' id='sort-div'>
                              <Dropdown
                                placeholder='Sort By'
                                fluid
                                selection
                                options={sortOptions}
                                value={sortValue}
                                onChange={handleChangeSortBy}
                              />
                            </div>
                          // </Animated>
                          : ''
                      } 
                       

                       
                    
                    
                  </Form.Field>                    
                </Form>   
                
            </div>
  )
}

const searchInputStyle = {
  display : 'inline-block',
  width : '55%'
}

const additionalInputStyle = {
  position : 'relative',
  top: '10px'
}

export default SearchBody