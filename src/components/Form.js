import React from 'react';
import {Formik} from "formik";


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





    state = {
        name:'',
        description:'',
        lat:'',
        lng:'',
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

        var newPOI = new POI(this.state.name, this.state.description, this.state.lat, this.state.lng, this.state.image, this.state.url, this.state.group);

        console.log(newPOI.name, newPOI.description);
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
                   value={this.state.lat}
                   onChange={e => this.change(e)}               />
               <br/>

               <label lng={'lng'}>Lng : </label>
               <input
                   name='lng'
                   placeholder='lng'
                   value={this.state.lng}
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