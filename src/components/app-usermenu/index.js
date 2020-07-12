import AppUsermenu from './app-usermenu.vue'

export default {
  ...AppUsermenu,
  install: Vue => Vue.component(AppUsermenu.name, AppUsermenu),
}
