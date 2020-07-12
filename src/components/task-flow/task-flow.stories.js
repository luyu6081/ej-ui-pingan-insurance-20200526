import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import {testImg} from '../../assets/base64'
import TaskFlow from '.'

Vue.use(TaskFlow)

const data = [
  {
    title: '工单初审', // 必须的
    type: 3, // 必须的 站内信
    tasks: [{
      user_img: testImg,
      user_name: '李帅123',
      user_id: 1,
      timestamp: '2018-04-15T00:00:00',
    }, {
      user_img: testImg,
      user_name: '李帅123',
      user_id: 1,
      timestamp: '2018-04-15T00:00:00',
    }],
  },
  {
    title: '工单初审', // 必须的
    type: 3, // 必须的 站内信
    tasks: [{
      user_img: testImg,
      user_name: '李帅123',
      timestamp: '2018-05-15T00:00:00',
    }],
  },
  {
    title: '审核中',
    type: 2,
    tasks: [{
      user_img: testImg,
      user_name: '李帅123',
    }],
  },
  {
    title: '待审核',
    type: 1,
    tasks: [],
  },
]
const dataError = [
  {
    title: '工单初审', // 必须的
    type: 3, // 必须的 站内信
    tasks: [{
      user_img: testImg,
      user_name: '李帅123',
      timestamp: '2018-05-15T00:00:00',
    }],
  },
  {
    title: '驳回',
    type: 4,
    tasks: [{
      user_img: testImg,
      user_name: '李帅123',
      timestamp: '2018-06-15T00:00:00',
    }],
  },
  {
    title: '待审核',
    type: 1,
  },
]

storiesOf('Components|TaskFlow', module)
  .add('基本使用', () => ({
    template: `
      <ej-task-flow :data="data" @nag="nag"/>
    `,
    props: {
      data: {
        default: data,
      },
    },
    methods: {
      nag (data) {
        console.log(data)
      },
    },
  }))
  .add('驳回', () => ({
    template: `
      <ej-task-flow :data="data" @email="email"/>
    `,
    props: {
      data: {
        default: dataError,
      },
    },
    methods: {
      email (data) {
        console.log(data)
      },
    },
  }))
