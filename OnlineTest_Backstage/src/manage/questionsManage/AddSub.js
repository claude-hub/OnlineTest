import React, { Component } from 'react';
import { Form, Modal, Button, Input, Switch, message, Select, Icon } from 'antd';
import { questionServices, config } from '../../lib'
const Option = Select.Option
const FormItem = Form.Item
class AddSub extends Component {
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
                this.setState({ submitting: true });
                questionServices.addSub(values).then(ret => {
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
                title='新增科目'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="科目名称" {...formItemLayout}>
                        {getFieldDecorator('subjectName', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="科目名称" maxLength="20" />
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
AddSub = Form.create()(AddSub);
export default AddSub;