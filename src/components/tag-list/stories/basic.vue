<template>
  <div class="pt-5">
    <ej-tag-list v-model="data"
                 @tag-create="handleTagCreate"
                 @tag-score="handleTagScore"
                 @tag-remove="handleTagRemove"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: [{
          id: '1151396597607698434',
          name: 'dsfds',
          removable: true,
          score: 100,
          voted: true,
        }],
      }
    },

    methods: {
      handleTagCreate (val) {
        this.data.push({
          id: '1151396597607698434',
          name: val,
          removable: true,
          score: 1,
          voted: true,
        })
      },
      handleTagScore (tag, idx) {
        tag.voted = !tag.voted
        if (tag.voted) {
          tag.score++
        } else {
          tag.score--
        }
        this.$set(this.data, idx, tag)
      },
      handleTagRemove (tag, idx) {
        this.data.splice(idx, 1)
      },
    },
  }
</script>
