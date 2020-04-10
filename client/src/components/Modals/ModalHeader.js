import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Modal.css';
import { Button, Popup, Modal, Icon, Form, Input, Segment,Label } from 'semantic-ui-react'

class ModalHeader extends Component {

  constructor(props){
    super(props)

    this.state = {
      openLogin : false,
      dimmerLogin: true,
      openInfo : false,
      dimmerInfo : true
    }

  // this.openLoginModal = this.openLoginModal.bind(this);
  this.showModalLogin = this.showModalLogin.bind(this);
  this.closeModalLogin = this.closeModalLogin.bind(this);

  this.showModalInfo = this.showModalInfo.bind(this);
  this.showModalInfo = this.showModalInfo.bind(this);
  }

  showModalLogin = (dimmer) => () => this.setState({ dimmerLogin: dimmer, openLogin: true })
  closeModalLogin = () => this.setState({ openLogin: false })

  showModalInfo = (dimmer) => () => this.setState({ dimmerInfo : dimmer, openInfo: true })
  closeModalInfo = () => this.setState({ openInfo: false })
  
  
  render() {

    return (
      <div>
        {/* <ModalLogin/>
        <ModaInfo/> */}
        <Popup
          trigger={  <div id="login-png" onClick={this.showModalLogin('blurring')}></div> }
          content= {`Login`}
          position='bottom center'
        />
       
        <Modal open={this.state.openLogin} dimmer={this.state.dimmerLogin} onClose={this.closeModalLogin} size='mini' >
        
        <Modal.Header>
          <Segment raised>
            <Label as='a' color='blue' ribbon>
              <Icon name='angle double right' size='large' />
            </Label>
            <p className='modal-p'><span className='modal-s'>Login</span></p>
          </Segment>
        </Modal.Header>
          <Modal.Content>
            <Modal.Description>
            <Form>
              <Form.Field>
                <label>Username</label>
                <Input
                  label={{ icon: 'users' }}
                  labelPosition='left corner'
                  placeholder='Username...'
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input
                  label={{ icon: 'key' }}
                  labelPosition='left corner'
                  placeholder='Password...'
                  type='password'
                />
              </Form.Field>
              
            </Form>     
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
              <Button onClick={this.closeModalLogin}>Cancel</Button>
              <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content='Submit'
              />
            </Modal.Actions>
        </Modal>

        <Popup
          trigger={   <div id="info-png" onClick={this.showModalInfo('blurring')}></div> }
          content= {`Information`}
          position='bottom center'
        />
       
       
        <Modal open={this.state.openInfo} dimmer={this.state.dimmerInfo} onClose={this.closeModalInfo} size="small">
        <Modal.Header>
            <Segment raised>
              <Label as='a' color='blue' ribbon>
                <Icon name='angle double right' size='large' />
              </Label>
              <p className='modal-p'><span className='modal-s'>Information</span></p>
            </Segment>
          </Modal.Header>
          <Modal.Content image>
            <div className='image'>
              <Icon name='info circle' />
            </div>
            <Modal.Description>
              <h2>This is an Information</h2>
              <p>Expected value of sample information. In decision theory, the expected value of sample information (EVSI) is the expected increase in utility that a decision-maker could obtain from gaining access to a sample of additional observations before making a decision.</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
                <Button onClick={this.closeModalInfo}>Close</Button>
          </Modal.Actions>

        </Modal>
      </div>
    )
  }
}

// const styleSpan =  {
//   fontSize: '20px'
// }

// const styleP =  {
//   textAlign: 'center',
//   marginTop: '-22px'
// }

// const ModalLogin = () => (
  
// )

// const ModaInfo = () => (
  
// )

ModalHeader.propTypes = {};

ModalHeader.defaultProps = {};

export default ModalHeader
