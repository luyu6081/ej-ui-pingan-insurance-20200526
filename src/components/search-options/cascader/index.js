import Cascader from './index.vue'

export default {
  ...Cascader,
  install: Vue => Vue.component(Cascader.name, Cascader),
}
