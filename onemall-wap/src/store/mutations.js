import * as types from './mutation-types'

const mutations = {
    [types.SET_AUTHORIZATION](state, Authorization) {
        state.Authorization = Authorization
    },
    [types.SET_AVATAR](state, avatar) {
        state.avatar = avatar
    },
    [types.SET_NICKNAME](state, nickName) {
        state.nickName = nickName
    }
}

export default mutations