import React, {Component} from 'react';

class Published extends Component {
    key = 'published';
    componentWillMount() {
        this.props.popKey(this.key);
    }
    render() {
        return (
            <div>已发布文章</div>
        )
    }
}
export default Published;