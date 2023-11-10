// import { loginOut } from './utils'
import axios from 'axios';

const config = {
    timeout: 150000
};

const serve = axios.create(config);

// 請求攔截器
serve.interceptors.request.use(
    config => {
        // 每次請求攜帶token
        // const token = getToken();
        // config.headers.Authorization = token;
        return config;
    },
    error => message(error)
)

// 響應攔截器
serve.interceptors.response.use(
    response => {
        /** 假設通用結構體如下
        {
           code:'1001',
           msg:'success',
           data:{
               // 返回的數據
           }
        } **/

        if (response.data.code === '1001') return response;
        // 假設登錄超時的code是 400
        if (response.data.code === '400') {
            // 做退出登錄處理
            // loginOut()
            console.log('user validate fail!');
        }
        // 如果響應失敗，不返回任何數據
    },
    error => message(error)
);

export { 
    serve
};