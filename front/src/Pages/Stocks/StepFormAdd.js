import React, { useState, Fragment, useEffect, useCallback} from "react"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import FirstStepAdd from "./FirstStepAdd"
import SecondStepAdd from "./SecondStepAdd"
import ConfirmAdd from "./ConfirmAdd"
import Success from "./Success"


// const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
// const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/)
const siRegex = RegExp(/^[a-z A-Z\d\-_\s]+$/)
const numberRegex = RegExp(/^-?\d*\.?\d*$/)


// Step titles
const labels = ["Stock Details", "Size Run", "Confirmation"]

const StepFormAdd = ({
    param,
    props
}) => {

  const [steps, setSteps] = useState(0)

  const [initalFields, setInitalFields] = useState({
    stock_no: "",
    gender: "",
    color: "",
    leather_type: "",
    classification_1: "",
    classification_2: "",
    logo: "",
    sub_logo: "",
    lining: "",
    stitch: "",
    special_instruction: "",
    size_run_3 : "",
    size_run_4 : "",
    size_run_5 : "",
    size_run_6 : "",
    size_run_7 : "",
    size_run_8 : "",
    size_run_9 : "",
    size_run_10 : "",
    size_run_11 : "",
    size_run_12 : "",
    size_run_13 : "",
    size_run_14 : ""
  })

  const [fields, setFields] = useState({
    stock_no: "",
    gender: "",
    color: "",
    leather_type: "",
    classification_1: "",
    classification_2: "",
    logo: "",
    sub_logo: "",
    lining: "",
    stitch: "",
    special_instruction: "",
    size_run_3 : 0,
    size_run_4 : 0,
    size_run_5 : 0,
    size_run_6 : 0,
    size_run_7 : 0,
    size_run_8 : 0,
    size_run_9 : 0,
    size_run_10 : 0,
    size_run_11 : 0,
    size_run_12 : 0,
    size_run_13 : 0,
    size_run_14 : 0
  })
  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...initalFields
  })

  const [isError, setIsError] = useState(false)

  // Proceed to next step
  const handleNext = () => setSteps(steps + 1)
  // Go back to prev step
  const handleBack = () => setSteps(steps - 1)

  // Handle fields change
  const handleChange = (input) => (event,value) => {

    ////console.log(value + 'value');
    // Set values to the fields

    if(input === "special_instruction"){
      setFields({
        ...fields,
        [input]: event.target.value
      })
    }else if(input.indexOf("size_run") > -1){
      setFields({
        ...fields,
        [input]: event
      })
    }else{
      setFields({
        ...fields,
        [input]: value
      })
    }

    ////console.log(fields)
    //for size run
    ////console.log(event)

    // Handle errors
    const formErrors = { ...filedError }
    const mandatory = value === null
    const mandatory2 = event === null
    //const mandatory2 = event.target.value.length === 0
    

    switch (input) {
      case "stock_no":
        formErrors.stock_no = mandatory
            ? "Mandatory"
            : ""
        break
        case "gender":
            formErrors.gender = mandatory
                ? "Mandatory"
                : ""
            break
        case "color":
            formErrors.color = mandatory
                ? "Mandatory"
                : ""
            break
        case "leather_type":
            formErrors.leather_type = mandatory
                ? "Mandatory"
                : ""
            break  
        case "classification_1":
            formErrors.classification_1 = mandatory
                ? "Mandatory"
                : ""
            break  
        case "classification_2":
            formErrors.classification_2 = mandatory
                ? "Mandatory"
                : ""
            break  
        case "logo":
            formErrors.logo = mandatory
                ? "Mandatory"
                : ""
            break   
        case "sub_logo":
            formErrors.sub_logo = mandatory
                ? "Mandatory"
                : ""
            break       
        case "lining":
            formErrors.lining = mandatory
                ? "Mandatory"
                : ""
            break       
        case "stitch":
            formErrors.stitch = mandatory
                ? "Mandatory"
                : ""
            break       
        case "special_instruction":
            formErrors.special_instruction = event.target.value.length > 0 && !siRegex.test(event.target.value)
                ? "Please enter a valid Special Instruction"
                : ""
            break 
        case "size_run_3":
          formErrors.size_run_3 = mandatory2
              ? "Mandatory"
              : ""
          break
          case "size_run_4":
              formErrors.size_run_4 = mandatory2
                  ? "Mandatory"
                  : ""
      
              break
          case "size_run_5":
              formErrors.size_run_5 = mandatory2
                  ? "Mandatory"
                  : ""
  
              break
          case "size_run_6":
              formErrors.size_run_6 = mandatory2
                  ? "Mandatory"
                  : ""

              break  
          case "size_run_7":
              formErrors.size_run_7 = mandatory2
                  ? "Mandatory"
                  : ""

              break  
          case "size_run_8":
              formErrors.size_run_8 = mandatory2
                  ? "Mandatory"
                  : ""

              break  
          case "size_run_9":
              formErrors.size_run_9 = mandatory2
                  ? "Mandatory"
                  : ""
            
              break   
          case "size_run_10":
              formErrors.size_run_10 = mandatory2
                  ? "Mandatory"
                  : ""

              break       
          case "size_run_11":
              formErrors.size_run_11 = mandatory2
                  ? "Mandatory"
                  : ""
        
              break       
          case "size_run_12":
              formErrors.size_run_12 = mandatory2
                  ? "Mandatory"
                  : ""
            
              break       
          case "size_run_13":
              formErrors.size_run_13 = mandatory2
                  ? "Mandatory"
                  : ""
        
              break 
          case "size_run_14":
              formErrors.size_run_14 = mandatory2
                  ? "Mandatory"
                  : ""
                
              break 
      default:
        break
    }

    // set error hook
    for(var i=0 ; i < Object.values(formErrors).length; i++){

        if(Object.values(formErrors)[i].length  > 0 ){
            setIsError(true)
            break;
        }else{
            setIsError(false)
        }
    }
    // Object.values(formErrors).every(error =>
    //   {
    //     //console.log(error  +  '-error here')
    //     if(error.length > 0 ){
    //         setIsError(true)
    //         return false;
    //      }else{
    //          setIsError(false)
    //      }
    //   }
    // )
    // set errors hook
    setFieldError({
      ...formErrors
    })
  }

  const handleSteps = step => {
    switch (step) {
      case 0:
        return (
          <FirstStepAdd
            handleNext={handleNext}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
            arrayParam={param}
          />
        )
      case 1:
        return (
          <SecondStepAdd
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        )
      case 2:
        return (
          <ConfirmAdd
            handleBack={handleBack}
            values={fields}
            props={props}
          />
        )
      default:
        break
    }
  }


  // Handle components
  return (
    <Fragment>
      {steps === labels.length ? (
        <Success />
      ) : (
        <Fragment>
          <Stepper
            activeStep={steps}
            style={{ paddingTop: 30, paddingBottom: 50 }}
            alternativeLabel
          >
            {labels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(steps)}
        </Fragment>
      )}
    </Fragment>
  )
}

export default StepFormAdd
