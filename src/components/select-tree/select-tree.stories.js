import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import SelectTree from '.'
import BasicStory from './stories/basic.vue'

Vue.use(SelectTree)

storiesOf('Components|SelectTree', module)
  .add('基本使用', () => BasicStory)
