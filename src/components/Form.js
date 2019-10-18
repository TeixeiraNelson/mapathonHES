import React from 'react';
import {Formik} from "formik";
import {useAuth0} from '../react-auth0-spa';
import { useState } from "react";
import requestPOI from "./RequestPoi";




const acceptedFileTypes = 'image/x-png, image/png ,image/jpg, image/jpeg , image/gif';



var POI = function(name, description, lat, lng, image, url, group){
    this.name = name;
    this.description = description;
    this.lat = lat;
    this.lng = lng;
    this.image = image;
    this.url = url;
    this.group = group;
}



export default class Form extends React.Component
{




    constructor(props){
        super(props);
        this.lat = props.lat;
        this.lng = props.lng;
    }

    state = {
        selectedFiles: null
    }


    state = {
        name:'',
        description:'',
        lat: this.props.lat,
        lng: this.props.lng,
        image:'',
        url:'',
        group:''


    }




    change = (e) =>{
        this.props.onChange({[e.target.name]: e.target.value})
        this.setState({
            [e.target.name]: e.target.value
       
        })

    };

    onSubmit = e =>{
        e.preventDefault();

        let [pois, setPois] = useState([]);
        let { loading, loginWithRedirect, getTokenSilently } = useAuth0();


        var newPOI = new POI(this.state.name, this.state.description, this.state.lat, this.state.lng, this.state.image, this.state.url, this.state.group);

        console.log(newPOI.name, newPOI.description, newPOI.image, newPOI.url, newPOI.group);

        requestPOI.setPOI(newPOI,getTokenSilently,loginWithRedirect);

    }


    render() {
       return(
           <Formik>
           <form className={Form}>
               <label name={'name'}>Name : </label>
               <input
                   name='name'
                   placeholder='name'
                   value={this.state.name}
                   onChange={e => this.change(e)}
               />
               <br/>
               <label description={'description'}>description</label>
               <input
                   name='description'
                   placeholder='Description'
                   value={this.state.description}
                   onChange={e => this.change(e)}               />
               <br/>
               <label lat={'lat'}>Lat : </label>
               <input
                   name='lat'
                   placeholder='lat'
                   value={this.props.lat}
                   onChange={e => this.change(e)}               />
               <br/>

               <label lng={'lng'}>Lng : </label>
               <input
                   name={this.props.lng}
                   placeholder={this.props.lng}
                   value={this.props.lng}
                   onChange={e => this.change(e)}               />
               <br/>

               <label image={'image'}>Image : </label>
               <input

                   name='image'
                   placeholder='image'
                   value={this.state.image}
                   onChange={e => this.change(e)}               />
               <br/>


               <label url={'url'}>Url : </label>
               <input
                   name='url'
                   placeholder='url'
                   value={this.state.url}
                   onChange={e => this.change(e)}               />
               <br/>
               <label group={'group'}>Group : </label>
               <input
                   name='group'
                   placeholder='group'
                   value={this.state.group}
                   onChange={e => this.change(e)}               />
               <br/>

               <button onClick={e => this.onSubmit(e)}>Submit</button>

           </form>
           </Formik>
       )
    }
}