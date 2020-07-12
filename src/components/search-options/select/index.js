import Select from './index.vue'

export default {
  ...Select,
  install: Vue => Vue.component(Select.name, Select),
}
