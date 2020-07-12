import ERadio from './radio.vue'

export default {
  ...ERadio,
  install: Vue => Vue.component(ERadio.name, ERadio),
}
