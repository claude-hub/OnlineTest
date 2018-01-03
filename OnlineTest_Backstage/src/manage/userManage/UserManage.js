import React, {Component} from 'react';

class UserManage extends Component {
    moduleName = '用户管理';
    key = 'userManager';
    componentWillMount() {
        this.props.popKey(this.key, this.moduleName);
    }
    render() {
        return (
            <div>123</div>
        )
    }
}
export default UserManage;