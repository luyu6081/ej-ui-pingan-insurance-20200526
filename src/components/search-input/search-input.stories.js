import {storiesOf} from '@storybook/vue'
import {text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import SearchInput from '.'

Vue.use(SearchInput)

storiesOf('Components|SearchInput', module)
  .add('基本用法', () => ({
    template: `
      <ej-search-input v-model="model" clearable :placeholder="placeholder" @search="search"/>
    `,
    props: {
      placeholder: {
        default: text('Placeholder', '请输入关键词'),
      },
    },
    data () {
      return {
        model: '',
      }
    },
    methods: {
      search (...args) {
        action('search')(...args)
      },
    },
  }))
