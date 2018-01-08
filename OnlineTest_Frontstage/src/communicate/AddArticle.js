import React, { Component } from 'react';
import { Form, Input, Card, Icon, Button, message } from 'antd';
import { Link } from "react-router-dom";
import Editor from 'react-umeditor'
import { communicateServices } from '../lib'

const FormItem = Form.Item;
class AddArticle extends Component {

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
                communicateServices.addArticle(values).then((res) => {
                    this.setState({loading: false})
                    this.props.history.replace('/communicate');
                    message.success("添加成功，请等待管理员审核！")
                }).catch((err) => {
                    this.setState({loading: false})
                    message.error("添加失败！");
                });
            }
        });
    }
    handleChange(content) {
        this.setState({
            content: content
        })
    }
    getIcons() {
        var icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | superscript subscript | ",
            "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
            "horizontal date time  | image emotion spechars | inserttable"
        ]
        return icons;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var icons = this.getIcons();
        console.log(icons)
        return (
            <div style={{ padding: '20px 0px 10px 0px' }}>
                <Card title={<h2 style={{ fontSize: '17px', fontWeight: '700' }}><Icon type="edit" style={{ color: '#FF6547' }} />添加文章</h2>}
                    extra={<Link to="/communicate">返回讨论区</Link>} style={{ width: 300 }}
                    style={{ paddingTop: '10px', width: '71%', margin: 'auto', height: '600px' }}>

                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="标题：">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入文章标题' }],
                                })(
                                    <Input placeholder="请输入文章标题" />
                                    )}
                            </FormItem>
                            <FormItem label="标签：">
                                {getFieldDecorator('label')(
                                    <Input placeholder="请输入文章标题" />
                                )}
                            </FormItem>
                            <FormItem label="内容：">
                                {getFieldDecorator('contents')(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem style={{ paddingTop: '10px' }}>
                                <ul style={{ float: 'right' }}>
                                    <li style={{ display: 'inline-block', paddingRight: '10px' }}><Button >取消</Button></li>
                                    <li style={{ display: 'inline-block' }}>
                                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                            确认
                                        </Button>
                                    </li>
                                </ul>


                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        );
    }
}
AddArticle = Form.create()(AddArticle);
export default AddArticle;



