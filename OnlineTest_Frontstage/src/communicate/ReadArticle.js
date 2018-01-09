import React, { Component } from 'react';
import { Icon, message } from 'antd'
import { HeadImg } from '../homePage'
import Comments from './Comments'
import { communicateServices } from '../lib'
class ReadArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artId: this.props.id,
            title: '',
            author: '',
            content: '',
            createTime: '',
            praiseNum: '',
            trampleNum: '',
            commentNum: '',
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        communicateServices.getArticleById({ artId: this.props.id }).then((ret) => {
            this.setState({
                title: ret.data[0].title, author: ret.data[0].author, content: ret.data[0].content
                , createTime: ret.data[0].createTime, praiseNum: ret.data[0].praiseNum, trampleNum: ret.data[0].trampleNum, commentNum: ret.data[0].commentNum
            })
        }).catch((err) => {

        })
    }
    addArticlePraiseNum(artId) {
        communicateServices.addArticlePraiseNum({ artId: artId }).then((ret) => {
            this.loadData();
            message.success("点赞成功！")
        }).catch((err) => {
            message.error("点赞失败！")
        })
    }
    addArticleTrampleNum(artId) {
        communicateServices.addArticleTrampleNum({ artId: artId }).then((ret) => {
            this.loadData();
            message.success("踩成功！")
        }).catch((err) => {
            message.error("失败！")
        })
    }
    render() {
        return (
            <div style={{ paddingTop: '20px', paddingBottom: '20px', width: '70%',minHeight:'500px', margin: 'auto' }}>
                <div className="article-content-box">
                    <div style={{ paddingBottom: '5px', borderBottom: '1px solid #ccc' }}>
                        <h1 onClick={() => this.props.history.goBack()}>{this.state.title}</h1>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ width: '5%' }}>
                                <HeadImg text='J' />
                            </div>
                            <div style={{ width: '92%' }}>
                                <p >作者：{this.state.author}</p>
                                <p style={{ float: 'left' }}>时间：{this.state.createTime}</p>
                                <span style={{ float: 'right' }}>
                                    <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}
                                        onClick={() => this.addArticlePraiseNum(this.state.praiseNum)}
                                    ><Icon type="like-o" />({this.state.praiseNum})</a>
                                    <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}
                                        onClick={() => this.addArticleTrampleNum(this.state.trampleNum)}><Icon type="dislike-o" />({this.state.trampleNum})</a>
                                    <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}><Icon type="message" />({this.state.commentNum})</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.state.content}
                    </div>
                </div >
                <div style={{ marginTop: '10px', padding: '10px', background: '#fff' }}>
                    <Comments artId={this.state.artId} commentNum={this.state.commentNum} />
                </div>

            </div>

        );
    }
}
export default ReadArticle;