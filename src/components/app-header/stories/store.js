import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: 0,
    notiInfomation: [],
    notiNotify: [],
    notiCommission: [],
  },
  mutations: {
    setNotifications (state, data) {
      state.notifications = data
    },
    setInfomation (state, data) {
      state.notiInfomation = data
    },
    setNotify (state, data) {
      state.notiNotify = data
    },
    setCommission (state, data) {
      state.notiCommission = data
    },
  },
})
