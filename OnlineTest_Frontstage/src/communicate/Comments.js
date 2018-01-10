import React, { Component } from 'react';
import { Input, Button, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { communicateServices } from '../lib'
import { HeadImg } from '../homePage'
import './communicate.css'

const { TextArea } = Input;
class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artId: this.props.artId,
            uId: this.props.uId,
            replyBox:'none',
            commentNum: 0,
            commentConent: '',
            rows: 2,
            commentData: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ commentNum: nextProps.commentNum })
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        communicateServices.getArticleComment({ artId: this.state.artId }).then((ret) => {
            console.log(99999)
            console.log(ret.data)
            this.setState({ commentData: ret.data })
        }).catch((err) => {

        });
    }
    changeRow() {
        this.setState({ rows: 3 })
    }

    addComPraiseNum(comId) {
        communicateServices.addComPraiseNum({ comId: comId }).then((ter) => {
            this.loadData()
            message.success("成功！")
        }).catch((err) => {
            message.error("失败！")
        });
    }
    addComTrampleNum(comId) {
        communicateServices.addComTrampleNum({ comId: comId }).then((ter) => {
            this.loadData()
            message.success("成功！")
        }).catch((err) => {
            message.error("失败！")
        });
    }
    onSubmit() {
        if (!this.state.uId) {
            this.props.history.push('/login')
        } else {
            const params = {
                uId: this.state.uId,
                artId: this.state.artId,
                content: this.state.commentConent
            }
            communicateServices.commentArticle(params).then((ret) => {
                this.loadData()
                message.success("评论成功！")
            }).catch((err) => {
                message.error("评论失败！")
            })
        }
    }
    onReply(parentId){
        console.log(8888)
        console.log(parentId)
        if (!this.state.uId) {
            this.props.history.push('/login')
        } else {
            const params = {
                uId: this.state.uId,
                artId: this.state.artId,
                parentId:parentId,
                content: this.state.commentConent
            }
            communicateServices.replyComment(params).then((ret) => {
                this.loadData()
                message.success("评论成功！")
            }).catch((err) => {
                message.error("评论失败！")
            })
        }
    }
    render() {
        return (
            <div >
                <div style={{ display: 'flex', paddingBottom: '10px', justifyContent: 'flex-start', borderBottom: '1px solid #ccc' }}>
                    <h1 style={{ fontWeight: '600', paddingRight: '5px' }}>{this.state.commentNum}条评论</h1>
                    <div style={{ width: '88%' }}>
                        <TextArea
                            style={{ float: 'left', width: '90%', borderRadius: '0px' }}
                            rows={this.state.rows}
                            onChange={(obj) => this.setState({ commentConent: obj.target.value })}
                            onClick={() => this.changeRow()} />
                        <Button
                            type="primary"
                            onClick={() => this.onSubmit()}
                            style={{ float: 'right', width: '10%', height: '100%', borderRadius: '0px' }} >评论</Button>
                    </div>
                </div>
                <div style={{ paddingTop: '10px' }}>
                    {this.state.commentData.map((item, index) => {
                        return (
                            <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '5px 0px', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                <div>
                                    <HeadImg text='J' />
                                </div>
                                <div style={{ paddingLeft: '10px', width: '92%' }}>
                                    <p style={{ fontWeight: '600' }}>{item.parentName == "" ? item.userName : item.userName + " 回复：" + item.parentName}</p>
                                    <p>{item.content}</p>
                                    <p style={{ float: 'left' }}> {item.createTime}</p>
                                    <span style={{ float: 'right' }}>
                                        <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}
                                            onClick={() => this.addComPraiseNum(item.id)}
                                        ><Icon type="like-o" />({item.praiseNum})</a>
                                        <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}
                                            onClick={() => this.addComTrampleNum(item.id)}><Icon type="dislike-o" />({item.trampleNum})</a>
                                        <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}><Icon type="message" /></a>
                                    </span>
                                    <div style={{display:this.state.replyBox, width: '100%',paddingTop:'15px' }}>
                                        <TextArea
                                            style={{ float: 'left', width: '90%', borderRadius: '0px' }}
                                            rows={1}
                                            onChange={(obj) => this.setState({ commentConent: obj.target.value })}
                                            />
                                        <Button
                                            type="primary"
                                            onClick={() => this.onReply(item.id)}
                                            style={{ float: 'right', width: '10%',  borderRadius: '0px' }} >回复</Button>
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        uId: state.Session.User.id
    }
}
Comments = connect(mapStateToProps)(Comments)
export default Comments;