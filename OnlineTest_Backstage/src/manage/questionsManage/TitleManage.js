import React, { Component } from 'react';
import {questionServices,config} from '../../lib'
import { Table, Input, Button, Icon } from 'antd'
import AddSub from './AddSub'
class TitleManage extends Component {
    key = 'titleManager';
    constructor(props) {
        super(props);
        this.state = {
            table_loading: false,
            query: '',
            add_modal: false,
            subjects:[],
        }
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
            currentPage: 1,
            pageSize: 20,
            query: this.state.query
        };
        questionServices.getQueList(params).then((ret) => {
            console.log(ret)
            this.setState({ subjects: ret.data.ques, table_loading: false });
        }).catch((err) => {
            config.error('连接超时！');
            this.setState({ table_loading: false });
        });
    }
    
    render() {
        const columns = [{
                    title: '所属科目',
                    dataIndex: 'subName',
                    key: 'subName',
                },{
                    title: '题目',
                    dataIndex: 'queName',
                    key: 'queName',
                },{
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type',
                },{
                    title: '难度',
                    dataIndex: 'grade',
                    key: 'grade',
                },{
                    title: '正确选择',
                    dataIndex: 'rightAnswer',
                    key: 'rightAnswer',
                },{
                    title: '操作',
                    dataIndex: "action",
                    render: (text, record, index) =>
                        (
                            <a href="javascript:void(0)">查看</a>
                        ),
                }
            ]
        return (
            <div style={{ margin: '20px 40px' }}>
                <h1
                    style={{ marginBottom: '20px' }}
                >题目管理</h1>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div>
                        <Input
                            size="large"
                            placeholder="题目名称"
                            onChange={(value) => this.setState({ query: value.target.value })}
                            style={{ width: '200px', marginRight: '20px' }}
                            onPressEnter={() => this.loadData()}
                        />
                        <Button icon="search" type="primary" onClick={() => this.loadData()}>搜索</Button>
                    </div>
                    <Button type="primary" onClick={() => this.setState({ add_modal: true })}><Icon type="plus" />新增科目</Button>
                </div>
                <Table
                    style={{ marginTop: '20px' }}
                    rowKey="id"
                    bordered
                    loading={this.state.table_loading}
                    columns={columns}
                    dataSource={this.state.subjects}
                />
                <AddSub
                    visible={this.state.add_modal}
                    onCancel={() => this.setState({ add_modal: false })}
                    loadData={() => this.loadData()}
                    {...this.state}
                />
            </div>
        )
    }
}
export default TitleManage;