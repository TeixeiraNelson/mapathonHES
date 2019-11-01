import React from "react";
import {Formik} from "formik";
import {makeStyles, useTheme} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
const useStyles = makeStyles(theme => ({formControl: {margin: theme.spacing(1), minWidth: 250, maxWidth: 250,}, chips: {display: 'flex', flexWrap: 'wrap',}, chip: {margin: 2,}, noLabel: {marginTop: theme.spacing(3),},}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {PaperProps: {style: {maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,},},};

const MultipleSelect = ({array, setArray, name}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [categStr, setCategStr] = React.useState([]);

    const handleChange = event => {
        setCategStr(event.target.value);
        setArray(event.target.value);
    };

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
                    input={<Input />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {array.map(elem => (
                        <MenuItem key={elem.id} value={elem.name} name={elem.name}>
                            <Checkbox checked={categStr.indexOf(elem.name) > -1} />
                            <ListItemText primary={elem.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}


/*
Form component : displays the form to add a new P.O.I
 */
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.closeMenu = props.closeMenu;
        this.lat = props.lat;
        this.lng = props.lng;
        this.newPoi = props.newPoi;
        this.requestToken = props.requestToken;
        this.useAuth = props.useAuth;
        this.InsertPoi = props.InsertPoi;
        this.Allcategories = props.categories;
        this.AllTags = props.tags;
        this.state = {
            currentPoi: props.currentPoi,
            categories: [],
            categoriesString: "",
            status: props.status[1],
            tags: [],
            tagsString: "",
            name: '',
            description: '',
            lat: this.props.lat,
            lng: this.props.lng,
            image: '',
            url: '',
            group: 1,


            poi: {
                name: '',
                description: '',
                lat: this.props.lat,
                lng: this.props.lng,
                image: '',
                url: '',
                group: 1,
                Status: [],
                Tags: [],
                Categories: []
            }
        }
    }

    componentDidMount(): void {
        this.applyForm();
    }

    applyForm() {
        console.log(this.state.poi)
        console.log("curr : ");
        console.log(this.props.currentPoi)
        if(this.state.currentPoi !== null && typeof this.state.currentPoi !== 'undefined'){
            console.log("Setting state...")
            this.setState({
                    name: this.props.currentPoi.name,
                    description: this.props.currentPoi.description,
                    lat: this.props.currentPoi.lat,
                    lng: this.props.currentPoi.lng,
                    image: this.props.currentPoi.image,
                    url: this.props.currentPoi.url,
                    group: 1,
                    Status: this.props.currentPoi.Status,
                    Tags: this.props.currentPoi.Tags,
                    Categories: this.props.currentPoi.Categories
            });
        }

        this.setCategoriesArray(this.props.currentPoi.Categories);
        this.setTagsArray(this.props.currentPoi.Tags);
    }

    /*
    Function to update a state value depending on its input. Whenever a value changes, its state updates
     */
    valueUpdateAction = (e) => {
        this.props.onChange({[e.target.name]: e.target.value});

        this.setState({
            [e.target.name]: e.target.value

        });

        this.setState({
                poi: {
                    name: this.state.name,
                    description: this.state.description,
                    lat: this.props.lat,
                    lng: this.props.lng,
                    image: this.state.image,
                    url: this.state.url,
                    group: 1,
                    Status: this.state.status,
                    Tags: this.state.tags,
                    Categories: this.state.categories
                }
            }
        )

    };

    /*
    Function to insert the new P.O.I when the submit button is clicked.
    Also, verifies that the P.O.I has, at least, a name.
     */
    submitAction = (e) => {
        e.preventDefault();
        if(this.state.currentPoi === null){
            if (this.state.poi.name !== null && this.state.poi.name.length > 1) {
                this.InsertPoi(this.state.poi);
                this.closeMenu(false);
            } else
                alert("A point cannot be added without a name at least")
        } else {
            console.log("DO THE MODIFY POY MANOEUVER");
            console.log(this.state.poi);
        }

    };

    /*
    Function to add categories to a P.O.I
    displays all the database's available categories and allows the user to choose between those.

    Saves them in the state
     */
    setCategoriesArray = (array) => {
        let categoriesArray = [];
        let str = "";

        this.Allcategories.map(cat => {
            array.map(element => {
                if (cat.name === element) {
                    console.log(cat);
                    str += cat.name + "  ";
                    categoriesArray.push(cat);
                }
            })

            }
        );

        this.setState(prevState => ({
            categories: categoriesArray,
            categoriesString: str
        }))

        this.setState({
                poi: {
                    name: this.state.name,
                    description: this.state.description,
                    lat: this.props.lat,
                    lng: this.props.lng,
                    image: this.state.image,
                    url: this.state.url,
                    group: 1,
                    Status: this.state.status,
                    Tags: this.state.tags,
                    Categories: this.state.categories
                }
            }
        )

        console.log(this.state.categories);
    };

    /*
    Function to add tags to a P.O.I
    displays all the database's available tags and allows the user to choose between those.

    Saves them in the state
     */
    setTagsArray = (array) => {
        let arr = [];
        let str = "";

        this.AllTags.map(cat => {
                array.map(element => {
                    if (cat.name === element) {
                        console.log(cat);
                        str += cat.name + "  ";
                        arr.push(cat);
                    }
                })

            }
        );

        this.setState(prevState => ({
            tags: arr,
            tagsString: str
        }))

        this.setState({
                poi: {
                    name: this.state.name,
                    description: this.state.description,
                    lat: this.props.lat,
                    lng: this.props.lng,
                    image: this.state.image,
                    url: this.state.url,
                    group: 1,
                    Status: this.state.status,
                    Tags: this.state.tags,
                    Categories: this.state.categories
                }
            }
        )
    };


    render() {
        /*
        Rendering the form with its inputs, selection tags and categories and a submit button
         */
        return (
            <Formik>
                <form className={"form"}>
                    <input
                        type='text'
                        disabled
                        value={'Informations Générales'}
                        style={{borderBottom: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 19}}
                    />
                    <textarea
                        name='name'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={e => this.valueUpdateAction(e)}
                        required={true}
                    />
                    <br/>

                    <textarea
                        name='description'
                        placeholder='Description'
                        value={this.state.description}
                        onChange={e => this.valueUpdateAction(e)}
                        required={true}
                    />
                    <br/>
                    <div style={{display: 'inline'}}>
                        <input
                            type='text'
                            disabled
                            name='status'
                            placeholder='Status :'
                            value={'Status : '}
                            style={{width: 80, display: 'inline', borderBottom: 0}}
                        /><input
                        type='text'
                        disabled
                        name='status'
                        placeholder='Status :'
                        value={this.state.status.name}
                        style={{width: 90, color: 'yellow', display: 'inline', borderBottom: 0}}
                    />
                    </div>
                    <br/><br/>
                    <input
                        type='text'
                        disabled
                        value={'Coordonnées GPS'}
                        style={{borderBottom: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 19}}
                    />
                    <input
                        type='text'
                        disabled
                        name='lat'
                        placeholder='lat'
                        value={'lat : ' + this.props.lat}
                        onChange={e => this.valueUpdateAction(e)}/>
                    <br/>
                    <input
                        type='text'
                        disabled
                        name={this.props.lng}
                        placeholder={this.props.lng}
                        value={'lng : ' + this.props.lng}
                        onChange={e => this.valueUpdateAction(e)}/>
                    <br/>
                    <input
                        type='text'
                        name='image'
                        placeholder='Image URL'
                        value={this.state.image}
                        onChange={e => this.valueUpdateAction(e)}/>
                    <br/>

                    <input
                        type='text'
                        name='url'
                        placeholder='Site Url'
                        value={this.state.url}
                        onChange={e => this.valueUpdateAction(e)}/>
                    <br/>
                    <input
                        type='text'
                        disabled
                        name='group'
                        placeholder={1}
                        value={'Group : 1'}
                    />
                    <br/>
                    <MultipleSelect array={this.Allcategories} setArray={this.setCategoriesArray} name={"Categories"}/>
                    <MultipleSelect array={this.AllTags} setArray={this.setTagsArray} name={"Tags"}/>
                    <button className="button" id="submitButton" value={this.state.poi}
                            onClick={this.submitAction}>Submit
                    </button>
                </form>
            </Formik>
        )
    }
}

export default Form;