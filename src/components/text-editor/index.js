import TextEditor from './text-editor.vue'

export default {
  ...TextEditor,
  install: Vue => Vue.component(TextEditor.name, TextEditor),
}
