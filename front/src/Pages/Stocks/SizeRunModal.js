import React, {Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';
import SizeRunForm from './SizeRunForm'

export const SizeRunModal = ({showModal, handleClose, props, data}) => {

    ////console.log(data)
    return (
        <Modal show={showModal} onHide={handleClose}
            size="lg"            
            className='modalSizeRun'
            //backdrop="static"
            //keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Size Run</Modal.Title>
            </Modal.Header>
            <Modal.Body>         
                <SizeRunForm data={data} props={props} handleClose={handleClose}/>
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Logout
            </Button>
            </Modal.Footer> */}
        </Modal>

       
     )
}