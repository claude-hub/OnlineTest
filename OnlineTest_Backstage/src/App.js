import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Icon, Layout, Menu, Row } from 'antd';
import { Switch, Route, Link } from "react-router-dom";
import ChangePassword from './user/ChangePassword';
import { Recycle, Published, Unpublished, SubjectManage, TitleManage, UserManage, AdminManage } from './manage'
import { services, userServices } from './lib';
import './App.css';

const { Header, Footer, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            selectedKeys: [],
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

    selectKeys = (key) => {
        this.setState({ selectedKeys: [key] })
    }

    sign_out() {
        userServices.sign_out();
        this.props.history.push('/login');
    }

    render() {
        return (
            <Layout
                style={{ height: '100%' }}
            >
                <ChangePassword visible={this.state.visible} cancel={() => this.setState({ visible: false })} />
                <Sider
                    trigger={null}
                    collapsible
                >
                    <div className="logo">在线答题</div>
                    <Menu
                        theme="dark"
                        selectedKeys={this.state.selectedKeys}
                        mode="inline"
                        defaultOpenKeys={['user']}
                        defaultSelectedKeys="['userManager']"
                    >
                        <SubMenu key="user" title={<span><Icon type="team" /><span>用户管理</span></span>}>
                            <Menu.Item key="userManager">
                                <Link to={`/userManager`}><Icon type="user" />普通用户</Link>
                            </Menu.Item>
                            <Menu.Item key="adminManager">
                                <Link to={`/adminManager`}><Icon type="solution" />管理员</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="questions" title={<span><Icon type="exception" /><span>题库管理</span></span>}>
                            <Menu.Item key="subjectManager">
                                <Link to={`/subjectManager`}><Icon type="printer" />科目管理</Link>
                            </Menu.Item>
                            <Menu.Item key="titleManager">
                                <Link to={`/titleManager`}><Icon type="database" />题目管理</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="forum" title={<span><Icon type="message" /><span>论坛管理</span></span>}>
                            <Menu.Item key="published">
                                <Link to={`/published`}><Icon type="file-text" />已发布文章</Link>
                            </Menu.Item>
                            <Menu.Item key="unpublished">
                                <Link to={`/unpublished`}><Icon type="file" />未发布文章</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="recycle">
                            <Link to={`/recycle`}><Icon type="delete" />回收站</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header>
                        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', overflow: 'hidden' }}>
                            <SubMenu
                                style={{ float: 'right', marginRight: '40px' }}
                                title={<span><Icon type="user" />{this.props.user_name}</span>}>
                                <Menu.Item key="changePassword">
                                    <a onClick={() => { this.setState({ visible: true }) }}><Icon type="key" />修改密码</a>
                                </Menu.Item>
                                <Menu.Item key="logout">
                                    <a onClick={this.sign_out.bind(this)}><Icon type="logout" />退出登录</a>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Content style={{ background: '#fff', margin: '15px 24px', minHeight: 280 }}>
                        <Switch>
                            <Route path="/recycle"
                                render={(props) => <Recycle popKey={this.selectKeys} {...props} />} />
                            <Route path="/unpublished"
                                render={(props) => <Unpublished popKey={this.selectKeys} {...props} />} />
                            <Route path="/published"
                                render={(props) => <Published popKey={this.selectKeys} {...props} />} />
                            <Route path="/titleManager"
                                render={(props) => <TitleManage popKey={this.selectKeys} {...props} />} />
                            <Route path="/subjectManager"
                                render={(props) => <SubjectManage popKey={this.selectKeys} {...props} />} />
                            <Route path="/adminManager"
                                render={(props) => <AdminManage popKey={this.selectKeys} {...props} />} />
                            <Route path="/userManager"
                                render={(props) => <UserManage popKey={this.selectKeys} {...props} />} />
                            <Route path="/"
                                render={(props) => <UserManage popKey={this.selectKeys} {...props} />} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', backgroundColor: '#fafafa' }}>
                        在线答题 ©2017 Powered by Joy
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Session.Token,
        user_name: state.Session.User.name,
        job: state.Session.User.job
    }
}
App = connect(mapStateToProps)(App)

export default App;