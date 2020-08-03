import React, {Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import AddUserForm from './AddUserForm'
import Button from 'react-bootstrap/Button'

export const AddUserModal = ({showModal, handleClose, props}) => {

    return (
        <Modal show={showModal} onHide={handleClose}
            size="lg"            
      
            //backdrop="static"
            //keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Add User Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>         
                <AddUserForm props={props}/>
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Logout
            </Button>
            </Modal.Footer> */}
        </Modal>

       
     )
}