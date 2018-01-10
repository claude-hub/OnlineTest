import React, { Component } from 'react';
import { Form, Input, Card, Icon, Button, message, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Editor from 'react-umeditor'
import { communicateServices } from '../lib'
const { TextArea } = Input;

const FormItem = Form.Item;
class AddArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uId:this.props.uId,
            loading: false,
            title:'',
            label:'',
            content:''
        };
    }
    handleSubmit() {
        const params = {
            uId : this.state.uId,
            title : this.state.title,
            content : this.state.content,
            label : this.state.label
        }
       communicateServices.addArticle(params).then((ret)=>{
           message.success("添加成功，请等待管理员审核！")
       }).catch((err)=>{
           message.error("失败！")
       })
    }

    confirm(e) {
        console.log(e);
        message.success('Click on Yes');
    }

    cancel(e) {
        console.log(e);
        message.error('Click on No');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ padding: '20px 0px 10px 0px' }}>
                <Card title={<h2 style={{ fontSize: '17px', fontWeight: '700' }}><Icon type="edit" style={{ color: '#FF6547' }} />添加文章</h2>}
                    extra={
                        <Popconfirm
                            title="确定要返回吗?"
                            onConfirm={this.confirm}
                            onCancel={this.cancel}
                            okText="Yes"
                            cancelText="No">
                            <Button ><Link to="/communicate">返回讨论区</Link></Button>
                        </Popconfirm>
                        // <Link to="/communicate">返回讨论区</Link>
                    } style={{ width: 300 }}
                    style={{ paddingTop: '10px', width: '71%', margin: 'auto', height: '600px' }}>

                    <div>
                        <Form>
                            <FormItem label="标题：">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入文章标题' }],
                                })(
                                    <Input onChange={value=>this.setState({title: value.target.value})} placeholder="请输入文章标题" />
                                    )}
                            </FormItem>
                            <FormItem label="标签：">
                                {getFieldDecorator('label')(
                                    <Input onChange={value=>this.setState({label: value.target.value})} placeholder="请输入文章标题" />
                                )}
                            </FormItem>
                            <FormItem label="内容：">
                                {getFieldDecorator('contents')(
                                    <TextArea onChange={value=>this.setState({content: value.target.value})} placeholder="请输入文章内容" autosize={{ minRows: 5,maxHeight: 12 }} />
                                )}
                            </FormItem>
                            <FormItem style={{ paddingTop: '10px' }}>
                                <ul style={{ float: 'right' }}>
                                    <li style={{ display: 'inline-block', paddingRight: '10px' }}>
                                        <Popconfirm
                                            title="确定要取消吗?"
                                            onConfirm={this.confirm}
                                            onCancel={this.cancel}
                                            okText="Yes"
                                            cancelText="No">
                                            <Button >取消</Button>
                                        </Popconfirm>
                                    </li>
                                    <li style={{ display: 'inline-block' }}>
                                        <Button onClick={()=>this.handleSubmit()} type="primary" htmlType="submit" loading={this.state.loading}>
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
const mapStateToProps = (state) => {
    return {
        uId: state.Session.User.id
    }
}
AddArticle = connect(mapStateToProps)(AddArticle)
AddArticle = Form.create()(AddArticle);
export default AddArticle;



