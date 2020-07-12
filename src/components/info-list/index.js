import InfoList from './info-list.vue'

export default {
  ...InfoList,
  install: Vue => Vue.component(InfoList.name, InfoList),
}
