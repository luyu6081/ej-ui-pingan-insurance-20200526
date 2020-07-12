import Card from './user-card.vue'

export default {
  ...Card,
  install: Vue => Vue.component(Card.name, Card),
}
