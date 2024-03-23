import { baseUrl } from "./env";

import axios from "axios";

const service = axios.create({
    // process.env.NODE_ENV === 'development'来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了 
    baseURL: baseUrl,
    timeout: 5000
});

// 添加请求拦截器
service.interceptors.request.use(

    // 在发送请求之前做些什么
    config => {
        return config; I
    },

    // 对请求错误做些什么 
    error => {
        console.log(error);
        return Promise.reject();
    });


// 添加响应拦截器
service.interceptors.response.use(
    // 对响应数据做点什么 
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    //对响应错误做点什么 
    error => {
        console.log(error);
        return Promise.reject();
    }
);