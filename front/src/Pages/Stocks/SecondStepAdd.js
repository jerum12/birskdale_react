import React, { Fragment, useState } from "react"
import Grid from "@material-ui/core/Grid"
//import TextField from "@material-ui/core/TextField"
//import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
//import InputLabel from "@material-ui/core/InputLabel"
import FormLabel from '@material-ui/core/FormLabel';
import './Stocks.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

// Destructure props
const SecondStepAdd = ({
  handleNext,
  handleBack,
  handleChange,
  values: { 
            size_run_3,
            size_run_4,
            size_run_5,
            size_run_6,
            size_run_7,
            size_run_8,
            size_run_9,
            size_run_10,
            size_run_11,
            size_run_12,
            size_run_13,
            size_run_14
        },
  filedError,
  isError
}) => {

  // const [errorText, seterrorText] = useState();
  // const [value, setvalue] = useState();
 
  // size_run_3 = 0;
  // size_run_4 = 0;
  // size_run_5 = 0;
  // size_run_6 = 0;
  // size_run_7 = 0;
  // size_run_8 = 0;
  // size_run_9 = 0;
  // size_run_10 = 0;
  // size_run_11 = 0;
  // size_run_12 = 0;
  // size_run_13 = 0;
  // size_run_14 = 0;
  

  const upHandler = (<div className="increaseBtn"><AddIcon/></div>);
  const downHandler = (<div className="decreaseBtn"><RemoveIcon/></div>);

  // Check if all values are not empty
  //const isEmpty = date.length > 0 && city.length > 0
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 3</FormLabel>
               <InputNumber 
                defaultValue={size_run_3} onChange={handleChange("size_run_3")}
                min={ 0 } name="size_run_3"
                placeholder = "Size Run 3"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_3 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_3 !== ""  && <p className="p-error">{filedError.size_run_3 }</p>}
              </FormControl>
          </Grid>
        
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 4</FormLabel>
               <InputNumber 
                defaultValue={size_run_4} onChange={handleChange("size_run_4")}
                min={ 0 } name="size_run_4"
                placeholder = "Size Run 4"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_4 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_4 !== ""  && <p className="p-error">{filedError.size_run_4 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 5</FormLabel>
               <InputNumber 
                defaultValue={size_run_5} onChange={handleChange("size_run_5")}
                min={ 0 } name="size_run_5"
                placeholder = "Size Run 5"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_5 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_5 !== ""  && <p className="p-error">{filedError.size_run_5 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 6</FormLabel>
               <InputNumber 
                defaultValue={size_run_6} onChange={handleChange("size_run_6")}
                min={ 0 } name="size_run_6"
                placeholder = "Size Run 6"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_6 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_6 !== ""  && <p className="p-error">{filedError.size_run_6 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 7</FormLabel>
               <InputNumber 
                defaultValue={size_run_7} onChange={handleChange("size_run_7")}
                min={ 0 } name="size_run_7"
                placeholder = "Size Run 7"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_7 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_7 !== ""  && <p className="p-error">{filedError.size_run_7 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 8</FormLabel>
               <InputNumber 
                defaultValue={size_run_8} onChange={handleChange("size_run_8")}
                min={ 0 } name="size_run_8"
                placeholder = "Size Run 8"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_8 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_8 !== ""  && <p className="p-error">{filedError.size_run_8 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
           <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 9</FormLabel>
               <InputNumber 
                defaultValue={size_run_9} onChange={handleChange("size_run_9")}
                min={ 0 } name="size_run_9"
                placeholder = "Size Run 9"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_9 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_9 !== ""  && <p className="p-error">{filedError.size_run_9 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 10</FormLabel>
               <InputNumber 
                defaultValue={size_run_10} onChange={handleChange("size_run_10")}
                min={ 0 } name="size_run_10"
                placeholder = "Size Run 10"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_10 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_10 !== ""  && <p className="p-error">{filedError.size_run_10 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
           <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 11</FormLabel>
               <InputNumber 
                defaultValue={size_run_11} onChange={handleChange("size_run_11")}
                min={ 0 } name="size_run_11"
                placeholder = "Size Run 11"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_11 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_11 !== ""  && <p className="p-error">{filedError.size_run_11 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
           <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 12</FormLabel>
               <InputNumber 
                defaultValue={size_run_12} onChange={handleChange("size_run_12")}
                min={ 0 } name="size_run_12"
                placeholder = "Size Run 12"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_12 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_12 !== ""  && <p className="p-error">{filedError.size_run_12 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 13</FormLabel>
               <InputNumber 
                defaultValue={size_run_13} onChange={handleChange("size_run_13")}
                min={ 0 } name="size_run_13"
                placeholder = "Size Run 13"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_13 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_13 !== ""  && <p className="p-error">{filedError.size_run_13 }</p>}
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
          <FormControl fullWidth required margin="normal">
              <FormLabel component="legend" className='size_run_label'>Size Run 14</FormLabel>
               <InputNumber 
                defaultValue={size_run_14} onChange={handleChange("size_run_14")}
                min={ 0 } name="size_run_14"
                placeholder = "Size Run 14"
                max={ 999 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
                maxLength={ 3 }
                style={{ width: 100, height : 40 , color: 'black'}}
                upHandler={upHandler}
                downHandler={downHandler}
                className={filedError.size_run_14 !== "" ? "has-error" : ""}
                />
                {filedError.size_run_14 !== ""  && <p className="p-error">{filedError.size_run_14 }</p>}
              </FormControl>
          </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <button className="btn btn-primary shadow-2 mb-4"
            onClick={handleBack}
        >
              <ArrowBackOutlinedIcon/>
        </button>

        <button className="btn btn-primary shadow-2 mb-4"
            onClick={handleNext}
            style={{ marginLeft: 20 }}
            disabled={ isError}
        >
            <ArrowForwardOutlinedIcon/>
        </button>

        {/* <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={ isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button> */}
      </div>
    </Fragment>
  )
}

export default SecondStepAdd
