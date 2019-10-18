import axios from 'axios'
// create an axios instance

const service = axios.create({
    baseURL: 'http://192.168.1.102:8080/', // api 的 base_url
    timeout: 5000 // request timeout
  })
export default service