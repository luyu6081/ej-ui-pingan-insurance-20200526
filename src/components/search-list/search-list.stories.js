import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import EjSearchList from '.'
import BasicStory from './stories/basic.vue'
import CustomStory from './stories/custom.vue'

Vue.use(EjSearchList)

storiesOf('Components|SearchList', module)
  .add('基本用法', () => BasicStory)
  .add('自定义组件', () => CustomStory)
