import React, { Component } from 'react';
import { Modal,Input,Button,message } from 'antd';
import { connect } from 'react-redux';
import { userServices } from '../lib'
class ModifyNickName extends Component{

    constructor(props){
        super(props)
        this.state={
            nickname:'',
        }
    }
    onclick(){
        const params={
            uId:this.props.uId,
            nikeName:this.state.nickname
        }
        userServices.changeNickname(params).then((ret)=>{
            message.success("修改成功！")
            window.location.href="/userPage"
        }).catch((err)=>{

        })
    }
    render() {
        return (
            <Modal title='修改昵称'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                <Input onChange={(obj)=>this.setState({nickname: obj.target.value})} placeholder={this.props.user_name} />
                <Button type="primary" style={{textAlign: 'right',padding:'10px 0px 10px 0px'}} onClick={()=>this.onclick()} >确定</Button>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      uId: state.Session.User.id,
      user_name: state.Session.User.name,
    }
  }
  ModifyNickName = connect(mapStateToProps)(ModifyNickName)
export default ModifyNickName;