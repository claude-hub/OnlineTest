import axios from 'axios';
import Store from "./store";
import config from './config';

export default class Service {
    static get token() {
        return global.Store.getState().Session.Authorization;
    }

    //带header的基服务
    static get commonService() {
        let service = axios.create({
            baseURL: `${config.service.url}/api`,
            headers: {Authorization: Service.token, 'App-Version': '0.1.0'}
        });
        service.defaults.timeout = 12000;
        return service;
    }

    //session基服务
    static get sessionService() {
        let service = axios.create({
            baseURL: `${config.service.url}/api`,
        });
        service.defaults.timeout = 12000;
        return service;
    }

    //登录
    static sign_in(data = {}) {
        return new Promise(function (resolve, reject) {
            Service.sessionService.post(`/User/Login?account=${data.account}&password=${data.password}`, data).then((ret) => {
                Store.dispatch({
                    type: 'SESSION:UP',
                    token: ret.data.token.data.token,
                    user: {
                        id: ret.data.userInfo.id,
                        name: ret.data.userInfo.nikename,
                        account: ret.data.userInfo.account
                    }
                });
                resolve(ret)
            }).catch(reject)
        });
    }
    static register(data={}){
        return Service.sessionService.post(`/User/Register?account=${data.account}
        &password=${data.password}&nikename=${data.nikename}`)
    }

    //注销
    static sign_out (){
        Store.dispatch({
            type: 'SESSION:DOWN',
        });
    }
    //修改昵称
    static changeNickname(data={}){
        return new Promise(function (resolve, reject) {
            Service.commonService.put(`/User/ModifyNikeName?uId=${data.uId}&nikeName=${data.nikeName}`).then((ret) => {
                Store.dispatch({
                    type: 'USER:SET',
                    token: ret.data.token.data.token,
                    user: {
                        id: ret.data.userInfo.id,
                        name: ret.data.userInfo.nikename,
                        account: ret.data.userInfo.account
                    }
                });
                resolve(ret)
            }).catch(reject)
        });
    }

    //修改密码
    static changePassword(data = {}) {
        return Service.commonService.put(`/User/ModifyPassword?userId=${data.uId}&nPassword=${data.nPassword}`)
    }
}
