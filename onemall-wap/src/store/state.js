import { loadUserInfo, loadOrder } from '@/utils/cache'
const state = {
    Authorization: loadUserInfo.Authorization,
    avatar: loadUserInfo.avatar,
    nickName: loadUserInfo.nickName,
    addressId: loadOrder.addressId
}
export default state