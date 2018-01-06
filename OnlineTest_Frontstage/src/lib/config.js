const config = {
    development: {
        service: {
            url: (process.env.REACT_APP_HOST || process.env.REACT_APP_HOST === '') ? process.env.REACT_APP_HOST : 'http://192.168.199.147:52675'
        }
    },
};
export default Object.assign(config, config.development);
