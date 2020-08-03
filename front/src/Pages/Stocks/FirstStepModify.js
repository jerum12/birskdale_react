import React, {Fragment} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

// Destructure props
const FirstStepModify = ({
  handleNext,
  handleNextModify,
  handleChange,
  values: { stock_no,
            gender,
            color,
            leather_type,
            classification_1,
            classification_2,
            logo,
            sub_logo,
            lining,
            stitch,
            special_instruction
        },
  filedError,
  isError,
  arrayParam,
  details,
  props
}) => {


  //console.log(color);
  
  // Check if all values are not empty
  const isEmpty =
    stock_no !== null && stock_no !== '' &&
    gender !== null && gender !== '' &&
    color !== null && color !== '' &&
    leather_type !== null && leather_type !== '' &&
    classification_1 !== null && classification_1 !== '' &&
    classification_2 !== null && classification_2 !== '' &&
    logo !== null && logo !== '' &&
    sub_logo !== null && sub_logo !== '' &&
    lining !== null && lining !== '' &&
    stitch !== null && stitch !== '' 


    const noChange = stock_no !== null && stock_no.description === details.stock_no.description &&
    color !== null && color.description === details.color.description &&
    gender !== null && gender.description === details.gender.description &&
    leather_type !== null && leather_type.description === details.leather_type.description &&
    classification_1 !== null && classification_1.description === details.classification_1.description &&
    classification_2 !== null && classification_2.description === details.classification_2.description &&
    logo !== null && logo.description === details.logo.description &&
    sub_logo !== null && sub_logo.description === details.sub_logo.description &&
    stitch !== null && stitch.description === details.stitch.description &&
    lining !== null && lining.description === details.lining.description &&
    special_instruction !== null && special_instruction === details.special_instruction

    
     //console.log(stock_no + '================')
    // console.log(gender)
    // console.log(color)
    // console.log(leather_type)
    // console.log(classification_1)
    // console.log(classification_2)
    // console.log(logo)
    // console.log(sub_logo)
    // console.log(lining)
    // console.log(stitch)
    // console.log(isEmpty+ '-----------')

  return (
      
    <Fragment>
      <Grid container spacing={2} noValidate>

        <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
               <Autocomplete
                options={arrayParam.stock}
                name="stock_no"
                value={stock_no}
                onChange={handleChange('stock_no')}
                getOptionLabel={option => typeof option === 'string' ? option : option.description}
                getOptionSelected={ value => {
                    //console.log(stock_no)
                    if(stock_no.description === value.description){
                        //console.log('equal-----------------')
                        return stock_no.description === value.description
                    }
                }}
                renderInput={params => (
                    <TextField
                    {...params}
                    label="Select Stocks"
                    margin="normal"
                    autoComplete='off'
                    
                    fullWidth
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "off"
                    }}
                    error={filedError.stock_no !== ""}
                      helperText={
                      filedError.stock_no !== "" ? `${filedError.stock_no}` : ""
                    }
                    required
                    name="stock_no"
                    />
                )}
                />
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
                <Autocomplete
                    options={arrayParam.color}
                    name="color"
                    value={color}
                    onChange={handleChange('color')}
                    getOptionLabel={option => typeof option === 'string' ? option : option.description}
                    getOptionSelected={ value => {
                      if(color.description === value.description){
                          //console.log('equal-----------------')
                          return color.description === value.description
                      }
                  }}
                    renderInput={params => (
                        <TextField
                        {...params}
                        label="Select Color"
                        margin="normal"
                        fullWidth
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "off"
                        }}
                        error={filedError.color !== ""}
                        helperText={
                        filedError.color !== "" ? `${filedError.color}` : ""
                        }
                        required
                        name="color"
                        />
                    )}
                />
            </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
            <FormControl fullWidth required margin="normal">
                <Autocomplete
                        options={arrayParam.gender}
                        name="gender"
                        value={gender}
                        onChange={handleChange('gender')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(gender.description === value.description){
                              //console.log('equal-----------------')
                              return gender.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Gender"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.gender !== ""}
                            helperText={
                            filedError.gender !== "" ? `${filedError.gender}` : ""
                            }
                            required
                            name="gender"
                            />
                        )}
                    />
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.leather}
                        name="leather_type"
                        value={leather_type}
                        onChange={handleChange('leather_type')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(leather_type.description === value.description){
                              //console.log('equal-----------------')
                              return leather_type.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Leather Type"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.leather_type !== ""}
                            helperText={
                            filedError.leather_type !== "" ? `${filedError.leather_type}` : ""
                            }
                            required
                            name="leather_type"
                            />
                        )}
                    />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.class1}
                        name="classification_1"
                        value={classification_1}
                        onChange={handleChange('classification_1')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(classification_1.description === value.description){
                              //console.log('equal-----------------')
                              return classification_1.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Classification 1"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.classification_1 !== ""}
                            helperText={
                            filedError.classification_1 !== "" ? `${filedError.classification_1}` : ""
                            }
                            required
                            name="classification_1"
                            />
                        )}
                    />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
             <Autocomplete
                        options={arrayParam.class2}
                        name="classification_2"
                        value={classification_2}
                        onChange={handleChange('classification_2')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(classification_2.description === value.description){
                              //console.log('equal-----------------')
                              return classification_2.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Classification 2"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.classification_2 !== ""}
                            helperText={
                            filedError.classification_2 !== "" ? `${filedError.classification_2}` : ""
                            }
                            required
                            name="classification_2"
                            />
                        )}
                    />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
                <Autocomplete
                        options={arrayParam.logo}
                        name="logo"
                        value={logo}
                        onChange={handleChange('logo')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(logo.description === value.description){
                              //console.log('equal-----------------')
                              return logo.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Logo"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.logo !== ""}
                            helperText={
                            filedError.logo !== "" ? `${filedError.logo}` : ""
                            }
                            required
                            name="logo"
                            />
                        )}
                    />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.sublogo}
                        name="sub_logo"
                        value={sub_logo}
                        onChange={handleChange('sub_logo')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(sub_logo.description === value.description){
                              //console.log('equal-----------------')
                              return sub_logo.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Sub Logo"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.sub_logo !== ""}
                            helperText={
                            filedError.sub_logo !== "" ? `${filedError.sub_logo}` : ""
                            }
                            required
                            name="sub_logo"
                            />
                        )}
                    />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
          <FormControl fullWidth required margin="normal">
          <Autocomplete
                        options={arrayParam.lining}
                        name="lining"
                        value={lining}
                        onChange={handleChange('lining')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(lining.description === value.description){
                              //console.log('equal-----------------')
                              return lining.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Lining"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.lining !== ""}
                            helperText={
                            filedError.lining !== "" ? `${filedError.lining}` : ""
                            }
                            required
                            name="lining"
                            />
                        )}
                    />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.stitch}
                        name="stitch"
                        value={stitch}
                        onChange={handleChange('stitch')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        getOptionSelected={ value => {
                          if(stitch.description === value.description){
                              //console.log('equal-----------------')
                              return stitch.description === value.description
                          }
                      }}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Stitch"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.stitch !== ""}
                            helperText={
                            filedError.stitch !== "" ? `${filedError.stitch}` : ""
                            }
                            required
                            name="stitch"
                            />
                        )}
                    />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
                <FormControl fullWidth margin="normal">
                <TextField
                label="Special Instruction"
                name="special_instruction"
                defaultValue={special_instruction}
                onChange={handleChange("special_instruction")}
                margin="normal"
                error={filedError.special_instruction !== ""}
                helperText={
                    filedError.special_instruction !== "" ? `${filedError.special_instruction}` : ""
                }
            />
            </FormControl>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <button className="btn btn-primary shadow-2 mb-4"
                onClick={()=>{
            props.history.goBack()
        }}>Back</button>

        <button className="btn btn-primary shadow-2 mb-4"
            onClick={handleNext}
            style={{ marginLeft: 20 }}
            disabled={!isEmpty || isError || noChange}
        >
            <ArrowForwardOutlinedIcon/>
        </button>
        {/* <Button
          variant="contained"
          // disabled={!isEmpty || isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button> */}
      </div>
    </Fragment>
  )
}

export default FirstStepModify
