import React, {Component} from 'react';
import {Table} from 'antd'
import { userServices,config } from '../../lib'

class AdminManage extends Component {
    key = 'adminManager';
    constructor(props) {
        super(props);
        this.state = {
            admin:[],
            table_loading: false,
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
        };
        userServices.getUserList(params).then((ret) => {
            this.setState({ admin: ret.data.user, table_loading: false });
        }).catch((err) => {
            // if (err.response && err.response.status != 404)
            //     config.error('连接超时！');
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
            <div>
                <Table
                        rowKey="id"
                        bordered
                        loading={this.state.table_loading}
                        columns={adminColumns}
                        dataSource={this.state.admin}
                    />
            </div>
        )
    }
}
export default AdminManage;