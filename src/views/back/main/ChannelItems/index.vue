<template>
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="query.likeCondition.name" placeholder="请输入查询关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="success" @click="addNew">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" @expand-change="handleExpand" :default-sort="{ prop: 'id', order: 'descending' }">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <ol>
              <li v-for="a in articleList" :key="a.id">
                <router-link tag="a" target="_blank" :to="`/articleInfo/${a.id}`">{{ a.title }}</router-link>
              </li>
            </ol>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="更新时间" prop="updatedDt" sortable></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="toDelete(scope.row.id, scope.$index)">删除</el-button>
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
  import ChannelApi from '@/api/channel'
  import ArticleApi from '@/api/articles'
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
          },
          likeCondition: {
            name: ''
          },
          andCondition: {
            type: 0
          }
        },
        page: {},
        name: '',
        tableList: [],
        articleList: [],
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
        ChannelApi.queryPage(this.query).then(data => {
          this.page = Object.assign(this.page, data.obj)
          this.tableList = data.obj.records
        }).catch(err => {
          console.log(err)
        })
      },
      handleExpand(row, expandedRow) {
        if (expandedRow.length === 0) return
        else if (expandedRow.length > 1) expandedRow.shift()
        const query = Object.assign(this.query, { andCondition: { channel_id: row.id }})
        ArticleApi.queryPage(query).then(data => {
          this.articleList = data.obj.records
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
      toDelete(id, index) {
        this.$confirm('', '请确认删除?', {}).then(() => {
          ChannelApi.remove(id).then(data => {
            console.log(data)
            this.$message.success('删除成功')
            this.tableList.splice(index, 1)
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
