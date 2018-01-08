import {message} from 'antd';

const error = (value) => {
    message.error(value, 2)
};

const success = (value) => {
    message.success(value, 2)
};
const config = {
    error: error,
    success: success,
    development: {
        service: {
            url: (process.env.REACT_APP_HOST || process.env.REACT_APP_HOST === '') ? process.env.REACT_APP_HOST : 'http://192.168.199.147:3000'
        }
    },
};
export default Object.assign(config, config.development);
