<template>
  <div class="timeline-view">
    <el-timeline>
      <el-timeline-item v-for="(it, idx) in data$"
                        :key="idx"
                        :color="it.color"
                        :timestamp="it.timestamp | formatDate"
                        v-bind="$attrs"
                        placement="top">
        <div>
          <div v-if="!hasMore(it)" class="title">
            <span class="text">{{it.title}}</span>
          </div>
          <div v-else :class="{active: showMap[`${idx}_${it.timestamp}`]}">
            <div class="title">
              <a href="javascript:" class="text" @click="show(it, idx)">
                <span>{{it.title}}</span>
                <i class="el-icon-arrow-down icon"></i>
              </a>
            </div>
            <transition @before-enter="el => el.style.height = 0"
                        @enter="el => el.style.height = el.scrollHeight + 'px'"
                        @leave="el => el.style.height = 0">
              <div v-show="showMap[`${idx}_${it.timestamp}`]" class="more-box">
                <div class="desc mb-1">{{it.desc}}</div>
                <div v-for="(file, idx) in (it.files || [])" :key="idx" class="mb-1">
                  <a :href="file.href" class="download">
                    <ej-icon :icon="file.type | icon" class="icon-file"/>
                    <span class="text">{{file.name}}</span>
                    <span class="size">{{file.size | humanize}}</span>
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import {Timeline, TimelineItem} from 'element-ui'

  import {FileType} from '../../enums'
  import {formatDate, humanizeFileSize} from '../../utils'
  import Icon from '../icon'

  const FileTypeIcon = {
    [FileType.Text]: 'textfile',
    [FileType.Archive]: 'folder',
    [FileType.Image]: 'image',
  }

  export default {
    name: 'EjTimeline',

    components: {
      [Timeline.name]: Timeline,
      [TimelineItem.name]: TimelineItem,
      [Icon.name]: Icon,
    },

    filters: {
      formatDate,
      icon: type => FileTypeIcon[type],
      humanize: val => humanizeFileSize(val),
    },

    props: {
      data: {
        type: Array,
        default: () => [],
      },
      descending: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        showMap: {},
      }
    },

    computed: {
      data$ () {
        return [...this.data].sort((a, b) => {
          const _a = new Date(a.timestamp)
          const _b = new Date(b.timestamp)
          return this.descending ? _b - _a : _a - _b
        })
      },
    },

    methods: {
      hasMore (item) {
        return (item.desc || item.files || '').length
      },

      show (item, idx) {
        const key = `${idx}_${item.timestamp}`
        this.$set(this.showMap, key, !this.showMap[key])
      },
    },
  }
</script>

<style lang="scss">
  .timeline-view {
    .icon {
      margin-left: 5px;
    }

    a, a:hover, a:active {
      color: theme('colors.gray.darkest');
    }

    .icon {
      transition: all .1s ease-in-out;
    }

    .active {
      .icon {
        transform: rotate(180deg);
      }
    }

    .more-box {
      overflow: hidden;
      transition: all .3s ease-in-out;
    }

    .download {
      display: inline-flex;
      align-items: center;
      color: theme('colors.blue.default');

      .text {
        margin: 0 10px 0 5px;
      }

      .icon-file {
        width: 12px;
        height: 12px;
        color: theme('colors.gray.default');
      }
    }

    .download:hover, .download:active {
      color: theme('colors.blue.default');
      text-decoration: underline;
    }
  }
</style>

<style lang="scss">
  .timeline-view {
    .el-timeline-item__wrapper {
      top: 0;
    }

    .el-timeline-item__timestamp.is-top {
      padding-top: 0;
    }
  }
</style>
