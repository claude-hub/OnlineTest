import React, { Component } from 'react';
import { Input, Button, Tree, Icon,message } from 'antd';
import { communicateServices } from '../lib'
import { HeadImg } from '../homePage'

const { TextArea } = Input;
const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);
class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artId: this.props.artId,
            commentNum: 0,
            rows: 2,
            gData,
            expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({commentNum:nextProps.commentNum})
    }
    componentDidMount() {
        console.log(this.state.artId)
        console.log(this.state.commentNum)
        this.loadData()
    }
    loadData() {
        communicateServices.getArticleComment({ artId: this.state.artId }).then((ret) => {
            console.log(99999)
            console.log(ret.data)
            this.setState({ gData: ret.data })
        }).catch((err) => {

        });
    }
    changeRow() {
        this.setState({ rows: 3 })
    }
    onDragEnter = (info) => {
        console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    }
    onDrop = (info) => {
        console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = [...this.state.gData];
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        if (info.dropToGap) {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                // drag node and drop node in the same level
                // and drop to the last node
                if (dragKey.length === dropKey.length && ar.length - 1 === i) {
                    i += 2;
                }
                ar.splice(i - 1, 0, dragObj);
            }
        } else {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        }
        this.setState({
            gData: data,
        });
    }
    addComPraiseNum(comId){
        communicateServices.addComPraiseNum({comId: comId}).then((ter)=>{

        }).catch((err)=>{
            message.error("失败！")
        });
    }
    addComTrampleNum(comId){
        communicateServices.addComTrampleNum({comId: comId}).then((ter)=>{

        }).catch((err)=>{
            message.error("失败！")
        });
    }
    onChange(value){
        
    }
    render() {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.id}
                    title={<div key={item.id} style={{width:'100%', display: 'flex', justifyContent: 'flex-start' }}>
                        <div>
                            <HeadImg text='J' />
                        </div>
                        <div style={{ paddingLeft:'10px',width:'92%' }}>
                            <p>{item.content}</p>
                            <p style={{ float: 'left' }}>{item.userName} 时间：{item.createTime}</p>
                            <span style={{ float: 'right' }}>
                                <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}
                                    onClick={() => this.addComPraiseNum(item.id)}
                                ><Icon type="like-o" />({item.praiseNum})</a>
                                <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}
                                    onClick={() => this.addComTrampleNum(item.id)}><Icon type="dislike-o" />({item.trampleNum})</a>
                                <a className="icon-css" style={{ paddingLeft: '10px', color: '#000' }}><Icon type="message" />({item.children.length})</a>
                            </span>
                        </div>
                    </div>
                    }
                >
                    {loop(item.children)}
                </TreeNode>;
            }
            return <TreeNode key={item.id}
                title={444}
            />;
        });
        return (
            <div >
                <div style={{ display: 'flex', paddingBottom: '10px', justifyContent: 'flex-start', borderBottom: '1px solid #ccc' }}>
                    <h1 style={{ fontWeight: '600', paddingRight: '5px' }}>{this.state.commentNum}条评论</h1>
                    <div style={{ width: '88%' }}>
                        <TextArea 
                        style={{ float: 'left', width: '90%' }} 
                        rows={this.state.rows} 
                        onChange={value=>this.onChange(value)}
                        onClick={() => this.changeRow()} />
                        <Button type="" style={{ float: 'right', width: '10%', height: '100%' }} >评论</Button>
                    </div>
                </div>
                <div style={{ paddingTop: '10px' }}>
                    <Tree
                    style={{width:'100%'}}
                        className="draggable-tree"
                        disabled
                        defaultExpandedKeys={this.state.expandedKeys}
                        draggable
                        onDragEnter={this.onDragEnter}
                        onDrop={this.onDrop}
                    >
                        {loop(this.state.gData)}
                    </Tree>
                </div>
            </div>
        );
    }
}
export default Comments;