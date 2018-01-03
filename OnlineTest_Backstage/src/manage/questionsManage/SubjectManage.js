import React, {Component} from 'react';

class SubjectManage extends Component {
    key = 'subjectManager';
    componentWillMount() {
        this.props.popKey(this.key);
    }
    render() {
        return (
            <div>科目管理</div>
        )
    }
}
export default SubjectManage;