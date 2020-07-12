import SearchSelect from './search-select.vue'

export default {
  ...SearchSelect,
  install: Vue => Vue.component(SearchSelect.name, SearchSelect),
}
