import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ChangePasswordForm from './ChangePasswordForm'

export const ChangePasswordModal = ({showModal, handleClose, props}) => {

    return (
        <Modal show={showModal} onHide={handleClose}
            size="lg"            
        >
            <Modal.Header closeButton>
            <Modal.Title>Change Password Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>         
                <ChangePasswordForm props={props} handleClose={handleClose}/>
            </Modal.Body>

        </Modal>

       
     )
}