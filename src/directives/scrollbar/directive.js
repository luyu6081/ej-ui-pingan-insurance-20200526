import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

const elScrollBar = (el, settings={}) => {
  el._ps_ instanceof PerfectScrollbar ? el._ps_.update() : el._ps_ = new PerfectScrollbar(el, settings)
}

let _perfectEvent = [
  'ps-scroll-y', // 当y轴沿任一方向滚动时，会触发此事件
  'ps-scroll-x', // 当x轴沿任一方向滚动时，将触发此事件
  'ps-scroll-up', // 向上滚动时触发此事件
  'ps-scroll-down', // 向下滚动时触发此事件
  'ps-scroll-left', // 向左滚动时触发此事件
  'ps-scroll-right', // 向右滚动时触发此事件
  'ps-y-reach-start', // 滚动到达y轴的起点时，将触发此事件
  'ps-y-reach-end', // 滚动到达y轴的末端时触发此事件（对无限滚动很有用）
  'ps-x-reach-start', // 滚动到达x轴的起点时将触发此事件
  'ps-x-reach-end', // 滚动到达x轴的末端时触发此事件
]

const directive = {
  name: 'EjScrollbar',

  bind: (el, binding, vnode) => {
    console.log("binding", binding)
    // 添加各种事件监听
    for(const item of _perfectEvent) {
      el.addEventListener(item, function (e) {
        vnode.context.$emit(item, {event: e})
      })
    }
  },

  // 使用inserted钩子（初次创建dom）获取使用自定义指令处的dom
  inserted: (el, binding) => {
    const positionValue = ['fixed', 'absolute', 'relative']
    if (!positionValue.includes(window.getComputedStyle(el, null).position)) {
      console.error(`v-scrollBar指令所在的dom, position属性值必须是以下之一：${positionValue.join(' ')}`)
    }

    elScrollBar(el, {...binding.value})
  },

  // 更新dom的时执行该钩子
  componentUpdated: (el, binding) => {
    try {
      Vue.nextTick(() => {
        elScrollBar(el, {...binding.value})
      })
    } catch (error) {
      console.error(error)
      elScrollBar(el, {...binding.value})
    }
  },

  // 指令与元素解绑时执行该钩子
  unbind: el => {
    el._ps_.destroy()
    el._ps_ = null
  },
}

export default directive
