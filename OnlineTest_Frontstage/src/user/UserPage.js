import React, { Component } from 'react';
import { Menu, Icon, Tabs } from 'antd'
import { connect } from 'react-redux';
import MyQue from './MyQue'
import MyArticle from './MyArticle'
import ModifyNickName from './ModifyNickName'
import ModifyPassword from './ModifyPassword'
import './userpage.css'
const TabPane = Tabs.TabPane;
class UserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modifyNickName:false,
            modifyPassword:false,
        }
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div style={{ paddingTop: '20px', display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px', width: '70%', minHeight: '500px', margin: 'auto' }}>
                <div style={{ width: '30%', height: '350px', backgroundColor: '#fff', padding: '30px' }}>
                    <ul className="user-head">
                        <li>
                            <div className="head-img"><h1>J</h1></div>
                        </li>
                        <li style={{ padding: '10px 0px' }}><a href="#" onClick={()=>this.setState({modifyNickName:true})} className="modify-btn"><Icon type="edit" />修改昵称</a></li>
                        <li style={{ padding: '10px 0px' }}><a href="#" onClick={()=>this.setState({modifyPassword:true})} className="modify-btn"><Icon type="edit" />修改密码</a></li>
                    </ul>
                </div>
                <div style={{ width: '2%' }}></div>
                <div style={{ width: '68%', backgroundColor: '#fff', minHeight: '500px' }}>
                    <div>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="题目" key="1"><MyQue uId={this.props.uId} /></TabPane>
                            <TabPane tab="发言" key="2"><MyArticle uId={this.props.uId}/></TabPane>
                        </Tabs>
                    </div>
                    <div>
                    <ModifyNickName 
                    visible={this.state.modifyNickName}
                    onCancel={() => this.setState({ modifyNickName: false })}
                    {...this.state}/>   
                    <ModifyPassword 
                    visible={this.state.modifyPassword}
                    onCancel={() => this.setState({ modifyPassword: false })}
                    uId = {this.props.uId}
                    {...this.state}
                    />
                    </div>

                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      uId: state.Session.User.id,
      user_name: state.Session.User.name,
    }
  }
  UserPage = connect(mapStateToProps)(UserPage)
export default UserPage;