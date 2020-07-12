import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import TabbedWorkspace from '..'
import BasicStory from './basic.vue'
import SlotsStory from './slots.vue'
import CreateStory from './create.vue'
import SelfCloseStory from './self-close'

Vue.use(TabbedWorkspace)

storiesOf('Components|TabbedWorkspace', module)
  .add('基本使用', () => BasicStory)
  .add('左右 slot', () => SlotsStory)
  .add('创建标签', () => CreateStory)
  .add('自定义关闭工作区+右键', () => SelfCloseStory)
