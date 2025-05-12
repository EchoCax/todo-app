// 引用axios
import axios from "axios";

const token = '123456';

// 创建实例
const request = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 2000
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 响应拦截器
request.interceptors.response.use(
    response => {
        return response.data; // 只返回后端的data部分
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;
