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
                query: data.query
            }
        })
    }
    //添加科目
    static addSub(data = {}) {
        return Service.commonService.post(`/Task/AddSubject?subjectName=${data.subjectName}`);
    }
    //获取题目列表
    static getQueList(data = {}) {
        return Service.commonService.get(`/Task/GetQueList`, {
            params: {
                subId: data.subId,
                currentPage: data.currentPage,
                pageSize: data.pageSize,
                query: data.query
            }
        })
    }
    //添加题目
    static addTopic(data = {}) {
        console.log(data)
        return Service.commonService.post(`/Task/AddQuestion?subjectId=${data.subjectId}&questionName=${data.questionName}&questionAnlysis=${data.questionAnlysis}&questionType=${data.questionType}&questionClass=${data.questionClass}&rightAnswer=${data.rightAnswer}`);
    }
    //添加选项
    static addOption(data = {}) {
        return Service.commonService.post(`/Task/AddOptions?questionId=${data.questionId}&answerDescription=${data.answerDescription}`);
    }
    //获取题目列表
    static getQueById(data = {}) {
        return Service.commonService.get(`/Task/GetQueById`, {
            params: {
                queId: data.queId
            }
        })
    }
    //获取试卷列表
    static getPaperList(data = {}) {
        return Service.commonService.get(`/Task/GetPaperList`, {
            params: {
                currentPage: data.currentPage,
                query:data.query,
                pageSize:data.pageSize,
            }
        })
    }
    //获取所有科目名
    static getSubNames(data = {}) {
        return Service.commonService.get(`/Task/GetSubNames`)
    }
    //获取科目下的所有题目
    static getQueListBySubId(data = {}) {
        return Service.commonService.get(`/Task/GetQueListBySubId`, {
            params: {
                subId:data.subId,
                queClass:data.queClass,
                currentPage: data.currentPage,
                query:data.query,
                pageSize:data.pageSize,
            }
        })
    }
    //创建试卷
    static createPaper(data = {}) {
        let queIds = data.queIds.join('&queIds=');
        console.log(queIds)
        return Service.commonService.post(`/Task/CreatePaper?uId=${data.uId}&subId=${data.subId}&queIds=${queIds}`)
    }
}