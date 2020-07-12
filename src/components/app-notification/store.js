import Vue from 'vue'
import Vuex from 'vuex'

import {messages, notifications, todos} from './mock-data'

Vue.use(Vuex)

export const Mutation = {}

export default new Vuex.Store({
  state: {
    notifications,
    messages,
    todos,
  },

  getters: {
    notificationCount: state => state.notifications.length,
    messageCount: state => state.messages.length,
    todoCount: state => state.todos.length,
    totalCount: (_, getters) => getters.notificationCount + getters.messageCount + getters.todoCount,
  },

  mutations: {
    [Mutation.setNotifications = 'setNotifications'] (state, data) {
      state.notifications = data
    },
    [Mutation.setMessages = 'setMessages'] (state, data) {
      state.messages = data
    },
    [Mutation.setTodos = 'setTodos'] (state, data) {
      state.todos = data
    },
  },
})
