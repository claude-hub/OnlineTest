import React, {Component} from 'react';

class Unpublished extends Component {
    key = 'unpublished';
    componentWillMount() {
        this.props.popKey(this.key);
    }
    render() {
        return (
            <div>未发布文章</div>
        )
    }
}
export default Unpublished;