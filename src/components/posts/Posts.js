import React, { Component } from 'react';
import './Posts.css'

class Posts extends Component{
    // constructor(props){
    //     super(props);
    
    // }

    render(){
        return (
        <div className="Posts" onClick={this.props.clicked}>
            <h2>{this.props.title}</h2>
            <h4>{this.props.auther}</h4>
        </div>
        )
    }
}

export default Posts;