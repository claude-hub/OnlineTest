import React, { Component } from 'react';
import { Table, Input, Button, message, Pagination, Icon, Popconfirm } from 'antd'
import ShowContent from './ShowContent'
import { forumServices, config } from '../../lib'

class Unpublished extends Component {
    key = 'unpublished';
    constructor(props) {
        super(props);
        this.state = {
            add_modal: false,
            unpublish_article: [],
            table_loading: false,
            art_count: 0,
            query: '',
            article_content: '',
            currentPage: 1
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
            isPublish: "false",
            currentPage: this.state.currentPage,
            query: this.state.query
        };
        forumServices.getArticleList(params).then((ret) => {
            this.setState({ unpublish_article: ret.data.arts, table_loading: false, art_count: ret.data.count });
        }).catch((err) => {
            config.error('连接超时！');
            this.setState({ table_loading: false });
        });
    }
    publish(artId) {
        forumServices.publish({ artId: artId }).then((ret) => {
            message.success("发布成功！")
            this.props.history.push('/published')
        }).catch((err) => {
            message.error("连接超时！")
        })
    }
    deleteArticle(artId) {
        console.log(artId)
        forumServices.deleteArticle({ artId: artId }).then((ret) => {
            message.success("删除成功！")
            this.loadData()
        }).catch((err) => {
            message.error("连接超时！")
        })
    }
    onChange(page, pageSize) {
        this.setState({ currentPage: page }, () => this.loadData())
    }
    confirm(artId) {
        this.deleteArticle(artId)
      }
      
    cancel() {
        message.error('Click on No');
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
                    <span>
                        <a style={{paddingRight:'5px'}} href="javascript:void(0)"
                            onClick={() => this.publish(record.id)} ><Icon type="arrow-up" />发布</a>
                        <Popconfirm title="确定要删除吗?"
                            onConfirm={()=>this.confirm(record.id)}
                            onCancel={()=>this.cancel()}
                            okText="是" cancelText="否">
                            <a href="javascript:void(0)"
                            ><Icon type="delete" />删除</a>
                        </Popconfirm>

                    </span>


                ),
        }]
        return (
            <div style={{ margin: '20px 40px' }}>
                <h1
                    style={{ marginBottom: '20px' }}
                >待发布文章</h1>
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
                    dataSource={this.state.unpublish_article}
                />
                <Pagination
                    style={{ padding: '10px 0px 20px 0px', textAlign: 'right' }}
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
export default Unpublished;