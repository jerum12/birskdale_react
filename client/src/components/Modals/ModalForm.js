import React,{ useState } from "react";
import { useInput } from './../../hooks/UseInput';
import './Modal.css';
import { Button, Popup, Modal, Icon, Form, Input, Segment,Label } from 'semantic-ui-react'
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
  ];

const ModalForm = () => {

    //const {register, handleSubmit, errors} = useForm();
    const { handleSubmit, register, setValue, reset, errors } = useForm();
    
    const onSubmit = data => {
        console.log(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <RHFInput
                as={
                    <Form.Field>
                            <label>Username</label>
                            <Input
                            label={{ icon: 'users' }}
                            labelPosition='left corner'
                            placeholder='Username...'
                            />
                            
                        </Form.Field>
                }
                rules={{ required : "PASSWORD IS REQUIRED", minLength : {value : 3, message : "Min password is 3"} }}
                name="reactSelect"
                register={register}
                setValue={setValue}
                aria-invalid={errors.user_name ? 'true' : 'false'}
            />
              {errors.reactSelect && errors.reactSelect.message}


              <label>Name:</label>
                <input 
                ref={register}
                placeholder= "testing"
                name="lastname"
                type="text"
                ref={register({ required: true })}
                aria-invalid={errors.lastname ? 'true' : 'false'}
                 />
                   {errors.lastname && 'Last name is required.'}


            <button type="button">Reset Form</button>
            <button>submit</button>
            </Form>
        // <Form 
        //     onSubmit={handleSubmit(onSubmit)}
        // >
            // <label>Name:</label>
            // <input 
            //     ref={register}
            //     placeholder= "testing"
            //     name="username"
            //     type="text"
            // />

                        // <Form.Field>
                        //     <label>Username</label>
                        //     <Input
                        //     label={{ icon: 'users' }}
                        //     labelPosition='left corner'
                        //     placeholder='Username...'
                        //     ref={register({ required: true })}
                        //     name="user_name"
                        //     />
                        //     {errors.lastname && 'Last name is required.'}
                        // </Form.Field>
        //                 <Form.Field>
        //                     <label>Password</label>
        //                     <Input
        //                     label={{ icon: 'key' }}
        //                     labelPosition='left corner'
        //                     ref={register({required : "PASSWORD IS REQUIRED", minLength : {value : 3, message : "Min password is 3"}})}
        //                     placeholder= "testing2"
        //                     name="password"
        //                     type="password"
        //                     />
        //                         {errors.password && <p>{errors.password.message}</p>}
        //                 </Form.Field>

                        
        //     {/* <label>Handle:</label>
        //     <input 
        //         ref={register({required : "PASSWORD IS REQUIRED", minLength : {value : 3, message : "Min password is 3"}})}
        //         placeholder= "testing2"
        //         name="password"
        //         type="password"
        //     />  
        //     {errors.password && <p>{errors.password.message}</p>} */}
        //     <input type='submit'/>

        // </Form>
    );
}

export default ModalForm