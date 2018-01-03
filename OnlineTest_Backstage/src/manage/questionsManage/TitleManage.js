import React, {Component} from 'react';

class TitleManage extends Component {
    key = 'titleManager';
    componentWillMount() {
        this.props.popKey(this.key);
    }
    render() {
        return (
            <div>题目管理</div>
        )
    }
}
export default TitleManage;