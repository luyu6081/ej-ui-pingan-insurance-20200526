<script lang="jsx">
  function tokenize (source) {
    const re = /(^| )(@\S+)/g
    const tokens = []

    let lastToken = null
    let lastMatch = null

    while ((lastMatch = re.exec(source)) !== null) {
      if (lastMatch.index) {
        const originalStart = lastToken ? lastToken.originalEnd : 0
        const originalEnd = lastMatch.index + lastMatch[1].length

        tokens.push({
          type: 'text',
          value: source.slice(originalStart, originalEnd),
          originalStart,
          originalEnd,
        })
      }

      const token = lastToken = {
        type: 'user',
        value: lastMatch[2],
        originalStart: lastMatch.index + lastMatch[1].length,
        originalEnd: re.lastIndex,
      }
      tokens.push(token)
    }

    // 如果没有匹配到任何一个 User Mention
    if (!tokens.length) {
      tokens.push({
        type: 'text',
        value: source,
        originalStart: 0,
        originalEnd: source.length - 1,
      })
    }
    // 如果最后一个 User Mention 不在文本串末尾，需要提取剩余文本
    else {
      // istanbul ignore else
      if (lastToken.originalEnd < source.length - 1) {
        tokens.push({
          type: 'text',
          value: source.slice(lastToken.originalEnd),
          originalStart: lastToken.originalEnd,
          originalEnd: source.length - 1,
        })
      }
    }

    return tokens
  }

  export default {
    name: 'EjTextRenderer',

    functional: true,

    render: (h, {props}) => {
      const {value} = props

      const paragraphs = value ? value.trim().split(/\n\s*/) : []

      function markupParagraph (pSource) {
        return tokenize(pSource).map(t => {
          switch (t.type) {
            case 'user':
              return <span class="mention-user">{t.value}</span>
            default:
              return t.value
          }
        })
      }

      return (
        <article class="ej-text-renderer">
          {paragraphs.map(pSource => pSource ? <p>{markupParagraph(pSource)}</p> : null)}
        </article>
      )
    },
  }
</script>

<style lang="scss">
  .ej-text-renderer {
    line-height: 1.5;

    p {
      margin: 1em 0;
    }

    .mention-user {
      @apply bg-blue text-white;

      padding: .1em .3em;
      border-radius: 2px;
    }
  }
</style>
