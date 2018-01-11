import React, { Component } from 'react';
import { Card, Icon, Button } from 'antd';
import { Link } from "react-router-dom";
import HeadImg from './HeadImg'
import { taskServices } from '../lib'

class SpecialExerciseTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            table_loading: false,
        };
    }
    componentDidMount() {
        this.loadData();
        this.props.id
    }
    loadData() {
        const params = {
            currentPage: 1
        };
        taskServices.getSubjects(params).then((ret) => {
            this.setState({ subjects: ret.data.subList });
            console.log(ret)
        }).catch((err) => {

        });
    }
    render() {
        return (
            <div className="exercise-tab">
                <div className="tab-content">
                    <h1><Icon type="tags" style={{ color: '#FF6547' }} />针对性专项练习</h1>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        {this.state.subjects.map((value, index) => {
                            return (
                                <div key={value.id} style={{ background: '#ECECEC', padding: '20px', width: '25%' }}>
                                    <Card title={<h1 style={{ margin: 'auto' }}>{value.name}</h1>} bordered={false} >
                                        <div style={{ paddingBottom: '10px'}}>
                                            <HeadImg style={{ margin: 'auto' }} text={value.name} />
                                        </div>
                                        <div style={{ margin: 'auto', width: '90%' }}>
                                            <Link style={{textAlign: 'center',padding:'10px 20px',color:'#fff', background: '#00BC9B',display:'block',borderRadius:'3' }}
                                             to={'/taskPage/'+value.id+'/1'}>开始练习</Link>
                                        </div>
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