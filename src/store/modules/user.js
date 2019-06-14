import { getToken } from '@/utils/auth'
import UserApi from '@/api/user'
import { removeToken, setToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
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
    }
  }
}

export default user
