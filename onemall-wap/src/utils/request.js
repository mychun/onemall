import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8080/', // api 的 base_url
  timeout: 5000 // request timeout
})

export default service