import React, { Component } from 'react';
import { Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { userServices, taskServices } from '../lib'
import './homePage.css';
const Search = Input.Search;
class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            login_btn: '',
        };
    }
    componentWillMount() {
        this.setState({ token: this.props.token })
    }
    sign_out() {
        userServices.sign_out();
        // this.props.history.push('/login');
        window.location.href="/login"
    }
    onChange(value) {
        console.log(value)
        window.location.href="/searchResult/"+value
        // this.props.history.push(`/searchResult/${value}`)
        // const params={
        //     query:value,
        //     currentPage:1
        // }
        // taskServices.searchQue(params).then((ret)=>{

        // }).catch((err)=>{

        // })
    }
    checkUserLogin() {
        if (!this.state.token) {
            return (
                <div className="login_register">
                    <Link to='/login' className="btn login">登录</Link>
                    <Link to='/register' className="btn">注册</Link>
                </div>
            );
        } else {
            return (
                <div className="login_register">
                    <a className="btn">{this.props.user_name}</a>
                    <Link to="/" className="btn" onClick={this.sign_out.bind(this)}>注销</Link>
                </div>
            );
        }
    }
    render() {
        return (
            <header className="header">
                <div className="nav">
                    <div className="nav-bar">
                        <ul>
                            <li><Link to='/'>首页</Link></li>
                            <li><Link to='/tiKu'>题库</Link></li>
                            <li><Link to='/communicate'>讨论区</Link></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Search
                        className="search"
                        placeholder="搜索"
                        style={{ width: 200 }}
                        onSearch={value => this.onChange(value)}
                    />
                    {this.checkUserLogin()}
                </div>
            </header>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.Session.Authorization,
        user_name: state.Session.User.name,
    }
}
Head = connect(mapStateToProps)(Head)
export default Head;