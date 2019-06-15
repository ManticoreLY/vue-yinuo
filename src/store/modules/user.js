import { getToken } from '@/utils/auth'
import { removeToken, setToken } from '@/utils/auth'
import UserApi from '@/api/user'

const user = {
  state: {
    token: getToken(),
    user: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, token) {
      return new Promise(resolve => {
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      })
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    userInfo({ commit }) {
      return new Promise((resolve, reject) => {
        UserApi.getUserInfo().then(data => {
          commit('SET_USER', data.obj)
          resolve(data.obj)
        }, err => {
          console.log(err)
          reject()
        })
      })
    }
  }
}

export default user
