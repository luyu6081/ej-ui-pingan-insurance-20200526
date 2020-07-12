<template>
  <div>
    <ej-search-input v-model="keywords"
                        width="100%"
                        height="34"
                        placeholder="请输入搜索条件"
                        @search="search" />
    <ej-tree ref="tree"
            :data="data"
            :filter="filter"
            default-expand-all />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        keywords: null,
        data: [
          {
            id: '0',
            label: '北京市',
            children: [
              {
                id: '00001',
                label: '北京市',
                children: [
                  {id: '000010001', label: '朝阳区'},
                  {id: '000010002', label: '海淀区', disabled: true},
                  {id: '000010003', label: '东城区'},
                ],
              },
            ],
          },
        ],
      }
    },
    methods: {
      search (...args) {
        this.$refs['tree'].tree.filter(args[0])
      },
      filter ({value, data}) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
    },
  }
</script>
