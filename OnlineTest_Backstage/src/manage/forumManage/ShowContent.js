import React, {Component} from 'react';
import {Modal} from 'antd'

class ShowContent extends Component{

    constructor(props){
        super(props)
    }
    render(){
        return(
            <Modal
                title='内容详情'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                <div>
                    {this.props.content}
                </div>
                </Modal>
        );
    }
}
export default ShowContent;