import React from "react";
import {Table} from "antd";
import PropTypes from "prop-types";

export default class DataGrid extends React.Component {
    static propTypes = {
        // 当值为0时，表示不再分页
        pageSize: PropTypes.number,
        fetchFunc: PropTypes.func.isRequired,   // 获取参数的方法
        columns: PropTypes.func.isRequired,     // 显示的列
        filters: PropTypes.object,              // 筛选参数
        // 获取数据后的回调
        fetchCallback: PropTypes.func,
        // 数据筛选
        dataFilter: PropTypes.func,
        noPagination: PropTypes.bool,            // 不分页
        rowSelection: PropTypes.object
    };

    static defaultProps = {
        pageSize: 20,
        filters: {},
        fetchCallback: () => null,
        dataFilter: (data) => data,
        noPagination: false,
        rowSelection: null
    };

    state = {
        loading: false,  // 是否正在加载
        sorter: {}, // 排序对象
        pagination: {
            current: 1,
            pageSize: this.props.pageSize,
            showSizeChanger: this.props.pageSize !== 0  //分页才显示
        }, //分页对象
        data: [],  // 数据
        filters: this.props.filters
    };

    get isPagination() {
        return this.props.pageSize === 0;
    }

    // 表格操作变化调用
    handleTableChange = (pagination = {}, filters = {}, sorter = {}) => {
        this.setState({pagination, sorter}, () => this.dataFetch());
    };

    // 数据获取
    dataFetch(reset_page = false) {
        let filters = this.state.filters;
        const pagination = this.state.pagination;
        const sorter = this.state.sorter;

        if (reset_page)
            pagination.current = 1;

        filters = Object.assign({}, filters, {
            current: pagination.current,
            pageSize: pagination.pageSize,
            sortOrder: sorter.order,
            sortField: sorter.field
        });

        this.setState({loading: true});
        this.props.fetchFunc(filters)
            .then(ret => {
                pagination.total = ret.data.total_count;
                this.setState({
                    data: this.props.noPagination ? ret.data : ret.data.results,
                    pagination,
                    loading: false
                });
                return ret.data;
            })
            .then(this.props.fetchCallback)
            .catch(ret => {
                this.setState({loading: false})
            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filters: nextProps.filters})
    }

    componentWillMount() {
        this.dataFetch();
    }

    render() {
        let {sorter} = this.state;
        const columns = this.props.columns(sorter);
        const data = this.props.dataFilter(this.state.data);
        return <Table rowKey={record => record.id} loading={this.state.loading} rowSelection={this.props.rowSelection}
                      pagination={this.props.noPagination ? false : this.state.pagination}
                      dataSource={data} columns={columns} onChange={this.handleTableChange}/>
    }
}