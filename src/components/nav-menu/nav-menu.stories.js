import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import EjNavMenu from '.'
import EjNavSubmenu from '../nav-submenu'
import Horizontal from './stories/horizontal.vue'
import Vertical from './stories/vertical.vue'

Vue.use(EjNavMenu)
Vue.use(EjNavSubmenu)

storiesOf('Components|NavMenu', module)
  .add('顶栏', () => Horizontal)
  .add('侧栏', () => Vertical)
