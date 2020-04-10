import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'
import './Header.css';
import ModalHeader from '../Modals/ModalHeader'
import ModalLogin from '../Modals/ModalLogin'

class Header extends Component {

  constructor(props){
    super(props)
  
    // this.state = {
    //     open : false,
    //     dimmer: true
    // }
    // // this.openLoginModal = this.openLoginModal.bind(this);
    // this.showModal = this.showModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  //showModal = (dimmer) => () => this.setState({ dimmer, open: true })
  //closeModal = () => this.setState({ open: false })

  render() {
    
   

    return (
      <div className="app-header">
        <div className="header-logo">
        </div>
        <div className="header-center">
            <h1>BIRKSDALE STOCKS</h1>    
        </div>
        <div className="header-right">
            {/* <ModalHeader/> */}
            <ModalLogin about={this.props.about}/>
        </div>
        
      </div>
    )
  }
}




export default Header
