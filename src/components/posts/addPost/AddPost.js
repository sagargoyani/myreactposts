import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';
import Input from '../../UI/Input/Input';
// import {isAuthenticated} from '../Auth/Auth';

import './AddPost.css'

class AddPost extends Component{
    // constructor(props){
    //     super(props);
    
    // }
    
    state = {
        orderForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your Title'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            body: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Your Content'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            auther: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Select Anyone..'},
                        {value: 'auther 1', displayValue: 'Auther 1'},
                        {value: 'auther 2', displayValue: 'Auther 2'},
                        {value: 'auther 3', displayValue: 'Auther 3'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        title: '',
        Content: '',
        Auther: '',
        submited: false,
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if(rules.minLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        console.log(updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm});
    }
    
    addDataHandler = () => {
        // const data = {
        //     title: this.state.title,
        //     body: this.state.Content,
        //     auther: this.state.Auther
        // }

        const data = {};
        for(let formElementIdentifier in this.state.orderForm){
            data[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        }
        
        

        axios.post('/posts.json?auth=' + localStorage.getItem('token'),data)
        .then(
            Response => {
            console.log(Response)
            this.props.history.replace('/posts/')
            // this.setState({submited: true})
        })
        .catch(error => alert( "User Unaurthorised : " + error));
    }
    
    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let submited = null;
        if(this.state.submited){
            submited = <Redirect to="/posts/" />;
        }
        return (
        <div className="AddPost">
            {submited}
            <h1>Add a Post</h1>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    valid = {formElement.config.valid}
                    touched = {formElement.config.touched}
                    shouldValidate = {formElement.config.validation}
                    value={formElement.config.value} />
            ))}
            <button onClick={this.addDataHandler}>Add Post</button>

        </div>
        )
    }
}

export default AddPost;