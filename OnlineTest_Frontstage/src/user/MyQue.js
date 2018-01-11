import React, { Component } from 'react';
import { Table, Icon, Pagination } from 'antd';
import { userServices, taskServices, communicateServices } from '../lib'
class MyQue extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uId: this.props.uId,
      paperList: [],
      currentPage: 1,
      paperCount: 0,
      pageSize: 1,
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
    taskServices.getPaperListByUser(params).then((ret) => {
      this.setState({ paperList: ret.data.paperList, paperCount: ret.data.count })
    }).catch((err) => { })
  }
  onChange(page, pageSize) {
    this.setState({ currentPage: page }, () => this.loadData())
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
    }, {
      title: '正确率',
      dataIndex: 'accuracy',
    }];
    return (
      <div style={{ padding: '20px' }}>
        <Table
          rowKey='id'
          columns={columns}
          pagination={false}
          dataSource={this.state.paperList}
        />
        <Pagination
          style={{ float: 'right',padding:'10px 0px 20px 0px' }}
          defaultPageSize={8}
          defaultCurrent={1} total={this.state.paperCount}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}
export default MyQue;