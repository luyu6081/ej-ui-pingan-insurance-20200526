import NavSubmenu from '../nav-menu/nav-submenu.vue'

export default {
  ...NavSubmenu,
  install: Vue => Vue.component(NavSubmenu.name, NavSubmenu),
}
