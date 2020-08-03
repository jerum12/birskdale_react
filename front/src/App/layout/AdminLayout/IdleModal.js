import React, {Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';

export const IdleTimeOutModal = ({showModal, handleClose, handleLogout, remainingTime}) => {

    return (
        <Fragment>
            {showModal ? 
                 <SweetAlert
                 warning
                 showCancel
                 confirmBtnText="Logout"
                 confirmBtnBsStyle="primary"
                 cancelBtnBsStyle="secondary"
                 title="You have been idle for some time!"
                 onCancel ={handleClose}
                 onConfirm ={handleLogout}
                 focusCancelBtn
                 />
                 
                 
                :
                ''
            }
        </Fragment>
    )

    // return (
    //     <Modal show={showModal} onHide={handleClose}>
    //         <Modal.Header closeButton>
    //         <Modal.Title>You Have Been Idle!</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>You Will Get Timed Out. You want to stay?</Modal.Body>
    //         <Modal.Footer>
    //         <Button variant="danger" onClick={handleLogout}>
    //             Logout
    //         </Button>
    //         <Button variant="primary" onClick={handleClose}>
    //             Stay
    //         </Button>
    //         </Modal.Footer>
    //     </Modal>

       
    // )
}