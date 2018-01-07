import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd'
import { userServices, config } from '../../lib'
import AddAdmin from './AddAdmin';

class AdminManage extends Component {
    key = 'adminManager';
    constructor(props) {
        super(props);
        this.state = {
            admin: [],
            table_loading: false,
            query: '',
            add_modal: false,
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
            status: "Admin",
            currentPage: 1,
            pageSize: 20,
            query: this.state.query
        };
        userServices.getUserList(params).then((ret) => {
            this.setState({ admin: ret.data.user, table_loading: false });
        }).catch((err) => {
            config.error('连接超时！');
            this.setState({ table_loading: false });
        });
    }
    render() {
        const adminColumns = [{
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
                >管理员</h1>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div>
                        <Input
                            size="large"
                            placeholder="账号/昵称"
                            onChange={(value) => this.setState({ query: value.target.value })}
                            style={{ width: '200px', marginRight: '20px' }}
                            onPressEnter={() => this.loadData()}
                        />
                        <Button icon="search" type="primary" onClick={() => this.loadData()}>搜索</Button>
                    </div>
                    <Button type="primary" onClick={() => this.setState({ add_modal: true })}><Icon type="plus" />新增管理员</Button>
                </div>
                <Table
                    style={{ marginTop: '20px' }}
                    rowKey="id"
                    bordered
                    loading={this.state.table_loading}
                    columns={adminColumns}
                    dataSource={this.state.admin}
                />
                <AddAdmin
                    visible={this.state.add_modal}
                    onCancel={() => this.setState({ add_modal: false })}
                    loadData={() => this.loadData()}
                    {...this.state}
                />
            </div>
        )
    }
}
export default AdminManage;