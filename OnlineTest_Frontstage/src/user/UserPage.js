import React, { Component } from 'react';
import {Menu,Icon} from 'antd'
import MyQue from './MyQue'
import './userpage.css'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class UserPage extends Component {

    constructor(props){
        super(props)
        this.state={
            current:'que'
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
                        <li style={{ padding: '10px 0px' }}><a className="modify-btn"><Icon type="edit"/>修改昵称</a></li>
                        <li style={{ padding: '10px 0px' }}><a className="modify-btn"><Icon type="edit"/>修改密码</a></li>
                    </ul>
                </div>
                <div style={{ width: '2%' }}></div>
                <div style={{ width: '68%', backgroundColor: '#fff', minHeight: '500px' }}>
                    <div>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="que">
                                题目
                            </Menu.Item>
                            <Menu.Item key="article">
                                发言
                            </Menu.Item>
                            
                            <Menu.Item key="info">
                                个人资料
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <MyQue />
                    </div>
                </div>
            </div>
        );
    }
}
export default UserPage;