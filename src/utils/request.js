// 引用axios
import axios from "axios"
const token = '123456'

const request = axios.create({
    baseURL: "http://localhost:8080/api", // 直接指定后端地址
    timeout: 2000, // 响应时间
    
})
// 请求拦截器
request.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;   
})

// 响应拦截器
request.interceptors.response.use(response => {
    config.headers['Authorization'] = `Bearer ${token}`;
    return response.data;
})

export default request