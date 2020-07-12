import {storiesOf} from '@storybook/vue'
import {boolean, number} from '@storybook/addon-knobs'
import Vue from 'vue'

import InfoList from '.'

Vue.use(InfoList)

storiesOf('Components|InfoList', module)
  .add('基本使用', () => ({
    template: `
      <ej-info-list :data="data" :columns="columns" :is-vertical="isVertical"/>
    `,
    props: {
      data: {
        default: Array.from({length: 5}).map((_, idx) => ({
          name: 'Item ' + (idx + 1),
          value: 'Value ' + (idx + 1),
        })),
      },
      columns: {
        default: number('Columns', 3),
      },
      isVertical: {
        default: boolean('isVertical', false),
      },
    },
  }))
  .add('统一自定义value', () => ({
    template: `
      <ej-info-list :data="data" :columns="columns" :is-vertical="isVertical">
        <span slot="item" slot-scope="row">{{row.item.value + row.item.name}}</span>
      </ej-info-list>
    `,
    props: {
      data: {
        default: Array.from({length: 5}).map((_, idx) => ({
          name: 'Item ' + (idx + 1),
          value: 'Value ' + (idx + 1),
        })),
      },
      columns: {
        default: number('Columns', 3),
      },
      isVertical: {
        default: boolean('isVertical', false),
      },
    },
  }))
  .add('自定义单个value', () => ({
    template: `
      <ej-info-list :data="data" :columns="columns" :is-vertical="isVertical">
        <span slot="test" slot-scope="row">{{row.item.name}}</span>
        <span slot="test1">1</span>
      </ej-info-list>
    `,
    props: {
      data: {
        default: [
          {
            name: '我是谁',
            value: '张无忌张无忌',
          },
          {
            name: '年龄',
            value: '30岁',
          },
          {
            name: '功夫',
            value: '九阳神功',
            slotName: 'test',
          },
          {
            name: '功夫',
            value: '九阳神功',
            slotName: 'test1',
          },
        ],
      },
      columns: {
        default: number('Columns', 3),
      },
      isVertical: {
        default: boolean('isVertical', false),
      },
    },
  }))
