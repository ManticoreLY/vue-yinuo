<template>
    <div>
      <el-form :inline="true">
        <el-form-item label="标题">
          <el-input v-model="query.likeCondition.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="栏目">
          <el-select v-model="query.andCondition.channelId"
                     filterable
                     remote
                     reserve-keyword
                     placeholder="请输入栏目"
                     :remote-method="remoteMethod"
                     :loading="loading">
            <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="success" @click="addNew">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList" :default-sort="{ prop: 'updatedDt', order: 'descending' }">
        <el-table-column label="排序" prop="idx" sortable width="80">
          <template slot-scope="scope">
            <!--            <el-tag type="primary" @click.stop="modifyIdx">{{ scope.row.idx}}</el-tag>-->
            <el-input v-model="scope.row.idx" @blur="saveIndex(scope.row)" style="width: 65px"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="发布" prop="idx" sortable width="80">
          <template slot-scope="scope">
            <!--            <el-tag type="primary" @click.stop="modifyIdx">{{ scope.row.idx}}</el-tag>-->
            <el-switch v-model="scope.row.enable" @change="saveEnable(scope.row)" style="width: 50px"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="频道栏目" prop="channel.name">
          <!--<template slot-scope="scope">-->
            <!--{{channels[scope.$index]}}-->
          <!--</template>-->
        </el-table-column>
        <el-table-column label="内容摘要" prop="abstractText" width="360"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="阅读量" prop="readCount"></el-table-column>
        <el-table-column label="更新时间" prop="updatedDt" sortable></el-table-column>
        <el-table-column label="操作" width="360">
          <template slot-scope="scope">
            <router-link tag="a" target="_blank" :to="'/articleInfo/' + scope.row.id">
              <el-button type="primary" size="small">预览</el-button>
            </router-link>&nbsp;&nbsp;
            <el-button v-if="scope.row.isScroll === 0" type="success" size="small" @click="setScrollUp(scope.row, 1)">设置滚动</el-button>
            <el-button v-else type="info" size="small" @click="setScrollUp(scope.row, 0)">取消滚动</el-button>
            <el-button type="warning" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="toDelete(scope.row.id, scope.$index)">删除</el-button>
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
      <el-dialog :title="formTitle" :visible.sync="editFormVisible" :before-close="handleFormClose" width="60%">
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
            type: 0
          },
          orderByCondition: {
            updatedDt: false
          }
        },
        page: {},
        name: '',
        tableList: [],
        channels: [],
        channelId: '',
        loading: false,
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
        this.$nextTick(() => {
          if (this.query.andCondition.channelId) {
            this.$refs['editForm'].addForm({ channelId: this.query.andCondition.channelId, channel: this.channels.filter(one => one.id === this.query.andCondition.channelId)[0] })
          } else {
            this.$refs['editForm'].addForm()
          }
        })
      },
      toEdit(entity) {
        this.formTitle = '编辑'
        this.editFormVisible = true
        this.$nextTick(() => {
          this.$refs['editForm'].editForm(entity)
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            ChannelApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }, andCondition: { type: 0 }}).then(data => {
              this.channels = data.obj.records
            }).catch(err => {
              console.log(err)
              this.$message.warning(err.msg)
            })
          }, 200)
        } else {
          this.channels = []
        }
      },
      saveIndex(entity) {
        ArticlesApi.update(entity).then().catch(err => {
          console.log(err)
          this.$message.info('已保存')
        })
      },
      saveEnable(entity) {
        ArticlesApi.update(entity).then().catch(err => {
          console.log(err)
          this.$message.info('已保存')
        })
      },
      toDelete(id, index) {
        this.$confirm('', '请确认删除?', {}).then(() => {
          ArticlesApi.remove(id).then(data => {
            console.log(data)
            this.$message.success('删除成功')
            this.tableList.splice(index, 1)
          }).catch(err => {
            console.log(err)
            this.$message.warning('操作失败')
          })
        })
      },
      setScrollUp(entity, status) {
        this.$confirm('', '请确认当前的操作?', '').then(() => {
          entity = Object.assign(entity, { isScroll: status })
          ArticlesApi.update(entity).then(() => {
            this.$message.success('操作成功! 请刷新主页')
          }, err => {
            console.log(err)
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
