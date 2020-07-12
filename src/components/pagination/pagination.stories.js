import {storiesOf} from '@storybook/vue'
import {boolean, number} from '@storybook/addon-knobs'
import Vue from 'vue'

import EjPagination from '.'

Vue.use(EjPagination)

storiesOf('Components|Pagination', module)
  .add('基本使用', () => ({
    template: `
    <ej-pagination    background
                      :current-page="currentPage"
                      :page-size="pageSize"
                      :total="total"/>
    `,
    props: {
      currentPage: {
        default: number('currentPage', 3),
      },
      pageSize: {
        default: number('pageSize', 10),
      },
      total: {
        default: number('total', 1000),
      },
      isVertical: {
        default: boolean('isVertical', false),
      },
    },
  }))
