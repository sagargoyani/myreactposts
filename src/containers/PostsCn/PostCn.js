import React, { Component } from 'react';
import axios from 'axios';
import isAuthenticated from '../../containers/Auth/Auth'
import Posts from '../../components/posts/Posts'
import Post from '../../components/posts/post/Post'
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner'
// import firebase from 'firebase'

class PostCn extends Component{

    state = {
        posts: [],
        selectedPost: null,
        error: 0,
        loading: false
    }
    componentDidMount () {
        this.setState({loading: true})
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(Response => {
            console.log(Object.values(Response.data));
            const posts = Response.data.slice(0,4);
            // const posts = Object.values(Response.data);
            // console.log('posts : ', posts);
            
            // const UpdatedPosts = posts
            const UpdatedPosts = posts.map(post => {
                return{
                    ...post,
                    auther: 'sagar',
                }
            })
            this.setState({posts: UpdatedPosts, loading: false});
        }).catch((error) => {
            this.setState({error:true, loading:false})
        })
    }
    
    postClickedHandler = (id) => {
        // this.setState({
        //     selectedPost: id
        // })
        // this.props.history.push('/posts/' + id);
        this.props.history.push({pathname : '/posts/' + id});
    }

    render(){
        // var database = firebase.database();
        // console.log(database);
        
        let posts = <h3>Something went wrong...</h3>
        if(!this.state.error){
            if(this.state.loading)
            {posts = <Spinner />}
            else
            {posts = this.state.posts.map(post => {
            return (
                // <Link
                //     to={"/posts" + post.id}
                // >
                <Posts
                    key={post.id} 
                    title={post.title} 
                    clicked={() => { this.postClickedHandler(post.id) }}
                    auther={post.auther}/>
                // </Link>
            );
        })}}
        return(
            isAuthenticated ? 
           <div className="PostCn">
            {posts}
            <Route path={this.props.match.url + '/:id'} component={Post} />
            {/* <Post id={this.state.selectedPost} /> */}
            </div>
            : <Redirect to="/auth" />
        )
    }
}

export default PostCn;