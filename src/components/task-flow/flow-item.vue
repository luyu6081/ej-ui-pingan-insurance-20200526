<template>
  <div class="ej-flow-item" :class="`flow-${TaskType[data.type].toLowerCase()}`">
    <div class="left">
      <ej-popcard :img-url="data.user_img" :title="data.title">
        <template slot="img">
          <div class="circle mb-2">
            <ej-icon :icon="icon" class="circle-icon"/>
          </div>
        </template>
        <template slot="action">
          <a v-if="data.type === TaskType.Starting"
             href="javascript:"
             class="ml-1 text-blue"
             @click="nag">催一下</a>
        </template>
        <template slot="main">
          <div class="user-list">
            <ej-info-list v-for="(item, idx) in taskList" :key="idx" :data="item" class="user-item mt-1">
              <template slot="name" slot-scope="row">
                <div class="name-self">
                  <span v-if="row.item.user_img" :style="{backgroundImage: `url(${row.item.user_img})`}" class="other-img" ></span>
                  <img v-else src="../../assets/icon-account.svg" class="other-img img-def">
                  <span class="name-self-text">{{row.item.value}}</span>
                  <a href="javascript:" @click="email">
                    <ej-icon icon="mail" class="icon-email"/>
                  </a>
                </div>
              </template>
            </ej-info-list>
          </div>
        </template>
      </ej-popcard>
      <div class="title">{{data.title}}</div>
    </div>
    <span v-if="hasNext" class="right">
      <ej-icon icon="right" class="icon"/>
    </span>
  </div>
</template>

<script>
  import {formatDate, typeofData} from '../../utils'
  import {TaskType} from '../../enums'

  import Icon from '../icon'
  import Popcard from '../popcard'
  import InfoList from '../info-list'

  export default {
    name: 'EjFlowItem',

    components: {
      [Icon.name]: Icon,
      [Popcard.name]: Popcard,
      [InfoList.name]: InfoList,
    },

    props: {
      data: {
        type: Object,
      },
      hasNext: {
        type: Boolean,
      },
    },

    data () {
      return {
        TaskType,
      }
    },

    computed: {
      icon () {
        switch (this.data.type) {
          case TaskType.Error: return 'close'
          case TaskType.Success: return 'check'
          default: return 'more'
        }
      },
      taskList () {
        return (typeofData(this.data.tasks) === 'Array' && this.data.tasks.length) ? this.data.tasks.map((item) => {
          return [
            {name: '操作人', value: item.user_name, slotName: 'name', user_img: item.user_img},
            {name: '操作时间', value: formatDate(item.timestamp)},
          ]
        }) : [[
          {name: '操作人', value: ''},
          {name: '操作时间', value: ''},
        ]]
      },
    },

    methods: {
      nag () {
        this.$emit('nag', this.data)
      },
      email () {
        // this.$emit('email', this.data)
        /*
        * todo: 全局站内信
        **/
      },
    },
  }
</script>

<style lang="scss">
  .ej-flow-item {
    display: inline-flex;
    margin-bottom: 10px;

    &.flow-starting {
      .circle {
        border-color: theme('colors.yellow.default');
        .circle-icon{
          background: theme('colors.yellow.default');
        }
      }
    }

    &.flow-error {
      .circle {
        border-color: theme('colors.red.default');
        .circle-icon{
          background: theme('colors.red.default');
        }
      }
    }

    &.flow-success {
      .circle {
        border-color: theme('colors.blue.default');
        .circle-icon{
          background: theme('colors.blue.default');
        }
      }

      .icon {
        color: theme('colors.blue.default');
      }
    }

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid theme('colors.gray.light');
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      .circle-icon{
        background: theme('colors.gray.light');
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 5px;
        color: theme('colors.white');
      }
    }

    .title {
      height: 17px;
      line-height: 17px;
      font-size: theme('fontSize.sm');
      color: theme('colors.gray.darker');
    }

    .right {
      height: 30px;
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: center;
    }

    .icon {
      width: 20px;
      color: theme('colors.gray.light');
    }

    .icon-email {
      color: theme('colors.blue.default');
      width: 18px;
      height: 15px;
    }

    .name-self {
      display: flex;
      flex: 1;
      align-items: center;

      .name-self-text {
        flex: 1;
      }
    }

    .common-popcard .user-name {
      cursor: inherit;
      color: theme('colors.gray.darkest');
    }
    .common-popcard{
      .card-img{
        display: none;
      }
      .user-name{
        margin-left: 0;
      }
    }

    .other-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-size: cover;
    }

    .img-def {
      width: 16px;
    }
    .user-list{
      .user-item{
        border-bottom: 1px solid theme('colors.gray.default');
      }
      :last-child{
        border-color: transparent;
      }
    }
  }
</style>
