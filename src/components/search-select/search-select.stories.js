import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import SearchSelect from '.'
import BasicStory from './stories/basic.vue'

Vue.use(SearchSelect)

storiesOf('Components|SearchSelect', module)
  .add('基本用法', () => BasicStory)