import React, { Component } from 'react';
import { Table, Input, Button, message,Pagination,Icon } from 'antd'
import ShowContent from './ShowContent'
import { forumServices, config } from '../../lib'

class Published extends Component {
    key = 'published';
    constructor(props) {
        super(props);
        this.state = {
            add_modal: false,
            publish_article: [],
            table_loading: false,
            art_count: 0,
            query: '',
            article_content: '',
            currentPage:1
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
            isPublish: "true",
            currentPage: this.state.currentPage,
            query: this.state.query
        };
        forumServices.getArticleList(params).then((ret) => {
            this.setState({ publish_article: ret.data.arts, table_loading: false, art_count: ret.data.count });
        }).catch((err) => {
            config.error('连接超时！');
            this.setState({ table_loading: false });
        });
    }
    revocation(artId) {
        forumServices.revocation({ artId: artId }).then((ret) => {
            message.success("撤销成功！")
            this.props.history.push('/unpublished')
        }).catch((err) => {
            message.error("连接超时！")
        })
    }
    onChange(page, pageSize) {
        this.setState({ currentPage: page }, () => this.loadData())
      }

    render() {
        const commonColumns = [{
            title: '标题',
            dataIndex: 'title',
        }, {
            title: '作者',
            dataIndex: 'author',
        }, {
            title: '标签',
            dataIndex: 'label',
        }, {
            title: '内容',
            dataIndex: 'content',
            render: (text, record, index) => (
                <a href="javascript:void(0)" onClick={() => this.setState({ add_modal: true, article_content: text })}>查看</a>
            ),
        }, {
            title: '状态',
            dataIndex: 'isPublish'
        }, {
            title: '操作',
            dataIndex: "action",
            render: (text, record, index) =>
                (
                    <a href="javascript:void(0)" onClick={() => this.revocation(record.id)} ><Icon type="arrow-down" />撤销</a>

                ),
        }]
        return (
            <div style={{ margin: '20px 40px' }}>
                <h1
                    style={{ marginBottom: '20px' }}
                >已发布文章</h1>
                <Input
                    size="large"
                    placeholder="文章标题"
                    onChange={(value) => this.setState({ query: value.target.value })}
                    style={{ width: '200px', marginRight: '20px' }}
                    onPressEnter={() => this.loadData()}
                />
                <Button icon="search" type="primary" onClick={() => this.loadData()}>搜索</Button>
                <Table
                    style={{ marginTop: '20px' }}
                    rowKey="id"
                    pagination={false}
                    loading={this.state.table_loading}
                    columns={commonColumns}
                    dataSource={this.state.publish_article}
                />
                <Pagination
                    style={{ padding: '10px 0px 20px 0px',textAlign: 'right'}}
                    defaultPageSize={10}
                    defaultCurrent={1} total={this.state.articleCount}
                    onChange={this.onChange.bind(this)}
                />
                <ShowContent
                    visible={this.state.add_modal}
                    onCancel={() => this.setState({ add_modal: false })}
                    content={this.state.article_content}
                    {...this.state}
                />
            </div>
        )
    }
}
export default Published;