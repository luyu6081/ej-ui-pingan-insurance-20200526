import Item from './index.vue'

export default {
  ...Item,
  install: Vue => Vue.component(Item.name, Item),
}
