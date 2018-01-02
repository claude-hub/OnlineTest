import config from "./config";
import {notification} from "antd";
import axios from "axios";

export default class Service {
    static get token(){
        return global.Store.getState().Session.Token;
    }

    // 基服务
    static get commonService() {
        let service = axios.create({
            baseURL: `${config.service.url}/api/platform/common/filter_condition`,
            headers: {'App-Version': '0.1.0',Token:Service.token}
        });

        service.defaults.timeout = 12000;

        service.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.code === 'ECONNABORTED' || !error.response) {
                notification.warning({
                    key: 'network error',
                    message: '很抱歉',
                    description: '请检查您的网络是否正常..'
                });
            }
            return Promise.reject(error);
        });

        return service;
    }
}
