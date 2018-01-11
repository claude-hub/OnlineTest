import React, { Component } from 'react';
import { Table, Radio, Form, Modal, Button, Checkbox, Input, Row, Col, Switch, message, Select, Icon } from 'antd';
import { questionServices, config } from '../../lib'
import { connect } from 'react-redux';
const Search = Input.Search;
const Option = Select.Option
const RadioGroup = Radio.Group;
const FormItem = Form.Item
class AddPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            nickname: '',
            visible: '',
            subNames: [],
            table_loading: false,
            subs: [],
            subId: 0,
            level: 1,
            currentPage: 1,
            query: '',
            pageSize: 10,
            selectedRowKeys: [],
            loading:false,
        }
    }
    componentWillMount() {
        this.loadSubName();
        this.loadData()
    }
    loadSubName() {
        questionServices.getSubNames().then((ret) => {
            this.setState({ subNames: ret.data });
        }).catch((err) => {
            config.error('连接超时！');
        });
    }
    loadData() {
        if (this.state.subId == 0)
            return;
        const params = {
            subId: this.state.subId,
            queClass: this.state.level,
            currentPage: this.state.currentPage,
            query: this.state.query,
            pageSize: this.state.pageSize,
        }
        questionServices.getQueListBySubId(params).then((ret) => {
            this.setState({ subs: ret.data.queList });
        }).catch((err) => {
            config.error('连接超时！');
        });
    }
    selectSub(e) {
        this.setState({ subId: e.target.value }, () => this.loadData());
    }
    rightAnswer(value) {
        if (isNaN(value)) {
            return value
        } else {
            switch (Number(value)) {
                case 1: return 'A'
                case 2: return 'B'
                case 3: return 'C'
                case 4: return 'D'
            }
        }
    }
    selectIndex(value) {
        switch (value) {
            case 0: return 'A'
            case 1: return 'B'
            case 2: return 'C'
            case 3: return 'D'
        }
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    start = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
        const params = {
            uId:this.props.id,
            subId:this.state.subId,
            queIds:this.state.selectedRowKeys,
        }
        questionServices.createPaper(params).then((ret)=>{
            this.props.onCancel();
            this.props.loadData();
            config.success("生成成功!");
        })
      }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [{
            title: '题目',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '选项',
            dataIndex: "options",
            render: (text, record, index) =>
                (
                    record.options.map((option, optionIndex) => {
                        return (
                            <div key={option.optionId}>
                                <span>{this.selectIndex(optionIndex)}:&nbsp;</span>
                                <span>{option.description}</span>
                            </div>
                        )
                    })
                ),
        }, {
            title: '答案',
            dataIndex: 'rightAnswer',
            render: (text, record, index) =>
                (
                    <div>{this.rightAnswer(record.rightAnswer)}</div>
                ),
        }]
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <Modal
                title='新增试卷'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                <RadioGroup onChange={this.selectSub.bind(this)} value={this.state.subId}>
                    <div
                        style={{ width: '73px', float: 'left' }}
                    >请选择科目：</div>
                    <div
                        style={{ width: '380px', float: 'left' }}
                    >
                        {this.state.subNames.map((value, index) => {
                            return (
                                <Radio key={value.subId} value={value.subId}>{value.subName}</Radio>
                            )
                        })}
                    </div>
                </RadioGroup>
                <div
                    style={{display: 'flex',justifyContent: 'space-between'}}
                >
                    <span>
                        <span
                            style={{ width: '73px', display: 'inline-block' }}
                        >请选择等级:</span>
                        <Select
                            defaultValue="1"
                            style={{ width: 120 }}
                            onChange={(value) => this.setState({ level: value })}
                        >
                            <Option value="1">简单</Option>
                            <Option value="2">中级</Option>
                            <Option value="3">困难</Option>
                        </Select>
                    </span>
                    <Search
                        style={{width:'150px'}}
                        placeholder="题目"
                        onSearch={value => this.setState({query:value},()=>this.loadData())}
                    />
                </div>
                <Table
                    rowSelection={rowSelection}
                    style={{ marginTop: '20px' }}
                    rowKey="id"
                    bordered
                    loading={this.state.table_loading}
                    columns={columns}
                    dataSource={this.state.subs}
                />
                <Button
                    type="primary"
                    onClick={this.start}
                    disabled={!hasSelected}
                    loading={this.state.loading}
                >生成试卷</Button>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        id: state.Session.User.id,
    }
}
AddPaper = connect(mapStateToProps)(AddPaper)
export default AddPaper;