import {makeStyles, useTheme} from "@material-ui/core";
import React, {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {PaperProps: {style: {maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,},},};
const useStyles = React.createContext(makeStyles(theme => ({
    formControl: {margin: theme.spacing(1), minWidth: 250, maxWidth: 250,},
    chips: {display: 'flex', flexWrap: 'wrap',},
    chip: {margin: 2,},
    noLabel: {marginTop: theme.spacing(3),},
})));

/*
Function component that handles the drop down boxes and its values for the categories and tags, in the side menu form
 */
export default function MultipleSelect ({array, setArray, name, actualSelectedValues}){
    let count = 0;
    const classes = useStyles();
    const theme = useTheme();
    const [categStr, setCategStr] = React.useState(actualSelectedValues);
    const handleChange = event => {
        setCategStr(event.target.value)
    };

    /*
    Updates the array whenever a value is created or changed.
     */
    useEffect(() => {
        setArray(categStr);
    }, [categStr]);

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">{name}</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={categStr}
                    onChange={handleChange}
                    input={<Input/>}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {array.map(elem => (
                        <MenuItem key={elem.id} value={elem.name} name={elem.name}>
                            <Checkbox checked={categStr.indexOf(elem.name) > -1}/>
                            <ListItemText primary={elem.name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}