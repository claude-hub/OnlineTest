import React, { Component } from 'react';
import { Modal } from 'antd'
class ShowQue extends Component {

    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render() {
        return (
            <Modal title='题目详情'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                {console.log(this.props.queName)}
            </Modal>
        );
    }
}
export default ShowQue;