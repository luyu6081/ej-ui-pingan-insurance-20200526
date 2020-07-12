import SearchList from './search-list.vue'

export default {
  ...SearchList,
  install: Vue => Vue.component(SearchList.name, SearchList),
}
