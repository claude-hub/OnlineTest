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

    //获取文章列表
    static getArticles(data = {}) {
        return Service.sessionService.get(`/Communicate/GetArticles`, {
            params : {
                currentPage:data.currentPage,
                pageSize:data.pageSize
            }
        })
    }
     
    //获取单个文章
    static getArticleById(data={}){
        return Service.sessionService.get(`/Communicate/GetArticleById`,{
            params:{
                artId: data.artId
            }
        })
    }

    //添加文章
    static addArticle(data={}){
        return Service.commonService.post('/Communicate/AddArticle?')
    }

    //给文章点赞 Communicate/AddArticlePraiseNum
    static addArticlePraiseNum(data={}){
        return Service.sessionService.put(`/Communicate/AddArticlePraiseNum?artId=${data.artId}`)
    }

    //踩文章 Communicate/AddArticleTrampleNum
    static addArticleTrampleNum(data={}){
        return Service.sessionService.put(`/Communicate/AddArticleTrampleNum?artId=${data.artId}`)
    }
}
