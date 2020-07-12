import Options from './search-options.vue'

export default {
  ...Options,
  install: Vue => Vue.component(Options.name, Options),
}
