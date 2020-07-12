import Tree from './tree.vue'

export default {
  ...Tree,
  install: Vue => Vue.component(Tree.name, Tree),
}
