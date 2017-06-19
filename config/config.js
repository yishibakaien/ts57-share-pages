'use strict';

// const env = 'dev'; // 开发环境
// const env = 'test_new'; // 测试环境
var env = 'prod';
var headers = {
    'x-version': '1.0',
    'x-client': '4'
};
var downLoadAppURL = 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.ts57.app';
var baseURL = (function(env) {

    var baseURL;
    var urls = {
        dev: 'http://localhost:3001',
        test: 'http://192.168.2.11:8080',
        test_new: 'http://api.tswq.wang',
        prod: 'https://api.ts57.cn'
    };
    if (env === 'dev') {
        baseURL = urls.dev + '/api'; // 这里的这个 /api 是proxy跨域代理的配置
        // baseURL = 'http://localhost:3001/api';
    }
    if (env === 'test') {
        baseURL = urls.test;
    }
    if (env === 'prod') {
        baseURL = urls.prod;
    }
    if (env === 'test_new') {
        baseURL = urls.test_new;
    }
    return baseURL;

})(env);

export {
    headers,
    baseURL,
    downLoadAppURL
};
