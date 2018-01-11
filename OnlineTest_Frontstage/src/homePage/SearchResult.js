import React, { Component } from 'react';
import { Icon, Card, Pagination, Badge } from 'antd'
import { Link } from "react-router-dom";
import ShowQue from './ShowQue'
import { taskServices } from '../lib'
import './homePage.css'
class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: this.props.query,
            add_modal: false,
            resultCount: 0,
            currentPage: 1,
            pageSize: 10,
            result: [],
            itemQue:[],
        }
    }
    componentDidMount() {
        this.loadData(this.state.currentPage, this.state.pageSize);
    }
    loadData(page, pageSize) {
        const params = {
            query: this.state.query,
            currentPage: this.setState.currentPage,
            pageSize: this.state.pageSize
        }
        taskServices.searchQue(params).then((ret) => {
            console.log(ret.data.ques)
            this.setState({ resultCount: ret.data.count, result: ret.data.ques })
        }).catch((err) => {

        });
    }
    onShowSizeChange(page, pageSize) {
        console.log(page, pageSize);
        this.loadData.bind(page, pageSize)
    }
    onChange(page, pageSize) {
        console.log(page, pageSize);
        this.loadData(page, pageSize)
    }
    render() {
        return (
            <div style={{ padding: '20px 0px', width: '70%', minHeight: '442px', margin: 'auto' }}>
                <Card
                    title={<h2 style={{ fontSize: '17px', fontWeight: '700' }}>搜索结果
                <Badge style={{ backgroundColor: '#49a9ee' }} count={this.state.resultCount}></Badge></h2>
                    }
                    extra={<Link to='/'>返回首页</Link>}
                    style={{ width: '100%' }}>
                    {this.state.result.map((value, index) => {
                        return (
                            <div key={value.id}>
                                <div style={{ padding: '5px 0px 20px 0px', borderBottom: '1px solid #ccc' }}>
                                    <a className="que-title" href="#" onClick={() => this.setState({ add_modal: true,itemQue:value })} >{value.queName}</a>
                                </div>
                            </div>

                        )
                    })}
                    <Pagination
                        style={{ float: 'right', paddingTop: '10px' }}
                        defaultPageSize={10}
                        size="small" total={this.state.total}
                        onChange={this.onChange.bind(this)}
                        showSizeChanger
                        showQuickJumper
                        onShowSizeChange={this.onShowSizeChange.bind(this)} />
                    <ShowQue
                        visible={this.state.add_modal}
                        onCancel={() => this.setState({ add_modal: false })}
                        itemQue={this.state.itemQue}
                        {...this.state} />
                </Card>
            </div>
        );
    }
}
export default SearchResult;