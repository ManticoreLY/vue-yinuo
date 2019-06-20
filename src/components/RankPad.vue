<template>
  <div style="width: 50%" v-if="isShow">
    <el-table ref="table" :data="dataListInner" @selection-change="handleSelectChange">
      <el-table-column type="selection" :reserve-selection="true"></el-table-column>
<!--      <el-table-column v-for="f in fields" :key="f.key" :label="f.key" :prop="f.key"></el-table-column>-->
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column width="120">
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="upward">上移</el-button>
          <el-button type="text" @click="downward">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div style="margin: 20px;" v-if="saveButton">-->
      <!--<el-button type="primary" size="small" @click="save">保存</el-button>-->
    <!--</div>-->
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
        dataListInner: [],
        selection: {},
        index: -1
      }
    },
    computed: {
      fields() {
        if (this.isShow) {
          return [...this.dataList[0]]
        }
      }
    },
    watch: {
      dataList() {
        this.dataListInner = this.dataList
        if (this.selection) {
          // this.selection = this.dataListInner.filter(one => one.id === this.selection.id)
          this.$refs.table.toggleRowSelection(this.dataListInner.filter(one => one.id === this.selection.id)[0], true)
        }
      },
      dataListInner: 'isShow'
    },
    methods: {
      isShow() {
        return this.dataListInner && this.dataListInner.length
      },
      handleSelectChange(val) {
        if (val.length === this.dataListInner.length) {
          this.$refs['table'].clearSelection()
          this.$message.warning('只能选择一条记录！')
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
        this.index = this.dataListInner.findIndex(item => item === this.selection)
      },

      upward() {
        if (this.index > 0) {
          const obj = this.dataListInner[this.index - 1]
          this.dataListInner.splice(this.index - 1, 1)
          this.dataListInner.splice(this.index, 0, obj)
          this.index--
          this.save()
        } else {
          this.$message.warning('当前是第一个元素，不能再上移！')
        }
      },
      downward() {
        if (this.index < this.dataListInner.length - 1) {
          const obj = this.dataListInner[this.index + 1]
          this.dataListInner.splice(this.index + 1, 1)
          this.dataListInner.splice(this.index, 0, obj)
          this.index++
          this.save()
        } else {
          this.$message.warning('当前是最后一个元素，不能再下移！')
        }
      },
      save() {
        this.dataListInner = this.dataListInner.map((item, index) => {
          return Object.assign(item, { index: index + 1 })
        })
        this.$emit('returnData', this.dataListInner)
      }
    }
  }
</script>

<style scoped>

</style>
