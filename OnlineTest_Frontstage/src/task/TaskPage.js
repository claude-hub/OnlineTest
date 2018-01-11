import React, { Component } from 'react';
import { Card, Icon, Pagination, Checkbox, Row, Col,message } from 'antd'
import { connect } from 'react-redux';
import { communicateServices, taskServices } from '../lib/index';
import { Button } from 'antd/lib/radio';
class TaskPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            subId:this.props.id,
            queClass:this.props.queClass,
            uId:this.props.uId,
            quesList: [],
            que: [],
            queIds: [],
            selectOptions: [],
            queCount: 0,
            paperId: 0,
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
            this.setState({
                quesList: ret.data.ques, queCount: ret.data.queCount,
                que: ret.data.ques[0],paperId:ret.data.paperId
            })
        }).catch((err)=>{

        })
    }

    onChange(page) {
        const queIds = this.state.queIds
        queIds.push(this.state.que.queId)
        this.setState({ queIds: queIds, que: this.state.quesList[page - 1] })
    }
    selectOption(checkedValues) {
        const selectOptions = this.state.selectOptions
        selectOptions.push(checkedValues)
        this.setState({ selectOptions: selectOptions })
    }
    onSubmit(){
        const queIds = this.state.queIds
        queIds.push(this.state.que.queId)
        this.setState({ queIds: queIds})
        const params = {
            uId : this.state.uId,
            paperId : this.state.paperId,
            queIds : this.state.queIds,
            selectAnswerIds : this.state.selectOptions
        }
        taskServices.submitAnswer(params).then((ret)=>{
            message.success("提交成功！")
            console.log(ret)
            window.location.href="/"
        }).catch((err)=>{
            message.error("失败！")
        })
    }
    render() {
        return (
            <div style={{ padding: '20px 0px', width: '70%', minHeight: '442px', margin: 'auto' }}>
                <div style={{ backgroundColor: '#fff', padding: '20px' }}>
                    {this.state.que.map((item, keys) => {
                        return (
                            <Card key={item.queId}
                                title={<h2>{item.queContent}</h2>}
                                extra={<a onClick={() => this.props.history.goBack()}>返回题库</a>}
                                style={{ width: '100%', height: '100%' }}>
                                <Checkbox.Group onChange={this.selectOption.bind(this)}>

                                    <div key={keys}>
                                        {item.options.map((option, optionIndex) => {
                                            return (
                                                <Row key={optionIndex}>
                                                    <Col span={8}><Checkbox value={option.opId}>{option.description}</Checkbox></Col>
                                                </Row>
                                            )
                                        })}
                                    </div>
                                    </Checkbox.Group>

                             </Card>
                        )
                            })}
                    <div style={{display:'flex',justifyContent:'flex-end',paddingTop: '20px'}}>
                        <Pagination
                            style={{ paddingRight: '20px' }}
                            onChange={this.onChange.bind(this)}
                            defaultPageSize={1}
                            defaultCurrent={1}
                            total={this.state.queCount} />
                        <Button onClick={() => this.onSubmit()} >提交</Button>
                    </div>
                    
                </div>


            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        uId: state.Session.User.id
    }
}
TaskPage = connect(mapStateToProps)(TaskPage)
export default TaskPage;