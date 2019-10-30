import axios from 'axios';
import {toast, confirm} from '@/components/dialog';
// create an axios instance

const service = axios.create({
  baseURL: 'http://192.168.1.102:8080/', // api 的 base_url
  timeout: 5000 // request timeout
})

//toast.warning('warning提示');
/**
confirm({
  text: '警告',
  confirm(){
      console.log('confirm1')
  },
  cancel(){
    console.log('cancal1')
  }
});
 */

export default service