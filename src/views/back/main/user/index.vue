<template>
    <div id="user">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input v-model="query.likeCondition.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initPage">查询</el-button>
          <el-button type="success" @click="addNew">添加用户</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="page.records">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="名称" prop="username"></el-table-column>
        <el-table-column label="帐号" prop="signName"></el-table-column>
        <el-table-column label="角色" prop="type" :formatter="role_formatter"></el-table-column>
        <el-table-column label="是否过期">
          <template slot-scope="scope">
            {{ scope.row.accountNonExpired ? '已过期': '未过期' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="warning" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px;"
                     background
                     :page-size="page.size"
                     :current-page="page.current"
                     :total="page.total" :page-count="page.pages"
                     layout="prev, pager, next"
                     @current-change="handlePageChange"
                     @size-change="handleSizeChange">
      </el-pagination>
      <el-dialog :title="formTitle" :visible.sync="editFormVisible" width="50%">
        <edit-form ref="editForm" @close="handleFormClose"></edit-form>
      </el-dialog>
    </div>
</template>

<script>
  import UserApi from '@/api/user'
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
            username: ''
          }
        },
        page: {},
        name: '',
        formTitle: '',
        tableData: [
          { username: '管理员', signName: 'admin', role: 2 },
          { username: '普通用户', signName: 'user1', role: 1 }
        ],
        editFormVisible: false
      }
    },
    mounted() {
      this.initPage()
    },
    methods: {
      ...page(),
      initPage() {
        const _this = this
        UserApi.queryPage(_this.query).then(data => {
          _this.page = Object.assign({}, data.obj)
        }).catch(err => {
          console.log(err)
          this.$message.error(err.msg)
        })
      },
      addNew() {
        this.formTitle = '添加'
        this.editFormVisible = true
        this.$nextTick(() => {
          this.$refs['editForm'].addForm()
        })
      },
      toEdit(row) {
        this.formTitle = '编辑'
        this.editFormVisible = true
        this.$nextTick(() => {
          this.$refs['editForm'].editForm(row)
        })
      },
      toDelete(id) {
        if (id === 1) {
          this.$message.warning('默认帐号不能删除!')
          return
        }
        this.$confirm('', '确认删除该用户?', {}).then(() => {
          UserApi.remove(id).then(data => {
            console.log(data)
            this.$message.success('删除成功')
          }).catch(err => {
            console.log(err)
            this.$message.warning('操作失败')
          })
        })
      },
      role_formatter(row) {
        if (row.type === 1) {
          return '普通用户'
        } else {
          return '管理员'
        }
      },
      handleFormClose() {
        this.editFormVisible = false
        this.initPage()
      }
    }
  }
</script>

<style scoped>

</style>
