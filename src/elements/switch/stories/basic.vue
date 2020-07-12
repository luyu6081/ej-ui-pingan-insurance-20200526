<template>
  <div class="story-root">
    <div class="story-stage">
      <table>
        <tr>
          <td></td>
          <td><em>default</em></td>
          <td><code>disabled</code></td>
          <td><code>@change="onChange"</code></td>
        </tr>
        <tr>
          <th><em>default</em></th>
          <td><e-switch v-model="value"/></td>
          <td><e-switch v-model="value" disabled/></td>
          <td><e-switch v-model="value" @change="onChange"/></td>
        </tr>
        <tr>
          <th><code>size="small"</code></th>
          <td><e-switch v-model="value" size="small"/></td>
          <td><e-switch v-model="value" size="small" disabled/></td>
          <td><e-switch v-model="value" size="small" @change="onChange"/></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <input :id="blockFlagId" type="checkbox" v-model="blocked">
            <label :for="blockFlagId">返回 <code>false</code></label>
          </td>
        </tr>
      </table>
    </div>
    <pre class="story-state">{{JSON.stringify(storyState, null, 2)}}</pre>
  </div>
</template>

<script>
  import shortid from 'shortid'

  export default {
    data () {
      return {
        blockFlagId: shortid(),

        value: null,
        blocked: false,
      }
    },

    computed: {
      storyState () {
        return {
          value: this.value,
        }
      },
    },

    methods: {
      async onChange (val) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (this.blocked) return false
      },
    },
  }
</script>

<style lang="scss">
  .story {
    &-stage {
      padding: 40px;

      tr {
        &:first-child {
          th, td {
            padding-top: 0;
          }
        }

        &:last-child {
          th, td {
            padding-bottom: 0;
          }
        }
      }

      th, td {
        padding: 10px;

        em {
          @apply text-gray not-italic;
        }
      }

      th {
        @apply font-normal text-right;
      }
    }

    &-state {
      @apply border-t border-gray-light;

      padding: 40px;
    }

    &-control {
      @apply border-t border-gray-light;

      padding: 40px;

      &-button {
        @apply bg-gray-lighter border border-gray-light rounded px-3 py-2;

        &:active {
          @apply bg-gray-light border-gray;
        }

        &:focus {
          @apply outline-none;
        }
      }
    }
  }
</style>
