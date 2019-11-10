import React from "react";
import {Formik} from "formik";
import MultipleSelect from "./MultipleSelect";

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
        this.updatePoi = props.updatePoi;
        this.newPoi = props.newPoi;
        this.user = props.user;
        console.log(props.user);
        this.setAddMarkerOff = props.setAddMarkerOff;
        if (typeof this.props.currentPoi !== 'undefined') {
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
            tagNameValue: "",
            tagImgValue: "",
            tagColorValue: "",
            addCatString: "New Category",
            addTagString: "New Tag",
            catNameValue: "",
            catImgValue: "",
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
            toggleAddCategory: false,
            toggleAddTag: false,
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
                Categories: [],
                Creator: {
                    group: 1,
                    name: this.props.user.name,
                    id: this.props.user.sub
                }
            }
        }
    }

    /*
    Applys form value when the component mounted (used when form is used to modify a POI)
     */
    componentDidMount(): void {
        this.applyForm();
    }

    /*
    Default values are applied (Needed because we had to manage if form was used to create a new poi or modify an existing one)
     */
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
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    /*
    Function to insert the new P.O.I when the submit button is clicked.
    Also, verifies that the P.O.I has, at least, a name.
     */
    submitAction = (e) => {
        e.preventDefault();
        let poi = {
            name: this.state.name,
            description: this.state.description,
            lat: this.props.lat,
            lng: this.props.lng,
            image: this.state.image,
            url: this.state.url,
            group: 1,
            Status: this.state.status,
            Tags: this.state.tags,
            Categories: this.state.categories,
            Creator: {
                group: 1,
                name: this.props.user.name,
                id: this.props.user.sub
            }
        }
        this.setAddMarkerOff();
        if (typeof this.props.currentPoi === 'undefined' || this.props.currentPoi === null) {
            if (poi.name !== null && poi.name.length > 1) {
                this.InsertPoi(poi);
                this.closeMenu(false);
            } else{
                alert("A point cannot be added without a name at least")
                console.log(poi);
            }
        } else {
            console.log("DO THE MODIFY POY MANOEUVER");
            console.log(this.state.poi);

            console.log(poi);
            this.updatePoi(poi, this.props.currentPoi.id);
            this.closeMenu(false);
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
                    Categories: categoriesArray,
                    Creator: {
                        group: 1,
                        name: this.props.user.name,
                        id: this.props.user.sub
                    }
                }
            }
        )

        console.log("Categs passed")
        this.actualCats = categoriesArray;
        console.log(categoriesArray)
        return;
    };

    /*
    Function to add tags to a P.O.I
    displays all the database's available tags and allows the user to choose between those.

    Saves them in the state
     */
    setTagsArray = (array) => {
        let tagsArray = [];
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
                    Categories: this.state.categories,
                    Creator: {
                        group: 1,
                        name: this.props.user.name
                    }
                }
            }
        )
        this.actualTags = tagsArray;
        return;
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
                    {this.state.toggleAddCategory ?
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
                            <button onClick={this.submitCategory}>Create Category</button>
                        </div> : <div></div>}
                    <MultipleSelect array={this.AllTags} setArray={this.setTagsArray} name={"Tags"}
                                    actualSelectedValues={this.generateStringArray(this.actualTags)}/>
                    <button
                        onClick={this.addTag}>{this.state.addTagString}
                    </button>
                    {this.state.toggleAddTag ?
                        <div>
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
                        </div> : <div></div>}
                    <button className="button" id="submitButton" value={this.state.poi}
                            onClick={this.submitAction}>Submit
                    </button>
                </form>
            </Formik>
        )
    }

    generateStringArray(array) {
        let str = [];
        if (typeof array === 'undefined' || array === null)
            return str;

        array.map(elem => {
            str.push(elem.name);
        })
        return str;
    }

    /*
    Add category button action to display the little form that allows to add a category.
     */
    addCategory = (e) => {
        e.preventDefault();
        this.toggleCategoryAdd()
    }

    /*
    Sets the state of the addcategory form to make it available to the user
     */
    toggleCategoryAdd() {
        let isAddCategoryToggled = this.state.toggleAddCategory;
        if (!isAddCategoryToggled) {
            this.setState({addCatString: "Cancel"})
        } else {
            this.setState({addCatString: "New Category"});
        }
        this.setState({toggleAddCategory: !isAddCategoryToggled});
    }

    /*
   Add tag button action to display the little form that allows to add a category.
    */
    addTag = (e) => {
        e.preventDefault();
        this.toggleTagAdd();
    }

    /*
    Submit button of the create category
     */
    submitCategory = (e) => {
        e.preventDefault();

        if (this.state.catNameValue !== null && this.state.catNameValue.length > 1) {
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

    /*
    Submit button of the new created tag
     */
    createTagAction = (e) => {
        e.preventDefault();

        if (this.state.tagNameValue !== null && this.state.tagNameValue.length > 1) {
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

    /*
    Button action that allows the tag form to be displayed
     */
    toggleTagAdd() {
        let isAddTagToggled = this.state.toggleAddTag;
        if (!isAddTagToggled) {
            this.setState({addTagString: "Cancel"})
        } else {
            this.setState({addTagString: "New Tag"})
        }
        this.setState({toggleAddTag: !isAddTagToggled});
    }
}

export default Form;