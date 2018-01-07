import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route} from "react-router-dom";
import { Head, Foot, HomePage } from './homePage'
import {ArticleList} from './communicate'
import './App.css'

const { Header, Content, Footer } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout className="layout">
                <Header
                    style={{ lineHeight: '40px', height: '40px', background: '#3d444c' }}>
                    <Head />
                </Header>
                <Content>
                    <Switch>
                        <Route path="/communicate"
                            render={(props) => <ArticleList popKey={this.selectKeys} {...props} />} />

                        <Route path="/"
                            render={(props) => <HomePage popKey={this.selectKeys} {...props} />} />
                    </Switch>
                </Content>
                <Footer style={{ background: "rgb(61,68,76)", textAlign: 'center' }}>
                    <Foot />
                </Footer>
            </Layout>
        );
    }
}
export default App;