import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route } from "react-router-dom";
import { Head, Foot, HomePage,SearchResult } from './homePage'
import { ArticleList, AddArticle, ReadArticle } from './communicate'
import { UserPage } from './user'
import { TiKu, TaskPage } from './task'
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
                        <Route path="/tiku"
                            render={(props) => <TiKu popKey={this.selectKeys}{...props} />} />
                        <Route path="/taskPage/:subId/:queClass"
                            render={(props) => <TaskPage 
                            id={props.match.params.subId} 
                            queClass={props.match.params.queClass}
                            popKey={this.selectKeys}{...props} />} />
                        <Route path="/searchResult/:query"
                             render={(props) => <SearchResult query={props.match.params.query} popKey={this.selectKeys}{...props} />} />
                        <Route path="/communicate"
                            render={(props) => <ArticleList popKey={this.selectKeys} {...props} />} />
                        <Route path="/addArticle"
                            render={(props) => <AddArticle popKey={this.selectKeys}{...props} />} />
                        <Route path="/userPage"
                            render={(props) => <UserPage popKey={this.selectKeys} {...props} />} />

                        <Route path="/readArticle/:id"
                            render={(props) => <ReadArticle id={props.match.params.id} popKey={this.selectKeys}{...props} />} />
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