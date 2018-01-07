import React, { Component } from 'react';

const tabImg1 = require('../images/typeTab1.png');
const tabImg2 = require('../images/typeTab2.png');
const tabImg3 = require('../images/typeTab3.png');
const tabImg4 = require('../images/typeTab4.png');
class TypeTab extends Component{

    render(){
        return(
            <div className="type-tab">
                <ul>
                    <li>
                        <a>
                            <img src={tabImg1}/>
                            <h2>针对性专项练习</h2>
                        </a>
                    </li>
                    <li>
                        <a>
                            <img src={tabImg2}/>
                            <h2>仿真模拟考试</h2>
                        </a>
                    </li>
                    <li>
                        <a>
                            <img src={tabImg3}/>
                            <h2>错题专练</h2>
                        </a>
                    </li>
                    <li>
                        <a>
                            <img src={tabImg4}/>
                            <h2>以题会友，涨姿势交朋友</h2>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
export default TypeTab;