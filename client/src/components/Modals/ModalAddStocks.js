import React,{ useState,useContext,useEffect } from "react";
import './Modal.css';
import { Button, Popup, Modal, Icon, Message, Segment,Label, Form, Grid,TextArea } from 'semantic-ui-react'

import { useForm,Controller  } from 'react-hook-form';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {GenericContext} from '../../context/GenericContext'
import ReactSelect from "react-select";
import TimeOutModal from './TimeOutModal'

function ModalAddStocks(props){

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }
      ]

    const [openForm, setOpenForm] = useState(false);
    const [dimmerForm, setDimmerForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    const [showTimeout, setshowTimeout] = useState(false)
 
    const [stockArray, setstockArray] = useState([])
    const [class1Array, setClass1Array] = useState([])
    const [class2Array, setClass2Array] = useState([])
    const [colorArray, setColorArray] = useState([])
    const [genderArray, setGenderArray] = useState([])
    const [leatherArray, setLeatherArray] = useState([])
    const [liningArray, setLiningArray] = useState([])
    const [logoArray, setLogoArray] = useState([])
    const [stitchArray, setStitchArray] = useState([])
    const [subLogoArray, setSubLogoArray] = useState([])

    const showModal = (dimmer) => () => {
        setDimmerForm(dimmer)
        setOpenForm(true)
        var a = this;
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/parameter/data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
            .then(response => {
                
                console.log('data----------')
                console.log(response.data)

                if(response.data.code === '99'){
                    setshowTimeout(true)
                }else{
                    inputOptions(response)
                }
                
             
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    const inputOptions = (response) => {
        setstockArray(response.data.data.stock.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setClass1Array(response.data.data.class1.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setClass2Array(response.data.data.class2.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setColorArray(response.data.data.color.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setGenderArray(response.data.data.gender.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setLeatherArray(response.data.data.leather.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setLiningArray(response.data.data.lining.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setStitchArray(response.data.data.stitch.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setLogoArray(response.data.data.logo.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setSubLogoArray(response.data.data.sublogo.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))


    }

    const closeModal = () => {
        setOpenForm(false)
    }

    const onSubmit = data => {

        alert(JSON.stringify(data, null));

    };

    const { register, handleSubmit, setValue, errors, control } = useForm();

     const errorClass = (error) => {
        //console.log(error)
        return(!error ? '' : 'has-error');
      }

      if(showTimeout){
          return <TimeOutModal/>
      }else{
     
        return (
            <div>
            
                    <Popup
                    trigger={   <Button circular color="blue" content='Add Stocks' icon='add circle' labelPosition='left' onClick={showModal('blurring')}></Button>}
                    content= {`Add Stocks`}
                    position='bottom center'
                    />
                
                    <Modal open={openForm} dimmer={dimmerForm} onClose={closeModal} >
                   
                        <Modal.Header>
                        <Segment raised>
                            <Label as='a' color='blue' ribbon>
                            <Icon name='angle double right' size='large' />
                            </Label>
                            <p className='modal-p'><span className='modal-s'>Add Stocks</span></p>
                        </Segment>
                        </Modal.Header>

                        <Form className='form-group' onSubmit={handleSubmit(onSubmit)}>

                            <Modal.Content>
                                <Modal.Description>


                                    { errorMessage.length > 0 ? 
                                        <Message negative>
                                            <Message.Header>{errorMessage}</Message.Header>
                                        </Message>
                                    :
                                        ''   
                                    }
                                       <Grid divided='vertically'>
                                            <Grid.Row columns={4}>
                                                <Grid.Column>
                                                    <label>Stock Number</label>
                                                    <Controller
                                                    as={<ReactSelect isClearable/>}
                                                    placeholder='Select Stock'
                                                    theme={theme => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                          ...theme.colors,
                                                          primary25: 'gray',
                                                          primary: 'black',
                                                        },
                                                      })}
                                                    options={stockArray}
                                                    name="stock_no"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.stock_no && <div className="ui red pointing basic label">{errors.stock_no.message}</div>}        
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <label>Gender</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Gender'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={genderArray}
                                                    name="gender"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.gender && <div className="ui red pointing basic label">{errors.gender.message}</div>}
                                                </Grid.Column>

                                                <Grid.Column>
                                                    <label>Color</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Color'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={colorArray}
                                                    name="color"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.color && <div className="ui red pointing basic label">{errors.color.message}</div>}        
                                                </Grid.Column>

                                                <Grid.Column>
                                                    <label>Leather Type</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Leather Type'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={leatherArray}
                                                    name="leather_type"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.leather_type && <div className="ui red pointing basic label">{errors.leather_type.message}</div>}
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row columns={3}>
                                                <Grid.Column>
                                                    <label>Classification 1</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Classification 1'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={class1Array}
                                                    name="classficcation_1"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.classficcation_1 && <div className="ui red pointing basic label">{errors.classficcation_1.message}</div>}        
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <label>Classification 2</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Classification 2'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={class2Array}
                                                    name="classficcation_2"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.classficcation_2 && <div className="ui red pointing basic label">{errors.classficcation_2.message}</div>}
                                                </Grid.Column>

                                                <Grid.Column>
                                                    <label>Lining</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Lining'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={liningArray}
                                                    name="lining"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.lining && <div className="ui red pointing basic label">{errors.lining.message}</div>}
                                                </Grid.Column>
                                            </Grid.Row>


                                            <Grid.Row columns={3}>
                                                <Grid.Column>
                                                    <label>Stitch</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Stitch'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={stitchArray}
                                                    name="stitch"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.stitch && <div className="ui red pointing basic label">{errors.stitch.message}</div>}        
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <label>Logo</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Logo'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={logoArray}
                                                    name="logo"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    />
                                                    {errors.logo && <div className="ui red pointing basic label">{errors.logo.message}</div>}
                                                </Grid.Column>

                                                <Grid.Column>
                                                    <label>Sub Logo</label>
                                                    <Controller
                                                     as={<ReactSelect isClearable/>}
                                                     placeholder='Select Sub Logo'
                                                     theme={theme => ({
                                                         ...theme,
                                                         borderRadius: 0,
                                                         colors: {
                                                           ...theme.colors,
                                                           primary25: 'gray',
                                                           primary: 'black',
                                                         },
                                                       })}
                                                    options={subLogoArray}
                                                    name="sub_logo"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    className={`${errors.sub_logo  && errorClass('hasError')}`}
                                                    />
                                                    {errors.sub_logo && <div className="ui red pointing basic label">{errors.sub_logo.message}</div>}
                                                </Grid.Column>
                                            </Grid.Row>


                                            <Grid.Row>
                                                <Grid.Column>
                                                    <label>Special Instruction</label>
                                                    <Controller
                                                    as={ <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />}
                                                    name="special_instruction"
                                                    control={control}
                                                    rules={{ required: "This is required" }}
                                                    className={`${errors.special_instruction  && errorClass('hasError')}`}
                                                    />
                                                    {errors.special_instruction && <div className="ui red pointing basic label">{errors.special_instruction.message}</div>}
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>                   
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions style={formAction}>
                                <Button
                                    positive
                                    icon='checkmark'
                                    labelPosition='right'
                                    content='Submit'
                                />
                                <Button onClick={closeModal} style={{float: 'left'}}>Cancel</Button>
                                
                             
                                
                            </Modal.Actions>
                        </Form>
                    </Modal>
          </div>
        );
    }
};



const formAction = {
    height : '50px',
    float: 'right'
}

export default ModalAddStocks