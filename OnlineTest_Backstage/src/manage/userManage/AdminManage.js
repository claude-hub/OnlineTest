import React, {Component} from 'react';

class AdminManage extends Component {
    key = 'adminManager';
    componentWillMount() {
        this.props.popKey(this.key);
    }
    render() {
        return (
            <div>管理员</div>
        )
    }
}
export default AdminManage;