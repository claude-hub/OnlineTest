import React, {Component} from 'react';

class Recycle extends Component {
    key = 'recycle';
    componentWillMount() {
        this.props.popKey(this.key);
    }
    render() {
        return (
            <div>回收站</div>
        )
    }
}
export default Recycle;