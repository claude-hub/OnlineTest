import React, { Component } from 'react';

const ewCode1 = require('../images/rwCode1.jpg');
const ewCode2 = require('../images/rwCode2.jpg');
class Foot extends Component{

    render(){
        return(
            <div className="foot">
                <div>
                    <ul className="foot-m">
                        <li>关于我们<span>|</span></li>
                        <li>加入我们<span>|</span></li>
                        <li>意见反馈<span>|</span></li>
                        <li>企业服务<span>|</span></li>
                        <li>免责声明<span>|</span></li>
                        <li>网站合作<span>|</span></li>
                        <li>友情链接</li>
                    </ul>
                    
                </div>
                        <ul className="foot-i">
                            <li><img src={ewCode1}/><p>微信</p></li>
                            <li><img src={ewCode2}/><p>QQ</p></li>
                        </ul>
            </div>
        );
    }
}
export default Foot;