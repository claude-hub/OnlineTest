import React, { Component } from 'react';
import { Form, Modal, Button, Input, Switch, message, Select, Icon } from 'antd';
import { userServices, config } from '../../lib'
const Option = Select.Option
const FormItem = Form.Item
class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            nickname: '',
            visible: '',
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.repeat_password!=values.password){
                    config.error("两次密码不一样!");
                    return;
                }
                this.setState({ submitting: true });
                userServices.addAdmin(values).then(ret => {
                    this.setState({ submitting: false });
                    this.props.onCancel();
                    config.success("添加成功!");
                    this.props.loadData();
                }).catch(ret => {
                    console.log(ret)
                    config.error("邮箱不正确!");
                    this.setState({ submitting: false });
                });
            }
        });
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
        return (
            <Modal
                title='新增管理员'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="账号" {...formItemLayout}>
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="账号" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="昵称" {...formItemLayout}>
                        {getFieldDecorator('nickname', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="昵称" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="密码" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('repeat_password', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="确认密码" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem wrapperCol={{ xs: { span: 24, offset: 0, }, sm: { span: 14, offset: 6, } }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.submitting}>确认
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
AddAdmin = Form.create()(AddAdmin);
export default AddAdmin;