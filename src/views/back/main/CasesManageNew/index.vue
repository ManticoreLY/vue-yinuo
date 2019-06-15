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
      <el-table :data="tableList">
        <el-table-column type="expand">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="频道栏目" prop="channel.name">
          <!--<template slot-scope="scope">-->
            <!--{{channels[scope.$index]}}-->
          <!--</template>-->
        </el-table-column>
        <el-table-column label="内容摘要" prop="abstractText"></el-table-column>
        <el-table-column label="时间" prop="updatedDt"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="来源" prop="source"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px"
                     background
                     :page-size="page.size"
                     :current-page="page.current"
                     :total="page.total"
                     layout="total, prev, pager, next"
                     @current-change="handlePageChange"
                     @size-change="handleSizeChange"></el-pagination>
      <el-dialog :title="formTitle" :visible.sync="editFormVisible" :before-close="handleFormClose">
        <edit-form ref="editForm" @close="handleFormClose"></edit-form>
      </el-dialog>
    </div>
</template>

<script>
  import ArticlesApi from '@/api/articles'
  import ChannelApi from '@/api/channel'
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
            type: 1
          }
        },
        page: {},
        name: '',
        tableList: [],
        formTitle: '',
        editFormVisible: false
      }
    },
    created() {
      this.search()
    },
    methods: {
      ...page(),
      search() {
        ArticlesApi.queryPage(this.query).then(data => {
          this.page = Object.assign(this.page, data.obj)
          this.tableList = data.obj.records
        }).catch(err => {
          console.log(err)
        })
      },
      addNew() {
        this.formTitle = '添加'
        this.editFormVisible = true
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
          ArticlesApi.delete(id).then(data => {
            console.log(data)
            this.$message.success('删除成功')
          }).catch(err => {
            console.log(err)
            this.$message.warning('操作失败')
          })
        })
      },
      async channel_formatter(row) {
        var name = ''
        if (row.channelId) {
          await ChannelApi.getEntity(row.channelId).then(data => {
            if (data.obj) {
              name = data.obj.name
            } else {
              return '频道错误'
            }
          }).catch(err => {
            console.log(err)
          })
        }
        debugger
        return name
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
