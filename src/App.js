import React, {useEffect, useState} from "react";
import {useAuth0} from "./react-auth0-spa";
import request from "./utils/request";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import RequestPoi from "./utils/RequestPoi"
import css from "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AppComponent from "./components/AppComponent"
import SettingsComponent from "./components/SettingsComponent";
import {makeStyles} from "@material-ui/core";

/*
    Main App wrapper, loads data and sends it to the AppComponent which basically handles the whole application.
*/
function App() {
    let [pois, setPois] = useState([]);
    let [categories, setCategories] = useState([]);
    let [status, setStatus] = useState([]);
    let [tags, setTags] = useState([]);
    let {loading, loginWithRedirect, getTokenSilently, user, logout} = useAuth0();


    /*
        Method that is called before the render(), loads the needed data and makes sure that a user is logged in.
        If no user is logged in he will be asked to do so, other whise it asks the server for the needed data.
     */
    useEffect(() => {
        const fn = async () => {
            if (loading === false) {
                await loadApplication();
            }
        };
        fn();
    }, [loading, getTokenSilently, loginWithRedirect, user, logout]);


    async function getCats() {
        let cats = await request(`${process.env.REACT_APP_SERVER_URL}/category`, getTokenSilently, loginWithRedirect);


        console.log("Setting cattegories from serv!");
        console.log(cats);
        if (cats && cats.length > 0) {
            setCategories(cats);
        }
    }

    async function getTags() {
        let tags = await request(`${process.env.REACT_APP_SERVER_URL}/tag`, getTokenSilently, loginWithRedirect);
        console.log(tags);

        if (tags && tags.length > 0) {
            setTags(tags);
        }
    }

    /*
        Function that does some GET requests to the server for the needed data : POIS, categories, etc...
        sets the data with the hooks
     */
    async function loadApplication() {
        if (user === null || loginWithRedirect === null || getTokenSilently === null)
            return;

        /* Loads POIS and sets it */
        let pois = await request(`${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`, getTokenSilently, loginWithRedirect);
        if (pois && pois.length > 0) {
            console.log(pois);
            setPois(pois);
        }

        /* Loads GPX Itineraries and sets it */
        await getGPX();

        /* Loads Categories and sets it */
        await getCats();

        /* Loads Tags and sets it */
        await getTags();

        /* Loads status and sets it */
        let status = await request(`${process.env.REACT_APP_SERVER_URL}/status`, getTokenSilently, loginWithRedirect);
        console.log(status);

        if (status && status.length > 0) {
            setStatus(status);
        }
    }

    if (loading) {
        return <Loading/>;
    }

    /*
    Returns the app which is in the AppComponent
     */
    return (
        <div className="App">
            <header className="App-header" id="AppHead">
                <div style={{fontWeight: 'bold',
                    fontSize: '30px',paddingTop: '10px'}}>MAPATHON</div>
            </header>
            <Router>
                <div>
                    <Switch>
                        <Route path="/settings">
                            {(pois && pois.length > 0 && categories && categories.length > 0 && tags && tags.length > 0 && user!==null)&&
                            <SettingsComponent user={user} categories={categories} logout={logout} tags={tags} updateCategory={UpdateCategory} updateTag={UpdateTag} DeleteCategory={DeleteCategory} DeleteTag={DeleteTag}/>}
                        </Route>
                        <Route path="/">
                            {(pois && pois.length > 0 && categories && categories.length > 0 && status && status.length > 0 && tags && tags.length > 0) &&
                            <AppComponent user={user} pois={pois} InsertPoi={InsertPoi} deletePoi={deletePoi} updatePoi={updatePoi} logout={logout}
                                          categories={categories} status={status} tags={tags} insertCategory={InsertCategory} insertTag={InsertTag}likePOI={LikePOI} dislikePOI={DisLikePOI} changeStatus={ChangeStatus}/>}
                        </Route>
                    </Switch>
                </div>
            </Router>
            <br/>
        </div>
    );

    /*
    Asks the RequestPoi utility class to insert a new POI in the database
    returns the server answer
     */
    async function InsertPoi(newPoi, updateMarker) {
        let data;
        data = await RequestPoi.addPOI(newPoi, getTokenSilently, loginWithRedirect);

        console.log(data);
        updateMarker(data);
    }

    /*
    Deletes a category
     */
    async function DeleteCategory(category) {
        console.log("DELETTING CATEGORY")
        let data;
        data = await RequestPoi.deleteCategory(category, getTokenSilently, loginWithRedirect);
        await getCats();
        console.log(data);
    }

    /*
    Deletes a tag
     */
    async function DeleteTag(tag) {
        console.log("DELETTING TAG")
        let data;
        data = await RequestPoi.deleteTag(tag, getTokenSilently, loginWithRedirect);
        await getTags();
        console.log(data);
    }

    /*
    Updates a category in the database
     */
    async function UpdateCategory(newCategory){
        let data;
        data = await RequestPoi.updateCategory(newCategory,getTokenSilently,loginWithRedirect);
        console.log(data);

        console.log("Reloading cats");
        await getCats();
    }

    /*
    Updates a tag in the database
     */
    async function UpdateTag(newTag){
        let data;
        data = await RequestPoi.updateTag(newTag,getTokenSilently,loginWithRedirect);
        console.log(data);

        /* Loads Tags and sets it */
        await getTags();
    }

    /*
    Asks the RequestPoi utility class to delete a POI in the database
    returns the server answer
     */
    async function deletePoi(poi, updateMap, pos) {
        console.log("DELETEING POI " + poi);
        let data;
        data = await RequestPoi.deletePOI(poi, getTokenSilently, loginWithRedirect);
        console.log(data);

        if (data.error != null) {
            if (data.error.status === 403) {
                alert("You cannot delete someone else's P.O.I");
            }
        } else {
            updateMap(pos);
            console.log("UPDATING MAP");
        }

        return data;
    }


    /*
        Updates an existing poi in the database.
     */
    async function updatePoi(poi, id, updateMarker){
        console.log("Updating POI with id : " + id)
        console.log(poi);
        poi.id = id;

        let data;
        data = await RequestPoi.updatePOI(id,poi,getTokenSilently,loginWithRedirect);
        console.log(data);

        let data2;
        data2 = await RequestPoi.getPOI(id, getTokenSilently,loginWithRedirect);
        updateMarker(data2, id);

        return data2;
    }

    async function InsertTag(tag, setTag){
        console.log("Creating TAG APP JS")
        console.log(tag);

        let data;
        data = await RequestPoi.insertTAg(tag,getTokenSilently,loginWithRedirect);
        console.log(data);

        setTag(data);
        return data;
    }

    async function InsertCategory(category, setCategory){
        console.log("Creating category APP JS")
        console.log(category);

        let data;
        data = await RequestPoi.insertCategory(category,getTokenSilently,loginWithRedirect);
        console.log(data);

        setCategory(data);
        return data;
    }

    /*
    Asks the RequestPoi utility class to load the GPX itineraries files
    returns the server answer
     */
    async function getGPX() {
        let data;
        data = await RequestPoi.getGPXFiles(getTokenSilently, loginWithRedirect);

        console.log("GPX " + data);
        return data;
    }

    async function LikePOI(id, setMarker){
        console.log("Like POI")
        console.log(id);

        let data;
        data = await RequestPoi.likeFunction(id,getTokenSilently,loginWithRedirect);
        console.log("SERVER LIKE ANSWER")
        console.log(data);
        let newMarker = await RequestPoi.getPOI(id,getTokenSilently,loginWithRedirect);
        console.log(newMarker);
        setMarker(newMarker);
        return newMarker;
    }

    async function DisLikePOI(id,setMarker){
        console.log("Dislike POI")
        console.log(id);

        let data;
        data = await RequestPoi.dislikeFunction(id,getTokenSilently,loginWithRedirect);
        console.log(data);
        let newMarker = await RequestPoi.getPOI(id,getTokenSilently,loginWithRedirect);
        console.log(newMarker);
        setMarker(newMarker);
        return newMarker;
    }

    async function ChangeStatus(id,Status,setMarker){
        console.log("Status change")
        console.log(id);

        let data;
        data = await RequestPoi.changeStatus(id,Status,getTokenSilently,loginWithRedirect);
        console.log(data);
        let newMarker = await RequestPoi.getPOI(id,getTokenSilently,loginWithRedirect);
        console.log(newMarker);
        setMarker(newMarker);
        return newMarker;
    }
}

export default App;
