import React, { Component } from 'react';
import { Card, Icon,message } from 'antd';
import { HeadImg } from '../homePage'
import { communicateServices } from '../lib'
import './communicate.css'

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            table_loading: false,
        };
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const params = {
            currentPage: 1
        };
        communicateServices.getArticles(params).then((ret) => {
            this.setState({ articles: ret.data });
            console.log(ret)
        }).catch((err) => {

        });
    }
    AddArticlePraiseNum(artId){
        console.log(artId)
        communicateServices.addArticlePraiseNum({artId:artId}).then((ret)=>{
            console.log(ret)
            this.loadData()
            message.success("点赞成功！")
        }).catch((err)=>{
            console.log(err)
            message.error("点赞失败！")
        })
    }   
    AddArticleTrampleNum(artId){
        
    }
    render() {
        return (
            <div style={{ padding: '20px 0px 10px 0px' }}>
                <Card title={<h2 style={{ fontSize: '17px', fontWeight: '700' }}><Icon type="book" style={{ color: '#FF6547' }} />分享与求助</h2>}
                    extra={<a href="#">我要添加</a>} style={{ paddingTop: '10px', width: '71%', margin: 'auto' }}>
                    {this.state.articles.map((value, index) => {
                        console.log(value)
                        return (
                            <div key={value.id} className="article-box">
                                <HeadImg text='J' style={{ width: '60px', height: '60px' }} />
                                <div className="article-item">
                                    <h2>{value.title}</h2>
                                    <span className="article-label">{value.label}</span>
                                    <span style={{paddingLeft:'10px'}}>{value.author} {value.createTime}</span>
                                    <span style={{ float: 'right' }}>
                                        <a onClick={()=>this.AddArticlePraiseNum(value.id)}><Icon type="like-o" />({value.praiseNum})</a>
                                        <a><Icon type="dislike-o" />({value.trampleNum})</a>
                                        <a><Icon type="message" />({value.commentNum})</a>
                                    </span>
                                </div>

                            </div>
                        )
                    })}
                </Card>
            </div>
        );
    }
}
export default ArticleList;