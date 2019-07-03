<template>
    <div>
      <el-form :inline="true" label-width="120px">
        <el-form-item>
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="success" @click="addNew">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" :default-sort="{ prop: 'updatedDt', order: 'descending' }">
        <el-table-column label="新闻ID" prop="newsArticleId" sortable></el-table-column>
        <el-table-column label="模块名称" prop="typeName">
        </el-table-column>
        <el-table-column label="新闻title" prop="newsArticleTitle">
        </el-table-column>
        <el-table-column label="跳转地址" prop="url"></el-table-column>
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
      <el-dialog :title="formTitle" :visible.sync="editFormVisible"  :before-close="handleFormClose">
        <edit-form ref="editForm" @close="handleFormClose"></edit-form>
      </el-dialog>
    </div>
</template>

<script>
  import HomeNewsArticleApi from '@/api/HomePage/NewsArticle'
  import EditForm from './edit'
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
          },
          likeCondition: {
            name: ''
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
      search() {
        HomeNewsArticleApi.queryPage(this.query).then(data => {
          this.page = Object.assign(this.page, data.obj)
          this.tableList = data.obj.records
        }).catch(err => {
          console.log(err)
        })
      },
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
          HomeNewsArticleApi.remove(id).then(data => {
            console.log(data)
            this.$message.success('删除成功')
            this.search()
          }).catch(err => {
            console.log(err)
            this.$message.warning('操作失败')
          })
        })
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
