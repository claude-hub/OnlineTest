import React, { Component } from 'react';
import { Table, Input, Button } from 'antd'
import { userServices, config } from '../../lib'

class UserManage extends Component {
    key = 'userManager';
    constructor(props) {
        super(props);
        this.state = {
            common_user: [],
            table_loading: false,
            query: ''
        };
    }
    componentWillMount() {
        this.props.popKey(this.key);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        this.setState({ table_loading: true });
        const params = {
            status: "Common",
            currentPage: 1,
            pageSize: 20,
            query: this.state.query
        };
        userServices.getUserList(params).then((ret) => {
            this.setState({ common_user: ret.data.user, table_loading: false });
        }).catch((err) => {
            config.error('连接超时！');
            this.setState({ table_loading: false });
        });
    }
    render() {
        const commonColumns = [{
            title: '账号',
            dataIndex: 'account',
        }, {
            title: '昵称',
            dataIndex: 'name',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
        }, {
            title: '操作',
            dataIndex: "action",
            render: (text, record, index) =>
                (
                    <a href="javascript:void(0)">查看</a>
                ),
        }]
        return (
            <div style={{ margin: '20px 40px' }}>
                <h1
                    style={{ marginBottom: '20px' }}
                >普通用户</h1>
                <Input
                    size="large"
                    placeholder="账号/昵称"
                    onChange={(value) => this.setState({ query: value.target.value })}
                    style={{ width: '200px', marginRight: '20px' }}
                    onPressEnter={() => this.loadData()}
                />
                <Button icon="search" type="primary" onClick={() => this.loadData()}>搜索</Button>
                <Table
                    style={{ marginTop: '20px' }}
                    rowKey="id"
                    bordered
                    loading={this.state.table_loading}
                    columns={commonColumns}
                    dataSource={this.state.common_user}
                />
            </div>
        )
    }
}
export default UserManage;