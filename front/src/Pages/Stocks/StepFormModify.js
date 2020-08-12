import React, { useState, Fragment, useEffect, useCallback} from "react"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import FirstStepModify from "./FirstStepModify"
import ConfirmModify from "./ConfirmModify"
import Success from "./Success"


// const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
// const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/)
const siRegex = RegExp(/^[a-z A-Z\d\-_\s]+$/)
const numberRegex = RegExp(/^-?\d*\.?\d*$/)


// Step titles
const labels = ["Stock Details","Confirmation"]

const StepFormModify = ({
    param,
    props,
    details
}) => {

  ////console.log(details + '--------------------------details')

  const [steps, setSteps] = useState(0)

  const [fields, setFields] = useState({
    stock_no: details.stock_no,
    gender: details.gender,
    color: details.color,
    leather_type: details.leather_type,
    classification_1: details.classification_1,
    classification_2: details.classification_2,
    logo: details.logo,
    sub_logo: details.sub_logo,
    lining: details.lining,
    stitch: details.stitch,
    special_instruction: details.special_instruction
  })

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
    special_instruction: ""
  })
  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...initalFields
  })

  ////console.log(filedError)

  const [isError, setIsError] = useState(false)

  // Proceed to next step
  const handleNext = () => setSteps(steps + 1)
  // Go back to prev step
  const handleBack = () => setSteps(steps - 1)

  
    // Proceed to next step
    const handleNextModify = (event) => {
      const noChange = fields.stock_no.description === details.stock_no.description &&
                        fields.color.description === details.color.description &&
                        fields.gender.description === details.gender.description &&
                        fields.leather_type.description === details.leather_type.description &&
                        fields.classification_1.description === details.classification_1.description &&
                        fields.classification_2.description === details.classification_2.description &&
                        fields.logo.description === details.logo.description &&
                        fields.sub_logo.description === details.sub_logo.description &&
                        fields.stitch.description === details.stitch.description &&
                        fields.lining.description === details.lining.description &&
                        fields.special_instruction === details.special_instruction
      //console.log(noChange + '------------------')
      if(noChange){
        setIsError(true)
        event.preventDefault();
      }else{
        setIsError(false)
        setSteps(steps + 1)
      }
    }

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

    ////console.log(fields + "-------------------------------fields")
    //for size run
    ////console.log(event)

    // Handle errors
    const formErrors = { ...filedError }
    const mandatory = value === null
    //const mandatory2 = event.target.value.length === 0
    
    ////console.log(formErrors)
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
        
      default:
        break
    }
    ////console.log(Object.values(formErrors))

    // set error hook
    for(var i=0 ; i < Object.values(formErrors).length; i++){

        if(Object.values(formErrors)[i].length  > 0 ){
            setIsError(true)
            break;
        }else{
            setIsError(false)
        }
    }

    // set errors hook
    setFieldError({
      ...formErrors
    })
  }

  const handleSteps = step => {
    switch (step) {
      case 0:
        return (
          <FirstStepModify
            handleNext={handleNext}
            handleChange={handleChange}
            handleNextModify={handleNextModify}
            values={fields}
            isError={isError}
            filedError={filedError}
            arrayParam={param}
            details={details}
            props={props}
          />
        )
      case 1:
        return (
          <ConfirmModify
            handleBack={handleBack}
            details={details}
            values={fields}
            props={props}
          />
        )
      // case 2:
      //   return (
      //     <Confirm
      //       handleBack={handleBack}
      //       values={fields}
      //       props={props}
      //     />
      //   )
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

export default StepFormModify
