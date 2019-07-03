<template>
    <div>
      <el-form :inline="true" label-width="60px">
          <el-button type="success" @click="addNew">添加</el-button>
      </el-form>
      <el-table :data="tableList" :default-sort="{ prop: 'updatedDt', order: 'descending' }">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image :src="scope.row.img"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="更新时间" prop="updatedDt" sortable></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="warning" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background style="margin-top: 20px;"
                     :current-page="page.current"
                     :page-size="page.size"
                     :total="page.total"
                     @current-change="handlePageChange"
                     @size-change="handleSizeChange"
                     layout="total, prev, pager, next">
      </el-pagination>
      <el-dialog :title="formTitle" :visible.sync="editFormVisible" :before-close="handleFormClose">
        <edit-form ref="editForm" @close="handleFormClose"></edit-form>
      </el-dialog>
    </div>
</template>

<script>
  import TCApi from '@/api/HomePage/TreatmentCase'
  // import caseApi from '@/api/cases'
  import EditForm from './edit'
  import page from '@/utils/page'
  export default {
    name: 'index',
    components: {
      EditForm
    },
    data() {
      return {
        query: {
          pageObj: {
            current: 1,
            size: 10
          }
        },
        page: {},
        name: '',
        tableList: [],
        formTitle: [],
        editFormVisible: false
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      ...page(),
      search() {
        TCApi.queryPage(this.query).then(data => {
          const _this = this
          this.page = Object.assign(this.page, data.obj)
          // (async function() {
          //   for (var t = 0; t < data.obj.records.length; t++) {
          //     await _this.getCaseInfo(data.obj.records[t].treatmentCaseId).then(result => {
          //       data.obj.records[t] = Object.assign(data.obj.records[t], result)
          //     })
          //   }
          // })()
          _this.tableList = data.obj.records
        }).catch(err => {
          console.log(err)
        })
      },
      /*
      getCaseInfo(caseId) {
        return new Promise(resolve => {
          caseApi.getEntity(caseId).then(data => {
            resolve(data.obj)
          }).catch(err => {
            console.log(err)
          })
        })
      },*/
      addNew() {
        this.formTitle = '添加'
        this.editFormVisible = true
        this.$nextTick(() => {
          this.$refs['editForm'].addForm()
        })
      },
      toEdit(entity) {
        this.formTitle = '编辑'
        this.editFormVisible = true
        this.$nextTick(() => {
          this.$refs['editForm'].editForm(entity)
        })
      },
      toDelete(id) {
        this.$confirm('', '请确认删除?', {}).then(() => {
          TCApi.remove(id).then(data => {
            console.log(data)
            this.$message.success('删除成功')
            this.handleFormClose()
          }).catch(err => {
            console.log(err)
            this.$message.warning('操作失败')
          })
        })
      },
      type_format(row) {
        return this.linkTypes.find(item => item.value === row.type).name
      },
      handleFormClose() {
        this.editFormVisible = false
        this.$refs['editForm'].clearForm()
        this.search()
      }
    }
  }
</script>

<style scoped>

</style>
