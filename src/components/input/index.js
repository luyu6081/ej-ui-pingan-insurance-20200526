import input from './input.vue'

export default {
  ...input,
  install: Vue => Vue.component(input.name, input),
}
