import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import Head from './Head'
import Carousels from './Carousels'
import TypeTab from './TypeTab'
import SpecialExerciseTab from './SpecialExerciseTab'
import Foot from './Foot'
import './homePage.css';

const { Header, Content, Footer } = Layout;

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Carousels />
                <TypeTab />
                <SpecialExerciseTab />
            </div>
        );
    }
}

export default HomePage;