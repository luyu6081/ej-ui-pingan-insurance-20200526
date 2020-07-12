import AppNotification from './app-notification.vue'

export default {
  ...AppNotification,
  install: Vue => Vue.component(AppNotification.name, AppNotification),
}
