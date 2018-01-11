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

    //获取用户文章
    static getArticleListByUser(data={}){
        return Service.commonService.get('/User/GetArticleListByUser',{
            params:{
                uId:data.uId,
                currentPage:data.currentPage
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
        return Service.commonService.post(`/Communicate/CreateArticle?uId=${data.uId}&title=${data.title}
        &content=${data.content}&label=${data.label}`)
    }

    //给文章点赞 Communicate/AddArticlePraiseNum
    static addArticlePraiseNum(data={}){
        return Service.sessionService.put(`/Communicate/AddArticlePraiseNum?artId=${data.artId}`)
    }

    //踩文章 Communicate/AddArticleTrampleNum
    static addArticleTrampleNum(data={}){
        return Service.sessionService.put(`/Communicate/AddArticleTrampleNum?artId=${data.artId}`)
    }

    //赞评论
    static addComPraiseNum(data={}){
        return Service.sessionService.put(`/Communicate/AddCommentPraiseNum?comId=${data.comId}`)
    }

    //踩评论
    static addComTrampleNum(data={}){
        return Service.sessionService.put(`/Communicate/AddCommentTrampleNum?comId=${data.comId}`)
    }

    //评论文章
    static commentArticle(data={}){
        return Service.commonService.post(`/Communicate/AddComment?uId=${data.uId}&artId=${data.artId}&content=${data.content}`)
    }

    //回复评论
    static replyComment(data={}){
        return Service.commonService.post(`/Communicate/AddComment?uId=${data.uId}&artId=${data.artId}&content=${data.content}&parentId=${data.parentId}`)
    }

    //获取文章评论
    static getArticleComment(data={}){
        return Service.sessionService.get('/Communicate/GetCommentByArtId',{
            params:{
                artId:data.artId
            }
        })
    }
}
