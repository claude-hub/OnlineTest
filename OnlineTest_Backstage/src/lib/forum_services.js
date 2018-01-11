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

    //获取到文章列表 Communicate/GetArticleList?isPublish=true&currentPage=1
    static getArticleList(data={}){
        return Service.commonService.get(`/Communicate/GetArticleList`,{
            params:{
                query:data.query,
                isPublish:data.isPublish,
                currentPage:data.currentPage
            }
        })
    }
    //撤销文章  Communicate/UnPublishArticle
    static revocation(data={}){
        return Service.commonService.put(`/Communicate/UnPublishArticle?artId=${data.artId}`)
    }

    //发布文章  Communicate/PublishArticle
    static publish(data={}){
        return Service.commonService.put(`/Communicate/PublishArticle?artId=${data.artId}`)
    }

    //删除文章  Communicate/DeleteArticle
    static deleteArticle(data={}){
        return Service.commonService.delete(`/Communicate/DeleteArticle?artId=${data.artId}`)
    }
}