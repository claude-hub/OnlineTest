import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button, message } from 'antd';
import { userServices } from './lib';
import './Login.css';

const FormItem = Form.Item;
class Register extends React.Component {

    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                userServices.register(values).then((ret) => {
                    message.success("注册成功，请前往登录！")
                    window.location.href = "/login"
                }).then((err) => {
                    message.error(err)
                })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <div style={{ width: '50%', margin: 'auto',paddingTop: '10%' }}>
                <p style={{
                    textAlign: 'center',paddingBottom:'10px'
                }}>用户注册</p>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="账号"
                        hasFeedback
                    >
                        {getFieldDecorator('account', {
                            rules: [{
                                type: 'email', message: '请输入有效的邮箱地址!',
                            }, {
                                required: true, message: '请使用邮箱注册!',
                            }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="昵称"
                        hasFeedback
                    >
                        {getFieldDecorator('nikename', {
                            rules: [{ required: true, message: '请输入您的昵称!', whitespace: true }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入你的密码!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password" />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请重复输入您的密码!',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button className="login-form-button" type="primary" htmlType="submit">注册</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

Register = Form.create()(Register);
export default Register;