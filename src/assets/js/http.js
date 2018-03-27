import axios from 'axios'
import router from '../../router/index'

const apiURL = 'http://data.estore.ai:8080'
const cameURL = 'http://estore.ai'

// axios.defaults.baseURL = ''
// const baseURL = window.location.origin
if (process.env.NODE_ENV != 'development') {
  axios.interceptors.request.use((config) => {
    if( config.url.match(/^\/camera\/api/) ){
      config.baseURL = cameURL
      console.log(config.baseURL+'========='+cameURL)
      config.url = config.url.replace(/^\/camera/, '')
    } else if( config.url.match(/^\/api/) ){
      config.baseURL = apiURL
      console.log(config.baseURL+'========='+apiURL)
      config.url = config.url.replace(/^\/api/, '')
    }
    return config
  })
}

axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true // 开启cookie

/* 请求 request 拦截器 */
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      if(config.data){
        let data = config.data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        config.data = ret.slice(0, ret.length - 1)
        config.url += '?' + config.data
      }
    }
    if (config.method === 'get') {
      if(config.data){
        let data = config.data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        config.data = ret.slice(0, ret.length - 1)
        config.url += '?' + config.data
      }
    }
    return config
 
}, (error) => {
  alert('错误的传参', 'fail')
  return Promise.reject(error)
})

/* 反应 response 拦截器 */
axios.interceptors.response.use((response) => { // 7token不存在
  if (response.data.code == 9 || response.data.code == 8 || response.data.code == 7) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')
      // router.replace({
      //     path: '/login',
      //     query: {redirect: router.currentRoute.fullPath}
      // })
      return Promise.reject(response.data.msg)
  } else {
      return response
  }
}, (error) => {
  console.log(error)
})

function http(url, method, params) {
  let met = ''
  if(method != 'post'){
    met = 'get'
  }else {
    met = 'post'
  }
  if(params){
    return new Promise((resolve, reject) => {
    axios({
      method: met
      ,url: url
      ,data: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
  }else{
    return new Promise((resolve, reject) => {
    axios({
        method: met
        ,url: url
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  
}


// localhost:8080/api/echarts
export default {

  appData() {
    return http('/api/data.json', 'get')
  }
}