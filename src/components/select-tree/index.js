import SelectTree from './select-tree.vue'

export default {
  ...SelectTree,
  install: Vue => Vue.component(SelectTree.name, SelectTree),
}
