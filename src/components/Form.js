import React from 'react';

export default class Form extends React.Component
{
    state = {
        title:'',
        description:'',
        address:'',
        isVerify:'',
    }

    change = (e) =>{
        this.props.onChange({[e.target.name]: e.target.value})
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e =>{
        e.preventDefault();
       // this.props.onSubmit(this.state);
        this.setState({
            title:'',
            description:'',
            address:'',
            isVerify:'',
        })
        this.props.onChange({
            title:'',
            description:'',
            address:'',
            isVerify:'',
        })
    }

    render() {
       return(
           <form className={Form}>
               <label title={'title'}>title</label>
               <input
                   name='title'
                   placeholder='Title'
                   value={this.state.title}
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
               <label address={'address'}>address</label>
               <input
                   name='address'
                   placeholder='Address'
                   value={this.state.address}
                   onChange={e => this.change(e)}               />
               <br/>
               <button onClick={e => this.onSubmit(e)}>Submit</button>
           </form>
       )
    }
}