import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

// import Autht from '../Autht/Autht'
// import autht from '../Autht/Autht'

import './Auth.css'

export function isAuthenticated() {
    let token = localStorage.getItem('token');
    
    if (token) {
        return true;
    } else {
        return false;
    }
}

class Auth extends Component{
       state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        token: null
    }
    
    
    checkValidity(value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        if(rules.isEmail) {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }
    
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }
    
    addAuthDataHandler = () => {
        // const data = {
            //     title: this.state.title,
            //     body: this.state.Content,
        //     auther: this.state.Auther
        // }
        
        const data = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true
        };
        // for(let formElementIdentifier in this.state.orderForm){
            //     data[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            // }
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBnI99dlt6VXV2zTetZL4Kd1PyLDnJ7Qig';
            if(!this.state.isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBnI99dlt6VXV2zTetZL4Kd1PyLDnJ7Qig';
        }
        axios.post(url,data)
        .then(
            Response => {
                const expirationDate = new Date(new Date().getTime() + Response.data.expiresIn * 1000)
                localStorage.setItem('token', Response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                console.log(this.state.token);
                this.setState({
                    token: Response.data.idToken
                })
                console.log(this.state.token);
                
                // <Redirect from="/" to="/posts/" />
                // alert((this.state.isSignup ? 'Registration' : 'Login' ) + ' successfully...')
                // this.props.history.replace('/')
                // this.setState({submited: true})
            }).catch(error => {
                console.log(error)
                // alert(error.response.data.error.message);
            });
            // autht = {auth:this.state.token}
        }
        
        
        changeAuthModeHandler = () => {
            this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }
    
    render () {
        
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }
        const form = formElementsArray.map( formElement => (
            <Input 
            key={formElement.id}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            valid = {formElement.config.valid}
            touched = {formElement.config.touched}
            shouldValidate = {formElement.config.validation}
            value={formElement.config.value} />
            ));
            return (
                <React.Fragment>
            <div className="Auth">
                    {form}
                    <button onClick={() => {
                        // const controls = this.state.controls;
                        // const validation = controls.email.valid && controls.password.valid;
                        // if(validation)
                        this.addAuthDataHandler();
                        // else
                        //     alert('Email or Password incorrect...')
                    }} >{this.state.isSignup ? `Signup` : `Login`}</button><br />
            <button onClick={this.changeAuthModeHandler}>Switch To {this.state.isSignup ? 'Signin' : 'Signup'}</button>
            </div>
            </React.Fragment>
        )
    }

  
}

// const  token = () => {
//     return {Auth}
// };
const token = (Auth) => {
    return Auth;
};
console.log(`out : `,token());

// export {authtoken};
export default Auth;
// export type MyObject = { };