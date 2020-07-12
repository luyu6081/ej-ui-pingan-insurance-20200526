import {storiesOf} from '@storybook/vue'
import {boolean} from '@storybook/addon-knobs'
import Vue from 'vue'
import {Button} from 'element-ui'

import tailwindConfig from '../../../tailwind.config'
import {cloneDeep} from '../../utils'
import Timeline from '.'

Vue.use(Timeline)

const data = [
  {
    timestamp: '2018-04-13T12:23:34.567',
    title: '通过审核',
    desc: '不知道为什么但就是通过了',
  },
  {
    timestamp: '2018-04-12T20:46:23',
    title: '创建成功',
  },
  {
    timestamp: '2018-04-14',
    title: '活动进行中',
    files: [
      {
        href: '/file1',
        name: '活动照片1.jpg',
        type: 3,
        size: 123,
      },
      {
        href: '/file2',
        name: '活动照片2.jpeg',
        type: 3,
        size: 4200,
      },
      {
        href: '/file3',
        name: '节目表.pdf',
        type: 1,
        size: 2340000,
      },
    ],
  },
  {
    timestamp: '2018-04-15T00:00:00',
    title: '活动结束',
    desc: '活动圆满结束',
    files: [
      {
        href: '/file4',
        name: '活动纪要和录像.zip',
        type: 2,
        size: 2000000,
      },
    ],
  },
]

storiesOf('Components|Timeline', module)
  .add('基本用法', () => ({
    template: `
      <ej-timeline :data="data" :descending="descending" :hide-timestamp="hideTimestamp" placement="top"/>
    `,
    props: {
      data: {
        default: data,
      },
      descending: {
        default: boolean('descending', false),
      },
      hideTimestamp: {
        default: boolean('是否隐藏时间戳', false),
      },
    },
  }))
  .add('自定义节点样式', () => ({
    template: `
      <ej-timeline :data="data"/>
    `,
    props: {
      data: {
        default: () => {
          const clone = cloneDeep(data)
          clone[3].color = tailwindConfig.theme.extend.colors.green.default
          return clone
        },
      },
    },
  }))
  .add('数据更新', () => ({
    template: `
      <div>
        <ej-timeline :data="data"/>
        <el-button @click="add" type="primary" size="small">添加数据</el-button>
      </div>
    `,
    components: {
      [Button.name]: Button,
    },
    data () {
      return {
        data: [
          {
            timestamp: '2018-04-12T20:46:23',
            title: '创建成功',
          },
          {
            timestamp: '2019-05-29T18:06:27',
            title: '初审',
          },
        ],
      }
    },
    methods: {
      add () {
        this.data.push({
          timestamp: new Date(),
          title: '初审',
        })
      },
    },
  }))
