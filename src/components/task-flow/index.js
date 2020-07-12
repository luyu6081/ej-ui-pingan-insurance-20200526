import TaskFlow from './task-flow.vue'

export default {
  ...TaskFlow,
  install: Vue => Vue.component(TaskFlow.name, TaskFlow)
}
