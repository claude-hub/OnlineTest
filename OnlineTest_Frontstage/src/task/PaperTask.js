import React, { Component } from 'react';
import { Card, Icon, Pagination, Checkbox, Row, Col } from 'antd'
import { connect } from 'react-redux';
import { communicateServices, taskServices } from '../lib/index';

class PaperTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uId: this.props.uId,
            quesList: [],
            que: [],
            options:[],
            queIds: [],
            selectOptions: [],
            queCount: 0,
            paperId: this.props.paperId,
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        taskServices.startExerciseByPId({ pId: this.props.paperId }).then((ret) => {
            console.log(ret.data)
            this.setState({ quesList: ret.data.ques, queCount: ret.data.queCount, 
                que: ret.data.ques[0],options: ret.data.ques[0].options})
            console.log(777)
            console.log(this.state.options)
        }).catch((err) => {
        })
    }
    onChange(page) {
        const queIds = this.state.queIds
        queIds.push(this.state.que.queId)
        this.setState({ queIds: queIds, que: this.state.quesList[page - 1] })
    }
    selectOption(checkedValues) {
        console.log(checkedValues)
    }
    render() {
        return (
            <div style={{ padding: '20px 0px', width: '70%', minHeight: '442px', margin: 'auto' }}>
                <div style={{ backgroundColor: '#fff', paddingBottom: '20px' }}>
                    <Card key={this.state.que.queId}
                        title={<h2>{this.state.que.queContent}</h2>}
                        extra={<a onClick={() => this.props.history.goBack()}>返回题库</a>}
                        style={{ width: '100%', height: '100%' }}>
                        <Checkbox.Group onChange={this.selectOption.bind(this)}>
                            {this.state.options.map((item, keys) => {
                                return (
                                    <Row>
                                        <Col ><Checkbox value={item.opId}>{item.description}</Checkbox></Col>
                                    </Row>
                                )
                            })}

                        </Checkbox.Group>,

                    </Card>
                    <Pagination
                        style={{ paddingTop: '20px', textAlign: 'right' }}
                        onChange={this.onChange.bind(this)}
                        defaultPageSize={1}
                        defaultCurrent={1}
                        total={this.state.queCount} />
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
PaperTask = connect(mapStateToProps)(PaperTask)
export default PaperTask;