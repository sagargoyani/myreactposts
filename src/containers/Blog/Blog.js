import React, { Component } from 'react';
// import axios from 'axios';
// import Posts from '../../components/posts/Posts'
// import Post from '../../components/posts/post/Post'
// import Spinner from '../../components/UI/Spinner/Spinner'
import PostCn from '../PostsCn/PostCn'
import './Blog.css'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import AddPost from '../../components/posts/addPost/AddPost';
import Auth from '../Auth/Auth';
import Logout from '../Logout/Logout';
import {isAuthenticated} from '../Auth/Auth';
// import Input from '../../components/UI/Input/Input'
// import Post from '../../components/posts/post/Post';


class Blog extends Component{
    state = {
        Auth: true,
        token: localStorage.getItem('token')
    }
    render(){
        // console.log(token);
        
        // this.setState((prevState) => {return ({count: prevState.count})})
        console.log('authenticated' + isAuthenticated());
        return(
            
           <div className="blog">
           <header>
               <nav>
                   <ul>
                       <li><NavLink 
                       activeClassName="my-active"
                       activeStyle={{
                           color: 'green'
                       }}
                       to="/posts/" 
                       exact
                       >Posts</NavLink></li>
                       <li><NavLink to={{
                           pathname: "/add-post",
                           hash: '#submit',
                           search: '?QS=true'
                       }} >Add Post</NavLink></li>
                       {isAuthenticated()
                        ? <li><NavLink to={{pathname: "/logout" }} >Logout</NavLink></li>
                        : <li><NavLink to={{pathname: "/auth"}} >Authenticate</NavLink></li>}
                        {/* token === ""
                        ? <li><NavLink to={{pathname: "/logout"}} >Logout</NavLink></li>
                        : <li><NavLink to={{pathname: "/auth"}} >Authenticate</NavLink></li> */}
                        
                        <li>{this.state.count}</li>
                       
                   </ul>
               </nav>
           </header>
            {/* <Post id={this.state.selectedPost} /> */}
            <Switch>
                <Route path="/add-post"
                render={(props) => (
                    isAuthenticated()
                    ? <AddPost />
                    : <Redirect to={{
                        pathname: '/auth',
                        state: { from: props.location }
                    }} />
                )} /> 
                <Route path="/posts/" component={PostCn} />
                <Route path="/logout/" component={Logout} />
                <Route path="/auth/" component={Auth} />
                <Redirect from="/" to="/posts/" />
                <Route render={() => <h1>404 Not Found...</h1>} />
            </Switch>
            </div>
        )
    }
}

export default Blog