<template>
  <div class="app-usermenu">
    <el-popover
      placement="bottom"
      trigger="click"
      :visible-arrow="false"
      v-model="userMenuVisible"
      popper-class="usermenu-wrapper">
      <div class="ej-app-user" slot="reference">
        <!-- <img :src="avatar$ || require('../../assets/icon-account.svg')"
             alt=""
             class="ej-app-user__avatar flex-none rounded-full bg-white"
             :class="{'mr-2': user$.name}"> -->
        <img v-if="avatar$"
             :src="avatar$"
             alt=""
             class="ej-app-user__avatar flex-none rounded-full"
             :class="{'mr-2': user$.name}">
        <img v-else
             src="../../assets/icon-account.svg"
             class="ej-app-user__avatar flex-none rounded-full bg-white"
             :class="{'mr-2': user$.name}">
     
        <span v-if="user$.name" class="flex-none">{{user$.name}}</span>
      </div>
      <div class="menu-wrap" @click="userMenuVisible = false">
        <ul>
          <li class="tenant-name" v-show="user$.tenantName">{{user$.tenantName}}</li>
          <li class="divider" v-if="!noUc"></li>
          <li v-if="!noUc">
             <!-- :class="**.indexOf('uc') >= 0 ? 'active' : ''" -->
            <a :href="ucUrl$" target="_blank" class="system-name">个人中心</a>
          </li>
          <li>
            <slot name="menu-slot"/>
          </li>
          <li class="divider"></li>
          <li>
            <a href="javascript:" @click="handleLogout">退出</a>
          </li>
        </ul>
      </div>
    </el-popover>
  </div>
</template>

<script>
  import {MessageBox as ElMessageBox, Popover as ElPopover} from 'element-ui'
  import MessageUtil from '../../utils/message'

  import LOGOUT from './graphql/logout.gql'

  const LOGOUT_MSG = {
    messageSuccessText: '退出成功',
    messageErrorText: '退出失败，请重新操作',
  }

  export default {
    name: 'EjAppUsermenu',

    components: {
      ElPopover,
    },

    props: {
      user: {
        type: Object,
        default: () => ({}),
      },

      endpoint: {
        type: Object,
        required: true,
      },

      noUc: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        userMenuVisible: false,
      }
    },

    computed: {
      $header () {
        let target = this.$parent
        while (target && target.$options.name !== 'EjAppHeader' && target !== this.$root) {
          target = target.$parent
        }
        return target
      },

      user$ () {
        return JSON.stringify(this.user) !== '{}' ? this.user : this.$header.user
      },

      avatar$ () {
        let curAvatar = this.user$.avatar
        if (curAvatar) {
          curAvatar = curAvatar.startsWith('http') ? curAvatar : `${this.endpoint.avatarUrl}?ambryId=${curAvatar}&show=true`
        }
        return curAvatar
      },

      ucUrl$ () {
        // 区分环境是否是jinxin.cloud；待完善客户配置的环境情况？
        let curHost = window.location.host
        if (curHost.indexOf('jinxin.cloud') >= 0) {
          if (curHost.indexOf('dev') >= 0) {
            return 'http://uc.dev.jinxin.cloud/'
          } else if (curHost.indexOf('demo') >= 0) {
            return 'http://uc.demo.jinxin.cloud/'
          } else {
            return 'http://uc.jinxin.cloud/'
          }
        } else if (curHost.indexOf('localhost') >= 0) {
          return 'http://uc.dev.jinxin.cloud/'
        } else {
          console.log('待完善当前环境。。。')
        }
      }
    },

    methods: {
      handleLogout () {
        ElMessageBox.confirm('是否退出该系统？', '提示', {
          type: 'warning',
          center: true,
        }).then(() => {
          this.logout()
        }).catch(() => {})
      },

      logout () {
        this.$apollo.mutate({
          mutation: LOGOUT,
          fetchPolicy: 'no-cache',
          client: this.endpoint.client,
        }).then((data) => {
          if (data.data.data) {
            if (this.endpoint.logoutUrl) {
              location.href = `${this.endpoint.logoutUrl}`
            } else {
              let login_url = `${this.endpoint.loginUrl}?redirect_url=${encodeURIComponent(location.href)}`
              location.href = login_url
            }
          }
        }).catch((error) => {
          MessageUtil.MessageError(LOGOUT_MSG)
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../app-header/variables';

  .app-usermenu {
    .ej-app-user {
      @apply flex-none flex items-center;

      margin-right: 0;
      cursor: pointer;

      &__avatar {
        width: 26px;
        height: 26px;
      }
    }
  }

  .usermenu-wrapper {
    padding: 0 !important;
    border: none;

    .menu-wrap {
      @apply text-white;

      background-color: #1F2E4D;
      border-radius: 4px;

      ul {
        padding: 6px 0;
      }

      li {
        list-style: none;

        a {
          padding: 7.5px 20px;
          display: block;
          width: 100%;

          &:hover, &.active {
            @apply bg-blue;
          }
        }

        &.tenant-name {
          @apply text-blue;

          padding: 7.5px 20px;
          font-size: 12px;

          &:hover {
            background-color: transparent;
            cursor: text;
          }
        }

        &.divider {
          height: 1px;
          margin: 2px 0;
          padding: 0;
          background-color: #2C3A57;

          &:hover {
            background-color: transparent;
            cursor: default;
          }
        }
      }
    }
  }
</style>
