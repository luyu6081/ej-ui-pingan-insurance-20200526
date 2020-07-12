import Collapses from './collapses.vue'

export default {
  ...Collapses,
  install: Vue => Vue.component(Collapses.name, Collapses),
}
