<template>
  <el-popover v-bind="$attrs" trigger="hover" class="ej-popcard">
    <template #reference>
      <slot name="img"></slot>
    </template>
    <div class="popcard-box-postcard bg-white">
      <div class="item item-title">
        <span v-if="imgUrl" :style="{backgroundImage: `url(${imgUrl})`}" class="card-img"></span>
        <ej-icon v-else icon="user" class="card-img img-def"></ej-icon>
        <a :href="href" class="user-name">{{title}}</a>
        <slot name="action"/>
      </div>
      <slot name="main"/>
    </div>
  </el-popover>
</template>

<script>
  import {Popover} from 'element-ui'
  import Icon from '../icon'

  export default {
    name: 'EjPopcard',

    components: {
      [Popover.name]: Popover,
      [Icon.name]: Icon,
    },

    props: {
      imgUrl: {
        type: String,
      },
      href: {
        type: String,
        default: 'javascript:',
      },
      title: {
        type: String,
      },
      width: {
        type: Number,
        default: 272,
      },
    },
  }
</script>

<style lang="scss">
  .popcard-box-postcard {
    & {
      @apply text-gray-darker;
    }

    .item {
      display: flex;
      align-items: center;
    }

    .card-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-size: cover;
    }

    .img-def {
      width: 16px;
    }

    .user-name {
      font-size: 14px;
      color: #477de9;
      margin-left: 5px;
      flex: 1;
    }
  }
</style>
