<script lang="jsx">
  import Vue from 'vue'
  import {Menu as ElMenu} from 'element-ui'
  import CollapsesButton from './collapses-btn'

  Vue.use(CollapsesButton)

  const _classNameVertical = {
    main: 'ej-nav-menu__vertical',
  }

  const _classNameHorizontal = {
    main: 'ej-nav-menu',
  }

  let _defaultMode = 'horizontal'

  export default {
    name: 'EjNavMenu',

    functional: true,

    render: (h, {parent, props, data, slots, children, listeners}) => {

      let { mode, collapse, toggleButton } = props

      if (!mode) {
        mode = _defaultMode
        console.warn(`EjNavMenu: 建议手动设置mode，否则会默认为 horizontal`)
      }

      const _mode = mode === _defaultMode
      const _collapse = typeof(collapse) !== 'undefined'
      const _toggleButton =  typeof(toggleButton) !== 'undefined' ? toggleButton : true

      const collapsesComp = (<CollapsesButton {...{props, on: listeners}}/>)

      const _staticClass = _mode ? _classNameHorizontal : _classNameVertical

      data.staticClass = (data.staticClass || '') + ` ${_staticClass.main}`

      return (
            _mode ?
            <ElMenu {...{...data, ...props}}>{children}</ElMenu>
            :
            <ElMenu {...{...data, ...props}}>
              <div v-show={_collapse && _toggleButton}>{collapsesComp}</div>
              {children}
            </ElMenu>
      )
    },
  }
</script>

<style lang="scss">

  $menu-layout--gray-darkest: #161616;
  $menu-layout--gray-darker: #262626;
  $menu-layout--gray-dark: #525252;
  $menu-layout--gray-lighter: #F4F4F4;
  $menu-layout--blue: #0C64EB;
  $menu-layout--blue-lighter: #D0E2FF;
  $menu-layout--white: #fff;
  $menu-layout--size-18: 18px;

  @mixin ej-nav-menu__vertical--padding-class {
    padding-left: 24px !important;
    padding-right: 24px !important;
    i:first-child {
      padding-right: 16px !important;
    }
  }
  @mixin ej-nav-menu__vertical--font-class ($active-bg-color:$menu-layout--blue, $active-font-color:$menu-layout--white) {
    @apply font-medium;
    font-size: $menu-layout--size-18;
    color: $menu-layout--gray-darkest;
    background: transparent;

    .ej-icon {
      width: 20px;
      height: 20px;
    }
    &.is-active {
      color: $active-font-color;
      background: $active-bg-color;

      &:hover {
        &, & > i {
          color: $active-font-color;
        }
      }
    }
    &:hover {
      color: $menu-layout--blue;
      & > i {
        color: $menu-layout--blue;
      }
    }
  }

  .ej-nav-menu {
    &__vertical {
      @apply z-10 relative;

      padding-top: 26px;
      box-shadow: 6px 0px 16px -8px rgba(0,0,0,0.2);
      &:not(.el-menu--collapse) {
        width: 300px;
      }

      .el {
        &-submenu__title, &-menu-item {
          @include ej-nav-menu__vertical--padding-class;
        }
        &-menu-item {
          @include ej-nav-menu__vertical--font-class;
        }
        &-submenu {
          &__title {
            @include ej-nav-menu__vertical--font-class;
            span + i {
              right: 24px;
            }
          }
          &.is-active {
            background: $menu-layout--gray-lighter;
          }
          .el-menu-item {
            color: $menu-layout--gray-darker;
            &.is-active {
              @apply text-white;
            }
            &:not(.is-active):hover {
              color: $menu-layout--blue;
              & > i {
                color: $menu-layout--blue;
              }
            }
          }
          &__icon-arrow {
            @apply text-base;
            color: $menu-layout--gray-dark;
          }
          .el-menu--inline {
            li {
              padding-left: 64px !important;
            }
          }
        }
      }

      &.el-menu--collapse {
        width: 78px;
        .el {
          &-submenu {
            &.is-active {
              background: $menu-layout--blue;
              .el-submenu__title i {
                @apply text-white;
              }
            }
            .el-menu-item {
              color: $menu-layout--gray-darker;
              &.is-active {
                @apply text-white;
              }
            }
          }
          &-menu-item:not(.is-active):hover {
            background: $menu-layout--gray-lighter;
            & > i {
              background: $menu-layout--gray-lighter;
            }
          }
        }
      }
    }

    &.el-menu {
      background: #1F2E4D;

      &.el-menu--horizontal {
        @apply border-b-0 flex;

        > * {
          margin-left: 50px;
          opacity: .65;
          padding: 0 12px;

          &:first-child {
            margin-left: 0;
          }

          &:hover,
          &.is-opened,
          &.is-active {
            opacity: 1;
          }
          &.is-active {
            background: rgba(255, 255, 255, .1) !important;
          }
        }

        > .el-menu-item,
        > .el-submenu .el-submenu__title {
          @apply p-0 border-b-0;

          height: inherit;
          font-size: 16px;
          line-height: inherit;

          &:hover,
          &:focus {
            background: transparent;
          }
        }

        > .el-menu-item {
          padding: 0 12px;

          &.is-active {
            @apply border-0;
            background: rgba(255, 255, 255, .1) !important;
          }
        }

        > .el-submenu {
          .el-submenu__title {
          }
        }
      }
    }

    @at-root .ej-app-logo + & {
      margin-left: 172px;
    }
  }
</style>
