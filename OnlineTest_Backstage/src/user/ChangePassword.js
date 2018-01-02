import React from "react";
import {Button, Form as AForm, Input, message, Modal, Spin} from "antd";
import PropTypes from "prop-types";
import {userServices} from '../lib';

const FormItem = AForm.Item;

class ChangePassword extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
    };

    static defaultProps = {
        visible: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            submitting: false
        }
    }

    handleSubmit(e) {
        if (!!e) e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!!err) return;
            this.setState({submitting: true});
            userServices.changePassword(values).then(ret => {
                this.setState({submitting: false});
                message.success('密码修改成功， 请重新登录');
                this.props.cancel();
                userServices.sign_out();
                this.props.history.push('/login');
            }).catch(ret => {
                this.setState({submitting: false});
                if (ret.response && ret.response.data.error_description)
                    message.error(ret.response.data.error_description);
            });
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const form = this.props.form.getFieldsValue();
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Modal title="修改密码" visible={this.props.visible} width={500} footer={false}
                   onCancel={() => this.props.cancel()}>
                <Spin spinning={this.state.loading} tip="努力拉取中..." delay={200}>
                    <AForm onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label="原密码" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(
                                <Input placeholder="原始密码为你的手机号码" type="password" maxLength="20"/>
                            )}
                        </FormItem>
                        <FormItem label="新密码" {...formItemLayout}>
                            {getFieldDecorator('new_password', {
                                rules: [{
                                    required: true,
                                    message: '密码至少8个字符',
                                    min: 8
                                }],
                            })(
                                <Input placeholder="请输入新密码, 最长20位" type="password" maxLength="20"/>
                            )}
                        </FormItem>
                        <FormItem label="确认新密码" {...formItemLayout}>
                            {getFieldDecorator('repeat_password', {
                                rules: [{required: true, message: '不能为空'}, {
                                    validator: (rule, value, callback) => {
                                        if (value && value !== form.new_password)
                                            callback('两次密码输入不一致！');
                                        else
                                            callback()
                                    }
                                }],
                            })(
                                <Input placeholder="为了保证你第一次密码输入正确，请再次输入" type="password" maxLength="20"/>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{xs: {span: 24, offset: 0,}, sm: {span: 14, offset: 6,}}}>
                            <Button type="primary" htmlType="submit" size="large"
                                    loading={this.state.submitting}>提交</Button>
                        </FormItem>
                    </AForm>
                </Spin>
            </Modal>
        )
    }
}

ChangePassword = AForm.create()(ChangePassword);

export default ChangePassword;