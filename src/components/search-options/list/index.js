import List from './index.vue'

export default {
  ...List,
  install: Vue => Vue.component(List.name, List),
}
