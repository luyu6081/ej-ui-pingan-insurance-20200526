import TextRenderer from './text-renderer.vue'

export default {
  ...TextRenderer,
  install: Vue => Vue.component(TextRenderer.name, TextRenderer),
}
