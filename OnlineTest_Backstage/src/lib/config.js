const config = {
    development: {
        service: {
            url: (process.env.REACT_APP_HOST || process.env.REACT_APP_HOST === '') ? process.env.REACT_APP_HOST : 'http://localhost:52676'
        }
    },
};
export default Object.assign(config, config.development);
