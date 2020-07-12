<template>
  <el-popover v-bind="$attrs" trigger="hover" class="ej-card">
    <template #reference>
      <slot name="img"></slot>
    </template>
    <div class="box-postcard bg-white">
      <div class="flex mb-2">
        <div class="flex items-center">
          <div v-if="data.userAvatar" :style="{backgroundImage: `url(${data.userAvatar})`}"
               class="card-img card-svg"></div>
          <ej-icon v-else icon="user" class="card-img img-def"></ej-icon>
        </div>
        <div class="flex-1 ml-2 item-height">
          <div class="text-blue mb-2 flex items-center">
            <span class="flex-1">{{data.name}}（{{data.position}}）</span>
            <a v-if="hasEmail" href="javascript:" @click="mail"><i class="el-icon-message text-2xl"></i></a>
          </div>
          <div class="mb-2 flex items-center item-height">
            <img src="../../assets/icons/icon-id.svg" class="icon-id">
            <span class="ml-2">{{data.jobNumber}}</span>
          </div>
          <div class="mb-2 flex items-center item-height">
            <img src="../../assets/icons/icon-job.svg" class="icon-job">
            <span class="ml-2">{{data.phone}}</span>
          </div>
          <div class="flex items-center item-height">
            <ej-icon icon="phone" class="icon-job"></ej-icon>
            <span class="ml-2">{{data.telephone}}</span>
          </div>
        </div>
      </div>
      <div class="mb-2 flex items-center item-height">
        <i class="el-icon-message text-4"></i>
        <span class="ml-2 mr-4">{{data.email}}</span>
        <a href="javascript:" @click="copy(data.email)"><i class="el-icon-document-copy"></i></a>
      </div>
      <div class="mb-2 flex items-center item-height">
        <i class="el-icon-menu text-4"></i>
        <span class="ml-2">{{data.department}}</span>
      </div>
      <div class="flex items-center item-height">
        <i class="el-icon-location-information text-4"></i>
        <span class="ml-2">{{data.userAddress}}</span>
      </div>
    </div>
  </el-popover>
</template>

<script>
  import {Popover} from 'element-ui'
  import Clipboard from 'clipboard'

  import Message from '../../utils/message'
  import Icon from '../icon'

  export default {
    name: 'EjUserCard',

    components: {
      [Icon.name]: Icon,
      [Popover.name]: Popover,
    },

    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      hasEmail: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      mail () {
        this.$emit('mail')
      },
      copy (text) {
        const clipboard = new Clipboard(event.target, {
          text: () => text,
        })
        clipboard.on('success', () => {
          // 成功
          Message.MessageSuccess({messageSuccessText: '复制成功'})
          clipboard.off('error')
          clipboard.off('success')
          clipboard.destroy()
        })
        clipboard.on('error', () => {
          Message.MessageError({messageSuccessText: '复制失败，请重试！'})
          clipboard.off('error')
          clipboard.off('success')
          clipboard.destroy()
        })
      },
    },
  }
</script>

<style lang="scss">
  .box-postcard {
    & {
      @apply text-gray-darker;
      min-width: 318px;
    }

    .card-img, .img-def {
      width: 80px;
      height: 80px;
    }

    .card-svg {
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: center;
    }

    .icon-svg {
      fill: theme('colors.gary.darker');
      width: 15px;
      height: 15px;
    }

    .icon-mail {
      width: 20px;
      height: 16px;
      fill: theme('colors.blue.default');
    }

    .icon-copy {
      width: 12px;
      height: 16px;
      fill: theme('colors.blue.light');
    }

    .item-height {
      @apply leading-none;
    }

    .icon-job {
      width: 16px;
      height: 15px;
    }
  }
</style>
