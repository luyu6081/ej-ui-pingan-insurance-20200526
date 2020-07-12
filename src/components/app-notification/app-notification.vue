<template>
  <el-popover placement="bottom-end"
              trigger="hover"
              popper-class="notification-wrapper"
              v-model="noticeVisible"
              @after-enter="activeName = 'first'"
              @show="(activeName = '', isPopperVisible = true, noticeVisible = true)"
              @hide="isPopperVisible = false">
    <a slot="reference" href="javascript:" class="ref">
      <el-badge :value="$store.getters.totalCount"
                :hidden="!$store.getters.totalCount"
                class="app-nav__message-btn ej-app-notification">
        <ej-icon icon="bell" class="ej-app-notification__button"/>
      </el-badge>
    </a>

    <el-tabs v-model="activeName" stretch class="notice-tabs overflow-hidden shadow-lg rounded" @tab-click="handleTabsClick">
      <el-tab-pane ref="first" name="first" :label="`通知 (${notificationCount})`">
        <notification-item v-bind="{list: notifications, type: NotificationType.Notification, text: NOTIFICATION_TYPE_NAME[NotificationType.Notification], moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>

      <el-tab-pane ref="second" name="second" :label="`消息 (${messageCount})`">
        <notification-item v-bind="{list: messages, type: NotificationType.Message, text: NOTIFICATION_TYPE_NAME[NotificationType.Message], moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>

      <el-tab-pane ref="third" name="third" :label="`待办 (${todoCount})`">
        <notification-item v-bind="{list: todos, type: NotificationType.Todo, text: NOTIFICATION_TYPE_NAME[NotificationType.Todo], moreRouter: noticeMoreRouter}"
                           @clear="handleClear"
                           @detail="handleDetail"/>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import {
    Badge as ElBadge,
    Loading,
    Popover as ElPopover,
    TabPane as ElTabPane,
    Tabs as ElTabs,
  } from 'element-ui'

  import EjIcon from '../icon'
  import MessageUtil from '../../utils/message'
  import NotificationItem from './notification-item'
  import store, {Mutation} from './store'

  const NotificationType = {
    Notification: 'Notification',
    Message: 'Message',
    Todo: 'Todo',
  }

  const NOTIFICATION_TYPE_NAME = {
    [NotificationType.Notification]: '通知',
    [NotificationType.Message]: '消息',
    [NotificationType.Todo]: '待办',
  }

  const NOTIFICATION_CLEAR_MSG = {
    messageSuccessText: '清空了',
    messageErrorText: '清空失败，请重新操作',
  }

  export default {
    store,

    name: 'EjAppNotification',

    components: {
      ElPopover,
      ElTabs,
      ElTabPane,
      ElBadge,
      EjIcon,
      NotificationItem,
    },

    data () {
      return {
        activeName: 'first',
        noticeVisible: false,
        isPopperVisible: false,

        noticeMoreRouter: 'notification',
      }
    },

    computed: {
      NotificationType: () => NotificationType,
      NOTIFICATION_TYPE_NAME: () => NOTIFICATION_TYPE_NAME,
      ...mapState([
        'notifications',
        'messages',
        'todos',
      ]),
      ...mapGetters([
        'notificationCount',
        'messageCount',
        'todoCount',
      ]),
    },

    methods: {
      handleDetail (notice) {
        console.log('notice', notice)
      },

      handleClear (type) {
        let loadingInstance = Loading.service({
          target: /** @type {HTMLElement} */ this.$refs[this.activeName].$el,
          fullscreen: true,
          text: `正在设置全部${NOTIFICATION_TYPE_NAME[type]}为已读`,
        })

        try {
          setTimeout(() => {
            loadingInstance.close()
            this.noticeVisible = false

            this.sendClearNotice(type)

            MessageUtil.MessageSuccess(NOTIFICATION_CLEAR_MSG)
          }, 1800)
        } catch (error) {
          loadingInstance.close()
          this.noticeVisible = false
          MessageUtil.MessageError(NOTIFICATION_CLEAR_MSG)
        }
      },

      sendClearNotice (type) {
        switch (type) {
          case NotificationType.Notification:
            this.$store.commit(Mutation.setNotifications, [])
            break
          case NotificationType.Message:
            this.$store.commit(Mutation.setMessages, [])
            break
          case NotificationType.Todo:
            this.$store.commit(Mutation.setTodos, [])
            break
        }
      },

      handleTabsClick (tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style lang="scss">
  @import '../app-header/variables';

  .ej-app-notification {
    &__button {
      width: $tray-icon-size;
      height: $tray-icon-size;
      transition: color $animation-duration ease-out-cubic;
    }
  }

  .notification-wrapper {
    padding: 0 !important;

    svg {
      @apply inline-block;
    }

    .el-tabs__header {
      @apply  m-0;
    }

    .el-tabs__item.is-active {
      @apply text-blue;
    }

    .el-tabs__item:hover {
      @apply text-blue;
    }

    .el-tabs__active-bar {
      @apply bg-blue;
    }

    .el-loading-spinner {
      margin-top: -30px;
    }

    .el-loading-mask {
      top: 1px;
    }
  }

  .app-nav__message-btn {
    .el-badge__content {
      @apply border-0;
    }
  }

  .notice-tabs {
    width: 336px;
  }
</style>

<style lang="scss" scoped>
  .ref {
    @apply h-full inline-block;

    font-size: 0;

    &::before {
      @apply h-full inline-block align-middle;
      content: '';
    }
  }

  .tab-label {
    @apply flex justify-center items-center h-full;

    > * {
      @apply flex-none leading-none;
    }

    &__badge {
      margin-left: .25em;
    }
  }
</style>
