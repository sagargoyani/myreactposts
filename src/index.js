import React from 'react';
import ReactDOM from 'react-dom';
import './containers/index.css';
import App from './containers/App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// axios.defaults.headers.common['Authentication'] = 'Auth TOKEN';
// axios.defaults.headers.post['Authentication'] = 'A TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(Request => {
    console.log(Request);
    return Request;
},error => {
    console.log(error);
    return Promise.reject(error);
    
});

axios.interceptors.response.use(Response => {
    console.log(Response);
    return Response;
},error => {
    console.log(error);
    return Promise.reject(error);
})


ReactDOM.render(<App />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
