import {storiesOf} from '@storybook/vue'
import {number, text, withKnobs} from '@storybook/addon-knobs'
import Vue from 'vue'

import {logo} from '../../assets/base64'
import Popcard from '.'

Vue.use(Popcard)

const data = {
  name: '李帅123',
  img: logo,
  phone: 18732700123,
}

storiesOf('Components|Popcard', module)
  .addDecorator(withKnobs)
  .add('基本使用', () => ({
    template: `
      <ej-popcard :img-url="imgUrl" :title="title" :width="width">
        <template slot="img">
          <img style="width: 25px; height: 25px" :src="imgUrl">
        </template>
      </ej-popcard>
    `,
    props: {
      title: {
        default: text('title', data.name),
      },
      imgUrl: {
        default: text('img-url', data.img),
      },
      width: {
        default: number('width', 272),
      },
    },
  }))
  .add('slot', () => ({
    template: `
      <ej-popcard :img-url="data.img" :title="data.name">
        <template slot="img">
          <img style="width: 25px; height: 25px" :src="data.img">
        </template>
        <template slot="action">
          <div href="javascript:" class="ml-2">操作插槽</div>
        </template>
        <template slot="main">
          <div href="javascript:" class="pt-3">详情插槽</div>
        </template>
      </ej-popcard>
    `,
    props: {
      data: {
        default: data,
      },
    },
  }))
