import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import Checkbox from '..'
import BasicStory from './basic.vue'

Vue.use(Checkbox)

storiesOf('Elements|Checkbox', module)
  .add('基本用法', () => BasicStory)
