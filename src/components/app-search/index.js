import AppSearch from './app-search.vue'

export default {
  ...AppSearch,
  install: Vue => Vue.component(AppSearch.name, AppSearch),
}
