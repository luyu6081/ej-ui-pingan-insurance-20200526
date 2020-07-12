import AppSetting from './app-setting.vue'

export default {
  ...AppSetting,
  install: Vue => Vue.component(AppSetting.name, AppSetting),
}
