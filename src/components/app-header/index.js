import AppHeader from './app-header.vue'

export default {
  ...AppHeader,
  install: Vue => Vue.component(AppHeader.name, AppHeader),
}