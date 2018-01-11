import React, { Component } from 'react';
import { Icon, Card, Table, Button, Select } from 'antd'
import { Link } from "react-router-dom";
import { taskServices } from '../lib'
const Option = Select.Option;
class TiKu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            exerciseDatas: [],
            paperDatas: [],
            select_level: 1,
        }
    }
    componentDidMount() {
        this.loadData();
        this.props.id;
    }
    loadData() {
        const params = {
            currentPage: 1
        };
        taskServices.getSubjects(params).then((ret) => {
            this.setState({ exerciseDatas: ret.data.subList })
        }).catch((err) => {
        });
        taskServices.getPapers(params).then((ret) => {
            console.log(ret.data)
            this.setState({ paperDatas: ret.data.paperList })
        }).catch((err) => {

        });
    }

    render() {
        const exerciseColumns = [{
            title: '科目',
            dataIndex: 'name',
        }, {
            title: '题目总数',
            dataIndex: 'queCount',
        }, {
            title: '难度等级',
            dataIndex: 'difficultyLevel',
            render: (text, record, index) =>
                (
                    <Select
                        style={{ width: 120 }}
                        defaultValue="1"
                        onChange={(value) => this.setState({ select_level: value })}
                    >
                        <Option value="1">简单</Option>
                        <Option value="2">中级</Option>
                        <Option value="3">高级</Option>
                    </Select>
                ),
        }, {
            title: '选择',
            dataIndex: "action",
            render: (text, record, index) =>
                (
                    <Button><Link to={'/taskPage/' + record.id + '/' + this.state.select_level}>立即开始</Link></Button>
                ),
        }]
        const paperColums = [{
            title: '试卷名称',
            dataIndex: 'name',
        }, {
            title: '科目',
            dataIndex: 'subjectName',
        }, {
            title: '选择',
            dataIndex: "action",
            render: (text, record, index) =>
                (
                    <Button><Link to={'/paperTask/' + record.id }>立即开始</Link></Button>
                ),
        }]
        return (
            <div style={{ padding: '20px 0px', width: '70%', minHeight: '500px', margin: 'auto' }}>
                <div>
                    <Card title={<h2 style={{ fontSize: '17px', fontWeight: '700' }}><Icon type="edit" style={{ color: '#FF6547' }} />专项练习</h2>}
                        extra={<Link to='/'>返回首页</Link>} style={{ width: '100%' }}>
                        <Table
                            rowKey='id'
                            columns={exerciseColumns}
                            dataSource={this.state.exerciseDatas} />
                    </Card>
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <Card title={<h2 style={{ fontSize: '17px', fontWeight: '700' }}><Icon type="edit" style={{ color: '#FF6547' }} />真题测试</h2>}
                        extra={<Link to='/'>返回首页</Link>} style={{ width: '100%' }}>
                        <Table
                            rowKey='id'
                            columns={paperColums}
                            dataSource={this.state.paperDatas} />
                    </Card>
                </div>

            </div>
        );
    }
}
export default TiKu;