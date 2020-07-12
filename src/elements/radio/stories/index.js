import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import Radio from '..'
import BasicStory from './basic.vue'

Vue.use(Radio)

storiesOf('Elements|Radio', module)
  .add('基本用法', () => BasicStory)
