import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import TextEditor from '.'

Vue.use(TextEditor)

storiesOf('Components|TextEditor', module)
  .add('基本用法', () => ({
    template: `
      <ej-text-editor/>
    `,
  }))
