import {message} from 'antd';

const error = (value) => {
    message.error(value, 2)
};

const success = (value) => {
    message.success(value, 2)
};
const config = {
    development: {
        service: {
            url: (process.env.REACT_APP_HOST || process.env.REACT_APP_HOST === '') ? process.env.REACT_APP_HOST : 'http://localhost:52675'
        }
    },
};
export default Object.assign(config, config.development);
