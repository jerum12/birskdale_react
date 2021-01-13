import React, { useState, useEffect, Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

// Destructure props
const FirstStepAdd = ({
  handleNext,
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
            canvass,
            midsole,
            outsole,
            sock_liner,
            special_instruction
        },
  filedError,
  isError,
  arrayParam
}) => {

  ////console.log(color);
  
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
    stitch !== null && stitch !== '' &&
    canvass !== null && canvass !== '' &&
    midsole !== null && midsole !== '' &&
    outsole !== null && outsole !== '' &&
    sock_liner !== null && sock_liner !== '' 


    // //console.log(stock_no)
    // //console.log(gender)
    // //console.log(color)
    // //console.log(leather_type)
    // //console.log(classification_1)
    // //console.log(classification_2)
    // //console.log(logo)
    // //console.log(sub_logo)
    // //console.log(lining)
    // //console.log(stitch)
    // //console.log(isEmpty+ '-----------')

    // const [stockArray, setstockArray] = useState([])
    // const [class1Array, setClass1Array] = useState([])
    // const [class2Array, setClass2Array] = useState([])
    // const [colorArray, setColorArray] = useState([])
    // const [genderArray, setGenderArray] = useState([])
    // const [leatherArray, setLeatherArray] = useState([])
    // const [liningArray, setLiningArray] = useState([])
    // const [logoArray, setLogoArray] = useState([])
    // const [stitchArray, setStitchArray] = useState([])
    // const [subLogoArray, setSubLogoArray] = useState([])

    // const { register, handleSubmit, reset, errors, control } = useForm();

    // useEffect(() => {
    //     //console.log(arrayParam)
    //     inputOptions()
    // }, [inputOptions])

    // const inputOptions = () => {
  
    //     setstockArray(arrayParam.stock.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setClass1Array(arrayParam.class1.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setClass2Array(arrayParam.class2.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setColorArray(arrayParam.color.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setGenderArray(arrayParam.gender.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setLeatherArray(arrayParam.leather.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setLiningArray(arrayParam.lining.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setStitchArray(arrayParam.stitch.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setLogoArray(arrayParam.logo.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))

    //       setSubLogoArray(arrayParam.sublogo.map((item) => {
    //         return { "id" : item._id, "label" : item.description,  "value" : item.code  }
    //       }))


    // }

  
  

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


        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.canvass}
                        name="canvass"
                        value={canvass}
                        onChange={handleChange('canvass')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Canvass"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.canvass !== ""}
                            helperText={
                            filedError.canvass !== "" ? `${filedError.canvass}` : ""
                            }
                            required
                            name="canvass"
                            />
                        )}
                    />
          </FormControl>
        </Grid>


        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.midsole}
                        name="midsole"
                        value={midsole}
                        onChange={handleChange('midsole')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Midsole"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.midsole !== ""}
                            helperText={
                            filedError.midsole !== "" ? `${filedError.midsole}` : ""
                            }
                            required
                            name="midsole"
                            />
                        )}
                    />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.outsole}
                        name="outsole"
                        value={outsole}
                        onChange={handleChange('outsole')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Outsole"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.outsole !== ""}
                            helperText={
                            filedError.outsole !== "" ? `${filedError.outsole}` : ""
                            }
                            required
                            name="outsole"
                            />
                        )}
                    />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required margin="normal">
            <Autocomplete
                        options={arrayParam.sock_liner}
                        name="sock_liner"
                        value={sock_liner}
                        onChange={handleChange('sock_liner')}
                        getOptionLabel={option => typeof option === 'string' ? option : option.description}
                        renderInput={params => (
                            <TextField
                            {...params}
                            label="Select Sockliner"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                            error={filedError.sock_liner !== ""}
                            helperText={
                            filedError.sock_liner !== "" ? `${filedError.sock_liner}` : ""
                            }
                            required
                            name="sock_liner"
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
                inputProps={{ maxLength: 30 }}
            />
            </FormControl>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <button className="btn btn-primary shadow-2 mb-4"
            onClick={handleNext}
            style={{ marginLeft: 20 }}
            disabled={!isEmpty || isError}
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

export default FirstStepAdd
