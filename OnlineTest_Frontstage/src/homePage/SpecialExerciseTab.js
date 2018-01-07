import React, { Component } from 'react';
import { Card,Icon,Button } from 'antd';
import HeadImg from './HeadImg'
import {taskServices} from '../lib'

class SpecialExerciseTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            subjects:[],
            table_loading: false,
        };
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const params = {
            currentPage: 1
        };
        taskServices.getSubjects(params).then((ret) => {
            this.setState({ subjects: ret.data});
            console.log(ret)
        }).catch((err) => {

        });
    }
    render(){
        return(
            <div className="exercise-tab">
                <div className="tab-content">
                    <h1><Icon type="tags" style={{ color: '#FF6547' }} />针对性专项练习</h1>
                    <div style={{display: 'flex',justifyContent: 'flex-start'}}>
                    {this.state.subjects.map((value, index) => {
                        return (
                            <div key={value.id} style={{ background: '#ECECEC', padding: '20px',width:'22%'}}>
                                <Card title={<h1 style={{ margin: 'auto' }}>{value.name}</h1>} bordered={false} >
                                    <HeadImg style={{ margin: 'auto' }} text={value.name} />
                                    <Button type="primary" style={{marginTop: '20px',background:'#00BC9B',width:'100%'}}>开始练习</Button>
                                </Card>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        );
    }
}
export default SpecialExerciseTab;