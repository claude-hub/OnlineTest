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
            headers: { Authorization: Service.token, 'App-Version': '0.1.0' }
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
    //获取科目列表
    static getSubjectList(data = {}) {
        return Service.commonService.get(`/Task/GetSubjectList`, {
            params: {
                currentPage: data.currentPage,
                pageSize: data.pageSize,
                query:data.query
            }
        })
    }
    //添加科目
    static addSub(data = {}) {
        return Service.commonService.post(`/Task/AddSubject?subjectName=${data.subjectName}`);
    }
}