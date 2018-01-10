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

    //搜索题目
    static searchQue(data={}){
        return Service.sessionService.get(`/Task/SearchQue`,{
            params:{
                query:data.query,
                currentPage:data.currentPage
            }
        })
    }

    //获取科目列表
    static getSubjects(data = {}) {
        return Service.sessionService.get(`/Task/GetSubjects`, {
            params : {
                currentPage:data.currentPage
            }
        })
    }

    //点击科目开始测试=》创建试卷 Task/StartSpecialExercise
    static startSpecialExercise(data={}){
        return Service.commonService.get(`/Task/StartSpecialExercise`,{
            params:{
                uId:data.uId,
                subId:data.subId,
                queClass:data.queClass
            }
        })
    }

    //由试卷编号获取题目 Task/StartExerciseByPId
    static startExerciseByPId(data={}){
        return Service.commonService.get(`/Task/StartExerciseByPId`,{
            params:{
                pId:data.pId
            }
        })
    }
    
    //获取试卷列表
    static getPapers(data={}){
        return Service.sessionService.get(`/Task/GetPapers`,{
            params:{
                currentPage:data.currentPage
            }
        })
    }
}
