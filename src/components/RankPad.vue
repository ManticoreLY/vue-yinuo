<template>
  <div style="width: 50%" v-if="isShow">
    <el-table ref="table" :data="dataList" @selection-change="handleSelectChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column v-for="f in fields" :key="f.key" :label="f.value" :prop="f.key"></el-table-column>
      <el-table-column width="120">
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="upward">上移</el-button>
          <el-button type="text" @click="downward">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px;">
      <el-button type="primary" size="small" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rank',
    props: {
      dataList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        selection: {},
        index: -1
      }
    },
    computed: {
      fields() {
        if (this.isShow) {
          return { ...this.dataList[0] }
        }
      }
    },
    watch: {
      dataList: 'isShow'
    },
    methods: {
      isShow() {
        return this.dataList && this.dataList.length
      },
      handleSelectChange(val) {
        if (val.length === this.dataList.length) {
          this.$refs['table'].clearSelection()
          this.$message.warning('只能选择一个！')
        }
        val.forEach((row, index) => {
          if (val.length === 2) {
            if (index === 0) {
              this.$refs['table'].toggleRowSelection(row)
              this.selection = val[1]
            }
          } else {
            this.selection = val[0]
          }
        })
        this.index = this.dataList.findIndex(item => item === this.selection)
      },

      upward() {
        if (this.index > 0) {
          const obj = this.dataList[this.index - 1]
          this.dataList.splice(this.index - 1, 1)
          this.dataList.splice(this.index, 0, obj)
          this.index = this.dataList.findIndex(item => item === this.selection)
        } else {
          this.$message.warning('当前是第一个元素，不能再上移！')
        }
      },
      downward() {
        if (this.index < this.dataList.length - 1) {
          const obj = this.dataList[this.index + 1]
          this.dataList.splice(this.index + 1, 1)
          this.dataList.splice(this.index, 0, obj)
          this.index = this.dataList.findIndex(item => item === this.selection)
        } else {
          this.$message.warning('当前是最后一个元素，不能再下移！')
        }
      },
      save() {
        this.dataList = this.dataList.map((item, index) => {
          return { ...item, index: index + 1 }
        })
        this.$emit('returnData', this.dataList)
      }
    }
  }
</script>

<style scoped>

</style>
