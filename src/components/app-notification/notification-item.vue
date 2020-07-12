<template>
  <div class="notice-wrapper">
    <div v-if="list && list.length > 0">
      <ul class="notice-ul overflow-auto m-0 p-0">
        <li v-for="item in list"
            :key="item.id"
            class="cursor-pointer border-b border-solid border-gray-light notice-li clearfix"
            @click="handleDetail(item)">
          <i class="notice-head-img bg-gray-light rounded-full float-left"></i>

          <div class="notice-content float-left">
            <p class="m-0 p-0 text-gray-darker text-base truncate">{{item.title}}</p>
          </div>

          <span class="notice-time text-gray-dark text-sm float-right">{{item.publishTm | relativeFormatDate}}</span>
        </li>
      </ul>

      <div class="border-t border-solid border-gray-light cursor-pointer">
        <a href="javascript:" class="notice-btn" @click="handleClear">清空{{text}}</a>
        <a href="javascript:;" class="notice-btn look-more">查看更多</a>
        <!-- <router-link :to="{name: moreRouter}" class="notice-btn look-more">查看更多</router-link> -->
      </div>
    </div>

    <div v-else class="notice-no-data text-gray-dark text-center">暂无{{text}}</div>
  </div>
</template>

<script>
  import {relativeFormatDate} from '../../utils/date'

  export default {
    name: 'NotificationItem',

    props: {
      list: Array,
      type: String,
      text: String,
      moreRouter: String,
    },

    filters: {
      relativeFormatDate,
    },

    methods: {
      handleDetail (item) {
        this.$emit('detail', item)
      },

      handleClear () {
        this.$emit('clear', this.type)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .notice {
    &-btn {
      @apply bg-white text-sm text-gray-darker text-center inline-block;

      padding: 8px 0;
      width: 49%;

      &:hover {
        @apply text-blue;
      }
    }

    &-li {
      padding: 10px 25px;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #e9f8ff;
        transition: .4s;
      }
    }

    &-head-img {
      width: 24px;
      height: 24px;
    }

    &-content {
      margin-left: 10px;
      max-width: 138px;
      line-height: 24px;
    }

    &-time {
      line-height: 24px;
    }

    &-ul {
      max-height: 246px;
    }

    &-no-data {
      padding: 12px;
      height: 200px;
    }
  }
</style>
