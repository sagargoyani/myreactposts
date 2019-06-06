import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner'
import axios from 'axios';
import './Post.css'

class Post extends Component{
    // constructor(props){
    //     super(props);
    // }

    state = {
        selectedPost: null,
    }

    componentWillMount () {
        this.dataload();
    }

    componentDidUpdate () {
        this.dataload();
    }

    dataload = () => {
        if(this.props.match.params.id || (this.state.selectedPost && this.state.selectedPost.id !== +this.props.match.params.id)){
            if(!this.state.selectedPost || (this.state.selectedPost && this.state.selectedPost.id !== +this.props.match.params.id)){
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
                .then(Response => {
                    console.log("response : ", Response.data);
                    
                    this.setState({
                        selectedPost: Response.data
                    })
                })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
        .then((Response) => {
            console.log(Response);
        });
    }

    render(){
        console.log(this.props.match.params.id);

        let Post = <h3>Please Select a Post..</h3>;
        if(!this.state.selectedPost && this.state.selectedPost !== {}){
            Post = <Spinner />;
        }
        if(this.state.selectedPost && this.state.selectedPost.id === +this.props.match.params.id){
            Post = (<div className="Post">
                        <h3>{this.state.selectedPost.title}</h3>
                        <p>{this.state.selectedPost.body}</p>
                        <button onClick={this.deletePostHandler}>Delete</button>
                    </div>)
        }
        return(
            <React.Fragment>
            {Post}
            {/* <h1>post selected</h1> */}
            </React.Fragment>
        )
    }
}

export default Post;