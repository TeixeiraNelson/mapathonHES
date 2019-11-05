import React, {useEffect} from "react";
import {Formik} from "formik";
import {makeStyles, useTheme} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    formControl: {margin: theme.spacing(1), minWidth: 250, maxWidth: 250,},
    chips: {display: 'flex', flexWrap: 'wrap',},
    chip: {margin: 2,},
    noLabel: {marginTop: theme.spacing(3),},
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {PaperProps: {style: {maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,},},};

const MultipleSelect = ({array, setArray, name, actualSelectedValues}) => {
    console.log("actual selected init")
    console.log(actualSelectedValues);
    let count = 0;
    const classes = useStyles();
    const theme = useTheme();
    const [categStr, setCategStr] = React.useState(actualSelectedValues);



    const handleChange = event => {
        setCategStr(event.target.value)
    };


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
        this.updatePoi= props.updatePoi;
        this.newPoi = props.newPoi;
        if(typeof this.props.currentPoi !== 'undefined'){
            this.actualCats = this.props.currentPoi.Categories;
            this.actualTags = this.props.currentPoi.Tags;
        }
        this.insertCategory = props.InsertCategory;
        this.insertTag = props.InsertTag;
        this.requestToken = props.requestToken;
        this.useAuth = props.useAuth;
        this.InsertPoi = props.InsertPoi;
        this.Allcategories = props.categories;
        this.AllTags = props.tags;
        this.state = {
            tagNameValue:"",
            tagImgValue:"",
            tagColorValue:"",
            addCatString : "New Category",
            addTagString : "New Tag",
            catNameValue:"",
            catImgValue:"",
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
            toggleAddCategory : false,
            toggleAddTag : false,
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
        if (this.props.currentPoi !== null && typeof this.props.currentPoi !== 'undefined') {
            console.log("Setting state...")
            this.setState({
                currentPoi: this.props.currentPoi,
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

            this.setCategoriesArray(this.props.currentPoi.Categories);
            this.setTagsArray(this.props.currentPoi.Tags);
        }


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
        if (typeof this.props.currentPoi === 'undefined' || this.props.currentPoi===null) {
            if (this.state.poi.name !== null && this.state.poi.name.length > 1) {
                this.InsertPoi(this.state.poi);
                this.closeMenu(false);
            } else
                alert("A point cannot be added without a name at least")
        } else {
            console.log("DO THE MODIFY POY MANOEUVER");
            console.log(this.state.poi);
            this.updatePoi(this.state.poi, this.props.currentPoi.id);
            this.closeMenu(false);

        }

    };

    /*
    Function to add categories to a P.O.I
    displays all the database's available categories and allows the user to choose between those.

    Saves them in the state
     */
    setCategoriesArray = (array) => {
        let categoriesArray=[];
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
                    Categories: categoriesArray
                }
            }
        )

        console.log("Categs passed")
        this.actualCats = categoriesArray;
        console.log(categoriesArray)
    };

    /*
    Function to add tags to a P.O.I
    displays all the database's available tags and allows the user to choose between those.

    Saves them in the state
     */
    setTagsArray = (array) => {
        let tagsArray=[];
        let str = "";

        this.AllTags.map(cat => {
                array.map(element => {
                    if (cat.name === element) {
                        console.log(cat);
                        str += cat.name + "  ";
                        tagsArray.push(cat);
                    }
                })

            }
        );

        this.setState(prevState => ({
            tags: tagsArray,
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
                    Tags: tagsArray,
                    Categories: this.state.categories
                }
            }
        )

        console.log("tags passed")
        this.actualTags = tagsArray;
        console.log(tagsArray)
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
                        value={'General Information'}
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
                        value={'GPS Coordinates'}
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
                    <MultipleSelect array={this.Allcategories} setArray={this.setCategoriesArray} name={"Categories"}
                                    actualSelectedValues={this.generateStringArray(this.actualCats)}/>
                    <button
                            onClick={this.addCategory}>{this.state.addCatString}
                    </button>
                    {this.state.toggleAddCategory?
                        <div>
                            <input
                                type='text'
                                name='catNameValue'
                                placeholder='Category Name'
                                value={this.state.catNameValue}
                                onChange={e => this.valueUpdateAction(e)}/>
                            <br/>
                            <input
                                type='text'
                                name='catImgValue'
                                placeholder='Image URL (Optional)'
                                value={this.state.catImgValue}
                                onChange={e => this.valueUpdateAction(e)}/>
                            <br/>
                            <button onClick={this.createCategoryAction}>Create Category</button>
                    </div>:<div></div>}
                    <MultipleSelect array={this.AllTags} setArray={this.setTagsArray} name={"Tags"}
                                    actualSelectedValues={this.generateStringArray(this.actualTags)}/>
                    <button
                            onClick={this.addTag}>{this.state.addTagString}
                    </button>
                    {this.state.toggleAddTag?
                        <div>
                            <form>
                                <input
                                    type='text'
                                    name='tagNameValue'
                                    placeholder='Tag Name'
                                    value={this.state.tagNameValue}
                                    onChange={e => this.valueUpdateAction(e)}/>
                                <br/>
                                <input
                                    type='text'
                                    name='tagImgValue'
                                    placeholder='Image URL (Optional)'
                                    value={this.state.tagImgValue}
                                    onChange={e => this.valueUpdateAction(e)}/>
                                <br/>
                                <input
                                    type='text'
                                    name='tagColorValue'
                                    placeholder='#Color (Optional)'
                                    value={this.state.tagColorValue}
                                    onChange={e => this.valueUpdateAction(e)}/>
                                <br/>
                                <button onClick={this.createTagAction}>Create Tag</button>
                            </form>
                        </div>:<div></div>}
                    <button className="button" id="submitButton" value={this.state.poi}
                            onClick={this.submitAction}>Submit
                    </button>
                </form>
            </Formik>
        )
    }

    generateStringArray(array) {
        let str = [];
        if(typeof array === 'undefined' ||array === null)
            return str;

        array.map(elem => {
            str.push(elem.name);
        })
        return str;
    }

    addCategory = (e) => {
        e.preventDefault();
       this.toggleCategoryAdd()
    }

    toggleCategoryAdd() {
        let isAddCategoryToggled = this.state.toggleAddCategory;
        if(!isAddCategoryToggled){
            this.state.addCatString = "Cancel"
        } else {
            this.state.addCatString = "New Category";
        }
        this.setState({toggleAddCategory: !isAddCategoryToggled});
    }

    addTag = (e) => {
        e.preventDefault();
        this.toggleTagAdd();
    }

    createCategoryAction = (e) => {
        e.preventDefault();

        if(this.state.catNameValue!== null && this.state.catNameValue.length>1){
            let cat = {
                name: this.state.catNameValue,
                image: this.state.catImgValue,
                group: 1
            }
            console.log("FOrm button create cat");
            console.log(cat);
            this.insertCategory(cat);
            this.toggleCategoryAdd();
        } else {
            alert("Please insert a name to the category!");
        }
    }

    createTagAction = (e) => {
        e.preventDefault();

        if(this.state.tagNameValue!== null && this.state.tagNameValue.length>1){
            let tag = {
                name: this.state.tagNameValue,
                image: this.state.tagImgValue,
                color: this.state.tagColorValue,
                group: 1
            }
            console.log("FOrm button create TAG");
            console.log(tag);
            this.insertTag(tag);
            this.toggleTagAdd();
        } else {
            alert("Please insert a name to the Tag!");
        }
    }

    toggleTagAdd() {
        let isAddTagToggled = this.state.toggleAddTag;
        if(!isAddTagToggled){
            this.state.addTagString = "Cancel"
        } else {
            this.state.addTagString = "New Tag";
        }
        this.setState({toggleAddTag: !isAddTagToggled});
    }
}

export default Form;