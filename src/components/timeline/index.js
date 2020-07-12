import Timeline from './timeline.vue'

export default {
  ...Timeline,
  install: Vue => Vue.component(Timeline.name, Timeline),
}
