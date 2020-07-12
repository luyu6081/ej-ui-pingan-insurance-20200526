import PopoverSet from './popover-set.vue'

export default {
  ...PopoverSet,
  install: Vue => Vue.component(PopoverSet.name, PopoverSet),
}
