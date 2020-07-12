import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import EjInput from '.'
import BasicStory from './stories/basic.vue'
import Numbertory from './stories/number.vue'
import DebounceStory from './stories/debounce.vue'
import ThrottleStory from './stories/throttle.vue'

Vue.use(EjInput)

storiesOf('Components|Input', module)
  .add('基本用法', () => BasicStory)
  .add('仅限数字', () => Numbertory)
  .add('防抖输入', () => DebounceStory)
  .add('节流输入', () => ThrottleStory)