// import React, {Component} from 'react';

const Logout = (props) => {
    if(localStorage.getItem('token'))
        localStorage.removeItem('token');
    props.history.replace('/posts/');
    return null;
    
}
// class Logout extends Component{
//     constructor(props){
//         super(props);
//     }
// }

export default Logout;