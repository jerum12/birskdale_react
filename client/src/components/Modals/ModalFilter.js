import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Modal.css';
import { Button, Header, Image, Modal, Icon, Form, Input, Segment,Label } from 'semantic-ui-react'

export class ModalFilter extends Component {

    constructor(props){
        super(props)

        this.state = {
            open : false,
            dimmer : true
        }

        this.showModal = this.showModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    showModal = (dimmer) => () => this.setState({ dimmer: dimmer, open: true })
    closeModal = ()  => this.setState({ open: false })
    

    render() {
        return (
            <div>
                <div id="filter-png" onClick={this.showModal('blurring')}></div>
                <Modal open={this.state.open} dimmer={this.state.dimmer} onClose={this.closeModal} size="small">
                <Modal.Header>
                    <Segment raised>
                    <Label as='a' color='blue' ribbon>
                        <Icon name='angle double right' size='large' />
                    </Label>
                    <p className='modal-p'><span className='modal-s'>Filter & Sort</span></p>
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
                        <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>

                </Modal>
            </div>
        )
    }
}

ModalFilter.propTypes = {};

ModalFilter.defaultProps = {};

export default ModalFilter
