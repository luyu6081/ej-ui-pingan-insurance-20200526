import {storiesOf} from '@storybook/vue'
import {text} from '@storybook/addon-knobs'
import Vue from 'vue'

import TextRenderer from '.'

Vue.use(TextRenderer)

storiesOf('Components|TextRenderer', module)
  .add('基本用法', () => ({
    template: `
      <ej-text-renderer :value="value"/>
    `,
    props: {
      value: {
        default: text('Value', 'Hello @world !'),
      },
    },
  }))
