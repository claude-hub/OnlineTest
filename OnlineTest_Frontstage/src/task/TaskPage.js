import React, { Component } from 'react';
import { Card, Icon } from 'antd'
import { connect } from 'react-redux';
import { communicateServices, taskServices } from '../lib/index';
class TaskPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            subId:this.props.id,
            queClass:this.props.queClass,
            uId:this.props.uId
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData(){
        const params={
            subId:this.state.subId,
            queClass:this.state.queClass,
            uId:this.state.uId
        }
        taskServices.startSpecialExercise(params).then((ret)=>{
            console.log(ret.data)
        }).catch((err)=>{

        })
    }
    render() {
        return (
            <div style={{ padding: '20px 0px', width: '70%', minHeight: '442px', margin: 'auto' }}>
                <Card
                    title={<h2>题目</h2>}
                    extra={<a onClick={() => this.props.history.goBack()}>返回题库</a>}
                    style={{ width: '100%',height:'100%' }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        uId:state.Session.User.id
    }
}
TaskPage = connect(mapStateToProps)(TaskPage)
export default TaskPage;