import React, {Fragment,useState, useContext} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import {GenericContext} from '../../context/GenericContext'
import { history } from '../../util/History';

 function TimeOutModal() {

    const genContext = useContext(GenericContext)
    const [redirect, setredirect] = useState(false)

    const ok = () => {
        sessionStorage.removeItem('jwtTokenKey');
        setredirect(true)
        genContext.dispatchName({type: 'LOGOUT_SUCCESS', payload: '' , login : false})
    }

    if(redirect){
        history.push('/monitorStocks')
    }
    return (
       <Fragment>
            <Modal
                open={true}
                closeOnEscape={false}
                closeOnDimmerClick={false}
                >
                <Modal.Header>Your Session is already expired</Modal.Header>
                <Modal.Content>
                    <p>Click to Login</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                    onClick={ok}
                    positive
                    labelPosition='right'
                    icon='checkmark'
                    content='Yes'
                    />
                </Modal.Actions>
                </Modal>

       </Fragment>
    )
}

export default TimeOutModal