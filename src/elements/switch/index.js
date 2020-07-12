import ESwitch from './switch.vue'

export default {
  ...ESwitch,
  install: Vue => Vue.component(ESwitch.name, ESwitch),
}
