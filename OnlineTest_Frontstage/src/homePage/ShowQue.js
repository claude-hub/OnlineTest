import React, { Component } from 'react';
import { Modal } from 'antd'
class ShowQue extends Component {

    constructor(props) {
        super(props)
        this.state = {
            que: [{
                options:[],
            }],
            options: [],
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ que: nextProps.itemQue })
        const optionslist = this.state.options
        const options =[]
        console.log(this.state.options)
    }
    ergodicMap(value) {
        switch (value) {
            case 1: return '简单'
            case 2: return '中级'
            case 3: return '高级'
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
    render() {
        return (
            <Modal title='题目详情'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                <h3>{this.state.que.queName}</h3>
                <p style={{padding:'10px 0px'}}>
                    <span style={{paddingRight:' 10px'}}>科目：&nbsp;{this.state.que.subName}</span>
                    <span>难度：&nbsp;{this.ergodicMap(this.state.que.grade)}</span>
                </p>
                <p>备选项：</p>
                {/* {this.state.options.map((value, index) => {
                    return (
                        <div>
                            <span>{this.selectIndex(index)}:&nbsp;</span>
                            <span>{value.description}</span>
                        </div>
                    )
                })} */}
                <div
                    style={{ margin: ' 12px 0' }}
                >正确答案:&nbsp;{this.state.que.rightAnswer}</div>
            </Modal>
        );
    }
}
export default ShowQue;