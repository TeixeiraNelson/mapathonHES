import React from "react";
import arrow from "../assets/topArrow.png"
import SideMenuComponent from "./SideMenuComponent";

export default class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.logout = props.logout;
        this.updateTag=props.updateTag;
        this.updateCategory=props.updateCategory;
        this.state = {
            categories :props.categories,
            tags : props.tags,
            manageCategories: true,
            manageTags: false,
            nameCat:"",
            imageCat:"",
            nameTag:"",
            imageTag:"",
            colorTag:"",
            selectedCatElement:{
                id:0,
                name:"",
                image:""
            },
            selectedTagElement:{
                id:0,
                name:"",
                image:"",
                color:""
            }
        }
        this.filterArrays()
    }

    filterArrays() {
        let categories = this.state.categories;
        let filteredCats = [];

        categories.map(elem => {
            if (elem.Creator.id === this.user.sub) {
                filteredCats.push(elem);
            }
        })

        let tags = this.state.tags;
        let filteredTags = [];

        tags.map(elem => {
            if (elem.Creator.id === this.user.sub) {
                filteredTags.push(elem);
            }
        })

        this.state.categories = filteredCats;
        this.state.tags = filteredTags;
    }

    render() {
        return (
            <div>
                <div className={"topDiv"}>
                    <div className={"settingsTopDiv"}>
                        <SideMenuComponent logout={this.logout} user={this.user} isMainMenu={false}/>
                        <div className={"leftDiv"}>
                            <div className={"LeftDivTittle"} onClick={this.turnOnCategoriesAction}>Manage your
                                categories <img style={{height: 13, width: 13}} src={arrow}/></div>
                            {this.state.manageCategories === true && <div className={"LeftDivContent"}>
                                {this.generateCategoryLines()}
                            </div>}
                            <div className={"LeftDivTittle"} onClick={this.turnOnTagsAction}>Manage your Tags <img
                                style={{height: 13, width: 13}} src={arrow}/></div>
                            {this.state.manageTags === true && <div className={"LeftDivContent"}>{this.generateTagLines()}</div>}

                        </div>
                    </div>
                </div>

            </div>
        );
    }

    generateCategoryLines() {
        return (
            <table id="table">
                <thead>
                <tr>

                    <th>Category Name</th>
                    <th>Image URL (Optional)</th>
                    <th>Image Preview</th>
                    <th></th>

                </tr>
            </thead>
                <tbody>
                {this.state.categories.map(cat => (
                    <tr key={cat.id}>
                        <td><input disabled={this.state.selectedCatElement.id !== cat.id} type={"text"} name={"nameCat"} value={this.state.selectedCatElement.id === cat.id?this.state.nameCat:cat.name} placeholder={cat.name} onChange={(e) =>{this.updateInput(e,cat)}}/></td>
                        <td><input disabled type={"text"} name={"imageCat"} value={this.state.selectedCatElement.id === cat.id?this.state.imageCat:cat.image} placeholder={cat.image.length < 1 ? "No image URL.": cat.image} size={50} onChange={(e) =>{this.updateInput(e,cat)}}/></td>
                        <td><img src={cat.image} width={30} height={30}/></td>
                        <td style={{margin: "auto"}}>
                            <div className="actions button-container" style={{width:'250px'}}>
                                <div className="button-group">
                                    <button className={"buttonSettings primary"} onClick={(e) => {e.preventDefault(); this.setState({selectedCatElement:{
                                            id:cat.id,
                                            name:cat.name,
                                            image:cat.img
                                        }}); this.setState({nameCat:cat.name, imageCat:cat.image});}}>Edit</button>
                                    {this.state.selectedCatElement.id === cat.id && <button className={"buttonSettings"} onClick={(e) => {e.preventDefault(); this.updateCategoryAction(e)}}>Update</button>}
                                    {this.state.selectedCatElement.id === cat.id &&<button className={"buttonSettings danger"} >Delete</button>}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>)
    }

    generateTagLines() {
        return (
            <table id="table">
                <thead>
                <tr>
                    <th>Tag Name</th>
                    <th>Image URL (Optional)</th>
                    <th>Image Preview</th>
                    <th>Color (Optional)</th>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                {this.state.tags.map(tag => (
                    <tr key={tag.id}>
                        <td><input disabled={this.state.selectedTagElement.id !== tag.id} type={"text"} name={"nameTag"} value={this.state.selectedTagElement.id === tag.id?this.state.nameTag:tag.name} placeholder={tag.name} onChange={(e) =>{this.updateInput(e,tag)}} /></td>
                        <td><input type={"text"} disabled name={"imageTag"} value={this.state.selectedTagElement.id === tag.id?this.state.imageTag:tag.image} placeholder={tag.image.length < 1 ? "No image URL.": tag.image} size={50} onChange={(e) =>{this.updateInput(e,tag)}}/></td>
                        <td><img src={tag.image} width={30} height={30}/></td>
                        <td><input disabled style={{color:tag.color}} type={"text"} value={this.state.selectedTagElement.id === tag.id?this.state.colorTag:tag.color} onChange={(e) =>{this.updateInput(e,tag)}}/></td>
                        <td style={{margin: "auto"}}>
                            <div className="actions button-container" style={{width:'250px'}}>
                                <div className="button-group">
                                    <button className={"buttonSettings primary"} onClick={(e) => {e.preventDefault(); this.setState({selectedTagElement:{
                                            id:tag.id,
                                            name:tag.name,
                                            image:tag.img,
                                            color: tag.color
                                        }}); this.setState({nameTag:tag.name, imageTag:tag.image, colorTag:tag.color});}}>Edit</button>
                                    {this.state.selectedTagElement.id === tag.id && <button className={"buttonSettings"} onClick={(e) => {e.preventDefault(); this.updateTagAction(e)}}>Update</button>}
                                    {this.state.selectedTagElement.id === tag.id &&<button className={"buttonSettings danger"} >Delete</button>}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>)
    }

    turnOnCategoriesAction = (e) => {
        let v = this.state.manageCategories;
        this.setState({manageCategories: !v})
    }

    turnOnTagsAction = (e) => {
        let v = this.state.manageTags;
        this.setState({manageTags: !v})
    }

    updateInput(e, cat) {
        this.setState({
                [e.target.name]:e.target.value
            })
    }

    updateCategoryAction =(e) => {
        e.preventDefault();
        let newCat = {
            id:this.state.selectedCatElement.id,
            name:this.state.nameCat,
            image:this.state.imageCat,
        }
        let array =[];
        for(let i = 0 ; i< this.state.categories.length; i++){
            if(this.state.categories[i].id === newCat.id){
                array.push(newCat);
            } else{
                array.push(this.state.categories[i])
            }
        }

        this.setState({categories:array});
        this.setState({selectedCatElement:{
                id:0,
                name:"",
                image:""
            }})
        this.updateCategory(newCat);
    }

    updateTagAction=(e,tag)=>{
        e.preventDefault();
        let newTag = {
            id:this.state.selectedTagElement.id,
            name:this.state.nameTag,
            image:this.state.imageTag,
            color:this.state.colorTag
        }
        let arraytag =[];

        for(let i = 0 ; i< this.state.tags.length; i++){
            if(this.state.tags[i].id === newTag.id){
                arraytag.push(newTag);
            } else{
                arraytag.push(this.state.tags[i])
            }
        }

        this.setState({tags:arraytag});
        this.setState({selectedTagElement:{
                id:0,
                name:"",
                image:""
            }})
        this.updateTag(newTag);
    }
}