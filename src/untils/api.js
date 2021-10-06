import axios from 'axios'
import { acosh } from 'core-js/fn/number'
import {Message} from 'element-ui'
import router from '../router';

// 请求拦截器;
axios.interceptors.request.use(config=>{
   if(window.sessionStorage.getItem('token')){
       config.headers['Authorization'] = window.sessionStorage.getItem('token');
   }
   return config;
},error => {
   console.log(error);
})


// 相应拦截器
axios.interceptors.response.use(success => {
    if(success.status && success.status == 200){
        if(success.data.code == 500 || success.data.code==401 || success.data.code == 403){
            Message.error({message:success.data.message});
            return;
        }
        if(success.data.message){
            Message.success({message:success.data.message});
        }
    }
    return success.data;
},error => {
    if(error.response.code == 504 || error.response.code ==404){
        Message.error({message:"服务器异常"});
    }else if(error.response.code == 403){
        Message.error({message:"权限不足"})
    }else if(error.response.code == 401){
        Message.success({message:success.data.message});
        router.replace('/');
    }else{
        if(error.response.data.message){
            Message.error({message:success.data.message});
        }else{
            Message.error({message:"未知错误"});
        }
    }
})

let base = ''

export const postRequest = (url,params) => {
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}

export const putRequest = (url,params) => {
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
}