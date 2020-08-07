import React, {Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';

export const JWTExpiredModal = ({showModal, handleLogout}) => {

    return (
        <Fragment>
            {showModal ? 
                 <SweetAlert
                 warning
                 confirmBtnText="Logout"
                 confirmBtnBsStyle="primary"
                 title={<span><div>Your session has expired! </div>Please login again.</span>}
                 onConfirm = {handleLogout}
                 onCancel = {handleLogout}
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