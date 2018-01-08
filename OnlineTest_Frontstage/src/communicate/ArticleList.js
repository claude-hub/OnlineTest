import React, { Component } from 'react';
import { Card, Icon, message, Pagination } from 'antd';
import { HeadImg } from '../homePage'
import { communicateServices } from '../lib'
import './communicate.css'

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            total: 0,
            currentPage:1,
            pageSize:1
        };
    }
    componentDidMount() {
        this.loadData(this.state.currentPage,this.state.pageSize);
        this.props.id;
    }
    
    addArticlePraiseNum(artId) {
        communicateServices.addArticlePraiseNum({ artId: artId }).then((ret) => {
            this.loadData(this.state.currentPage,this.state.pageSize);
            message.success("点赞成功！")
        }).catch((err) => {
            message.error("点赞失败！")
        })
    }
    addArticleTrampleNum(artId) {
        communicateServices.addArticleTrampleNum({ artId: artId }).then((ret) => {
            this.loadData(this.state.currentPage,this.state.pageSize);
            message.success("踩成功！")
        }).catch((err) => {
            message.error("失败！")
        })
    }
    getPrePageArticles(){
        // this.setState({currentPage:this.state.currentPage--})
        // this.loadData()
    }
    getNextPageArticle(){
        // this.setState({currentPage:this.state.currentPage++})
        // this.loadData()
    }
    onChange(page,pageSize){
        console.log(page,pageSize);
        this.loadData(page,pageSize)
    }
    onShowSizeChange(page, pageSize){
        console.log(page, pageSize);
        this.loadData.bind(page,pageSize)
    }

    loadData(currentPage,pageSize) {
        const params = {
            currentPage: currentPage,
            pageSize: pageSize
        };
        console.log(this.state.currentPage)
        communicateServices.getArticles(params).then((ret) => {
            this.setState({ articles: ret.data.arts, total: ret.data.count });
        }).catch((err) => {
            message.error("获取数据失败！")
        });
    }
    render() {
        return (
            <div style={{ padding: '20px 0px 10px 0px' }}>
                <Card title={<h2 style={{ fontSize: '17px', fontWeight: '700' }}><Icon type="book" style={{ color: '#FF6547' }} />分享与求助</h2>}
                    extra={<a className="add-btn" href="#"><Icon style={{ paddingRight: '5px' }} type="edit" />我要添加</a>}
                    style={{ paddingTop: '10px', width: '71%', margin: 'auto' }}>
                    {this.state.articles.map((value, index) => {
                        return (
                            <div key={value.id} className="article-box">
                                <HeadImg text='J' style={{ width: '60px', height: '60px' }} />
                                <div className="article-item"
                                    
                                >
                                    <h2>{value.title}</h2>
                                    <span className="article-label">{value.label}</span>
                                    <span style={{ paddingLeft: '10px' }}>{value.author}</span>
                                    <span style={{ paddingLeft: '5px' }}> {value.createTime}</span>
                                    <span style={{ float: 'right' }}>
                                        <a style={{ paddingLeft: '10px', color: '#000' }}
                                            onClick={() => this.addArticlePraiseNum(value.id)}
                                        ><Icon type="like-o" />({value.praiseNum})</a>
                                        <a style={{ paddingLeft: '10px', color: '#000' }}
                                            onClick={() => this.addArticleTrampleNum(value.id)}><Icon type="dislike-o" />({value.trampleNum})</a>
                                        <a style={{ paddingLeft: '10px', color: '#000' }}><Icon type="message" />({value.commentNum})</a>
                                    </span>
                                </div>

                            </div>
                        )
                    })}
                    <ul className="page-nation">
                        <li><a onClick={()=>this.getPrePageArticles()}><Icon type="left" />上一页</a></li>
                        <li><a onClick={()=>this.getNextPageArticle()}>下一页<Icon type="right" /></a></li>
                    </ul>
                    <Pagination
                    defaultPageSize={1}
                    size="small" total={this.state.total} 
                    onChange={this.onChange}
                    showSizeChanger 
                    showQuickJumper
                    onShowSizeChange={this.onShowSizeChange}/>
                </Card>
            </div>
        );
    }
}
export default ArticleList;