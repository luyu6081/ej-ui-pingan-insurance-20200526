import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import TagList from '.'
import BasicStory from './stories/basic.vue'

Vue.use(TagList)

storiesOf('Components|TagList', module)
  .add('基本使用', () => BasicStory)
