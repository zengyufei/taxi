import axios from 'axios'
import qs from 'qs'
import { Modal } from 'antd'
import { session } from '../storage'

const loginUrl = '/#/login'
const tokenName = 'token'

function setHeader(header) {
  // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
  const token = session.get(tokenName)
  token && (header.token = token)
  return header
}

// 设置全局axios默认值
axios.defaults.baseURL = process.env.BASEURL || ''
// axios.defaults.timeout = 20000 // 5000的超时验证
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 添加请求后缀
  if (!/.htm$/.test(config.url)) {
    config.url += '.htm'
  }

  setHeader(config.headers)
  // config.withCredentials = true  // 需要跨域打开此配置

  // post提交 data存在 并且 data不是FormData对象时对数据进行json化处理
  // if(config.method==='post' && config.data && config.data.constructor !== FormData){
  //   config.data = qs.stringify(config.data)
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // }

  // 开启loading动画

  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  let resData = response.data
  if (resData && resData.code && +resData.code !== 200) {
    Modal.error({ title: '出错', content: resData.msg ? resData.msg : '出现异常，但系统没有对此异常的说明', okText: '确定', maskClosable: true })
    return Promise.reject(response)
  } else if (resData && resData.code && +resData.code === 200) {
    resData.code = +resData.code
  }
  /*
  else if (resData && resData.code && +resData.code === 200) {
    resData.msg && Modal.success({ title: '成功', content: resData.msg, okText: '确定', maskClosable: true })
  }
  */
  // 关闭loading动画
  return resData
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        window.location.href = loginUrl
        break
      case 403:
        console.error('无权限')
        break
      case 404:
        console.error('系统没有该链接，请添加')
        break
      default:
        if (!/^dev/.test(process.env.NODE_ENV)) {
          const token = session.get(tokenName)
          if (token) {
            Modal.error({
              title: '异常',
              content: error.response.message,
            })
          }
        }
        break
    }
  }
  // Do something with response error
  return Promise.reject(error)
})

export default {
  setHeader,
  get(url, params) {
    delete params.type
    return axios({
      method: 'get',
      url,
      params,
    })
  },
  post(url, data) {
    delete data.type
    return axios({
      method: 'post',
      url,
      data: /^dev/.test(process.env.NODE_ENV) ? data : qs.stringify(data),
      headers: {
        'Content-Type': /^dev/.test(process.env.NODE_ENV) ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
  },
  form(url, formdata) {
    return axios({
      method: 'post',
      url,
      data: formdata,
    })
  },
}
