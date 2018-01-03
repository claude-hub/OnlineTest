const config = {
    development: {
        service: {
            url: (process.env.REACT_APP_HOST || process.env.REACT_APP_HOST === '') ? process.env.REACT_APP_HOST : 'http://beta.xsh.cqut.net'
        }
    },
};
export default Object.assign(config, config.development);
