import React, { Component } from 'react';
import { Table, Icon, Pagination } from 'antd';
import { Link } from "react-router-dom";
import { userServices, taskServices, communicateServices } from '../lib'
class MyArticle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uId: this.props.uId,
      articleList: [],
      currentPage: 1,
      articleCount: 0,
    }
  }
  componentDidMount() {
    this.loadData()
  }
  loadData() {
    const params = {
      uId: this.state.uId,
      currentPage: this.state.currentPage
    }
    communicateServices.getArticleListByUser(params).then((ret) => {
        console.log(ret.data)
      this.setState({ articleList: ret.data.artList, articleCount: ret.data.count })
      console.log(this.state.articleList)
    }).catch((err) => { })
  }
  onChange(page, pageSize) {
    this.setState({ currentPage: page }, () => this.loadData())
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'title',
      render: (text, record, index) =>(<Link to={'/readArticle/'+record.id}>{text}</Link>) ,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
    },{
        titlt:'状态',
        dataIndex:'isPublish'
    }];
    return (
      <div style={{ padding: '20px' }}>
        <Table
          rowKey='id'
          columns={columns}
          pagination={false}
          dataSource={this.state.articleList}
        />
        <Pagination
          style={{ textAlign: 'right',padding:'10px 0px 0px 0px' }}
          defaultPageSize={8}
          defaultCurrent={1} total={this.state.articleCount}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}
export default MyArticle;