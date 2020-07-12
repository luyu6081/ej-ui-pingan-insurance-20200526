import SearchInput from './search-input.vue'

export default {
  ...SearchInput,
  install: Vue => Vue.component(SearchInput.name, SearchInput),
}
