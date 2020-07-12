import TabbedWorkspace from './tabbed-workspace'

export default {
  ...TabbedWorkspace,
  install: Vue => Vue.component(TabbedWorkspace.name, TabbedWorkspace),
}
