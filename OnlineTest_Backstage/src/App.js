import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Icon, Layout, Menu, Row, Breadcrumb} from 'antd';
import {Switch, Route, Link} from "react-router-dom";
import ChangePassword from './user/ChangePassword';
import UserManage from './manage/userManage/UserManage.js';
import {services, userServices} from './lib';
import './App.css';

const {Header, Footer, Content, Sider} = Layout;

class App extends Component {
    moduleName = '信息管理';

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            selectedKeys: [],
            breadcrumbTitle: ''
        };
    }

    componentWillMount() {
        this.isAuthenticated();
    }

    isAuthenticated() {
        let token = this.props.token;
        if (!token) {
            this.props.history.push('/login');
            return;
        }
    }

    selectKeys = (key, title) => {
        this.setState({selectedKeys: [key], breadcrumbTitle: title})
    }

    sign_out() {
        userServices.sign_out();
        this.props.history.push('/login');
    }

    render() {
        return (
            <Layout style={{height: '100vh', backgroundColor: '#fafafa'}}>
                <ChangePassword visible={this.state.visible} cancel={() => this.setState({visible: false})}/>
                <Header className="header">
                    <Row type="flex" className="main-menu-container">
                        <Col span="18" className="business-menu">
                            <div className="logo">在线答题</div>
                        </Col>
                        <Col className="profile-bar">
                            <Menu theme="dark" mode="horizontal" style={{lineHeight: '64px'}}>
                                <Menu.SubMenu key="profile"
                                              title={<span><Icon type="user"/>{this.props.user_name}</span>}>
                                    <Menu.Item key="changePassword">
                                        <a onClick={() => {this.setState({visible:true})}}><Icon type="key"/>修改密码</a>
                                    </Menu.Item>
                                    <Menu.Item key="logout">
                                        <a onClick={this.sign_out.bind(this)}><Icon type="logout"/>退出登录</a>
                                    </Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        padding: '0 50px', backgroundColor: '#fafafa'
                    }}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>
                            {this.moduleName}
                        </Breadcrumb.Item>
                        {this.state.breadcrumbTitle ?
                            <Breadcrumb.Item>
                                {this.state.breadcrumbTitle}
                            </Breadcrumb.Item> : null}
                    </Breadcrumb>
                    <Layout style={{padding: '24px 0', background: '#fff'}}>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                style={{height: '100%'}}
                                selectedKeys={this.state.selectedKeys}
                                mode="inline"
                            >
                                <Menu.Item key="userManager">
                                    <Link to={`/userManager`}><Icon type="solution"/>用户管理</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '15px 24px', minHeight: 280}}>
                            <Switch>
                                <Route path="/userManager"
                                       render={(props) => <UserManage popKey={this.selectKeys} {...props}/>}/>
                                <Route path="/"
                                       render={(props) => <UserManage popKey={this.selectKeys} {...props}/>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center', backgroundColor: '#fafafa'}}>
                    在线答题 ©2017 Powered by Joy
                </Footer>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Session.Token,
        user_name: state.Session.User.name,
        job:state.Session.User.job
    }
}
App = connect(mapStateToProps)(App)

export default App;
