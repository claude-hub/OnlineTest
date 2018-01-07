import React, { Component } from 'react';

class HeadImg extends Component {

    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="user-img">
                <h1>{this.props.text}</h1>
            </div>
        );
    }
}
export default HeadImg;