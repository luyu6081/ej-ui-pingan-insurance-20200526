<script lang="jsx">
  import svg4everybody from 'svg4everybody'

  import {getFlag, setFlag} from './flags'
  import icons from './icons.svg'

  // 第一次注册组件时应用 SVG polyfill（伺候老不死的 IE 用）
  if (!getFlag('installed')) {
    svg4everybody()
    setFlag('installed', true)
  }

  export default {
    name: 'EjIcon',

    functional: true,

    render: (h, {data: $data, props: $props}) => {
      const {iconSet, icon} = $props

      const $svgData = {
        ...$data,
        class: ['ej-icon'].concat($data.staticClass, $data.class),
      }

      const $useAttrs = {
        'xlink:href': icon.indexOf('#') > 0 ? icon : `${iconSet || icons}#${icon}`,
      }

      return (
        <svg {...$svgData}>
          <use {...{attrs: $useAttrs}}/>
        </svg>
      )
    },
  }
</script>

<style>
  .ej-icon {
    width: 24px;
    height: 24px;
  }
</style>
