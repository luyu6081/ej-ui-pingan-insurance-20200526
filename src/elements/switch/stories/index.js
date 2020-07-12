import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import Switch from '..'
import BasicStory from './basic.vue'

Vue.use(Switch)

storiesOf('Elements|Switch', module)
  .add('基本用法', () => BasicStory)
