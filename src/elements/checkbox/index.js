import ECheckbox from './checkbox.vue'

export default {
  ...ECheckbox,
  install: Vue => Vue.component(ECheckbox.name, ECheckbox),
}
