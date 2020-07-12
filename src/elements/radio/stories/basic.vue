<template>
  <div class="story-root">
    <div class="story-stage">
      <table>
        <tr>
          <td></td>
          <td><em>default</em></td>
          <td><code>disabled</code></td>
        </tr>
        <tr>
          <th><em>default</em></th>
          <td>
            <e-radio id="default-1" v-model="value" value="one"/><label for="default-1">One</label>
            <br>
            <e-radio id="default-2" v-model="value" value="two"/><label for="default-2">Two</label>
            <br>
            <e-radio id="default-3" v-model="value" value="three"/><label for="default-3">Three</label>
          </td>
          <td>
            <e-radio id="disabled-1" v-model="value" value="one" disabled/><label for="disabled-1">One</label>
            <br>
            <e-radio id="disabled-2" v-model="value" value="two" disabled/><label for="disabled-2">Two</label>
            <br>
            <e-radio id="disabled-3" v-model="value" value="three" disabled/><label for="disabled-3">Three</label>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: null,
      }
    },
  }
</script>

<style lang="scss" scoped>
  label {
    @apply ml-2 align-middle;
  }
</style>
