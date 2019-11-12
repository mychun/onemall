import { loadUserInfo } from '@/utils/cache'
const state = {
    Authorization: loadUserInfo.Authorization,
    avatar: loadUserInfo.avatar,
    nickName: loadUserInfo.nickName
}
export default state