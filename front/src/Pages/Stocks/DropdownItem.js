import React, { Fragment } from "react"
import MenuItem from "@material-ui/core/MenuItem"


const DropdownItem = ({
    param
}) => {

    param.map((item) => {
        return <MenuItem value={item._id}>{item.description}</MenuItem>
    })
}

export default DropdownItem