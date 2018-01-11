import React, { Component } from 'react';
import { Form, Modal, Button, Input, Switch, message, Select, Icon } from 'antd';
import { questionServices, config } from '../../lib'
const Option = Select.Option
const FormItem = Form.Item
class AddPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            nickname: '',
            visible: '',
            subNames:'',
        }
    }       
    loadData() {
        this.setState({ table_loading: true });
        questionServices.getSubNames().then((ret) => {
            console.log(ret)
            this.setState({ subNames: ret.data, table_loading: false });
        }).catch((err) => {
            config.error('连接超时！');
            this.setState({ table_loading: false });
        });
    }
    render() {
        return (
            <Modal
                title='新增科目'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>

            </Modal>
        )
    }
}
export default AddPaper;