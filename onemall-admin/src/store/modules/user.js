import { loginByUsername } from '@/api/login'
import { setToken } from '@/utils/auth'

const user = {
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },
    actions: {
        LoginByUsername({ commit }, userInfo){
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password).then( res => {
                    const token = res.data.data.token
                    commit('SET_TOKEN', token)
                    setToken(token)
                    resolve()
                } )
                .catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default user