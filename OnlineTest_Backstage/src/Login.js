import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import {userServices} from './lib';

import './Login.css';

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                userServices.sign_in(values).then((res) => {
                    this.setState({loading: false})
                    this.props.history.replace('/');
                    message.success("登录成功！")
                }).catch((err) => {
                    this.setState({loading: false})
                    message.error("登录失败！");
                });
                // userServices.sign_in(values).then((res) => {
                //     this.setState({loading: false})
                //     this.props.history.replace('/');
                //     message.success("登录成功！")
                // }).catch((err) => {
                //     this.setState({loading: false})
                //     message.error("登录失败！");
                // });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-form">
                <div>
                    <p>用户登录</p>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('account', {
                            rules: [{required: true, message: '请输入您的用户名'}],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入您的密码！'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}
                                className="login-form-button">
                            登 录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

Login = Form.create()(Login);
export default Login;
