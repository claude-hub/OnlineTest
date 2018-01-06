import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import Head from './Head'
import Carousels from './Carousels'
import './homePage.css';

const { Header, Content, Footer } = Layout;

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout className="layout">
                <Header
                    style={{ lineHeight: '40px' ,height:'40px',background:'#3d444c'}}>
                    <Head />
                </Header>
                <Content>
                    <Carousels />
                </Content>
            </Layout>
        );
    }
}

export default HomePage;