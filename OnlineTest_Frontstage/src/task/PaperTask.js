import React, { Component } from 'react';
import { Card, Icon, Pagination } from 'antd'
import { connect } from 'react-redux';
import { communicateServices, taskServices } from '../lib/index';

class PaperTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uId: this.props.uId,
            quesList: [],
            que:'',
            queCount: 0,
            paperId: this.props.paperId,
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        taskServices.startExerciseByPId({ pId: this.props.paperId }).then((ret) => {
            console.log(ret.data.ques)
            this.setState({ quesList: ret.data.ques, queCount: ret.data.queCount, que: ret.data.ques[0] })
        }).catch((err) => {

        })
    }
    onChange(page) {
        console.log(page)
        this.setState({que: this.state.quesList[page-1]})
    }
    render() {
        return (
            <div style={{ padding: '20px 0px', width: '70%', minHeight: '442px', margin: 'auto' }}>
            <div style={{backgroundColor:'#fff',paddingBottom:'20px;'}}>
            <Card key={this.state.que.queId}
                    title={<h2>{this.state.que.queContent}</h2>}
                    extra={<a onClick={() => this.props.history.goBack()}>返回题库</a>}
                    style={{ width: '100%', height: '100%' }}>
                    {/* {value.options.map((item,keys)=>{
                                return(
                                    <p>222</p>
                                )                                
                            })} */}
                </Card>
                <Pagination
                style={{paddingTop:'20px'}}
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