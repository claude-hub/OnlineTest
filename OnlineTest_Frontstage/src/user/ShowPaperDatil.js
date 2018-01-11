import React, { Component } from 'react';
import { Card } from 'antd'
class ShowPaperDatil extends Component {

    constructor(props){
        super(props)
    }
    componentDidMount(){

    }
    loadData(){
        
    }
    render() {
        return (
            <Card title="Card title" extra={<Link to='/userPage'>返回个人主页</Link>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        );
    }
}
export default ShowPaperDatil;