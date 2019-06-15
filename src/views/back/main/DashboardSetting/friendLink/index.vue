<template>
    <div>
      <el-form :inline="true" label-width="60px">
<!--        <el-form-item label="名称">-->
<!--          <el-input v-model="query.likeCondition.linkName"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="类型">-->
<!--          <el-select v-model="query.andCondition.type">-->
<!--            <el-option v-for="(opt, index) in linkTypes" :key="index" :label="opt.name" :value="opt.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item>
<!--          <el-button type="primary" @click="search">查询</el-button>-->
          <el-button type="success" @click="addNew">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableList">
        <el-table-column label="链接名" prop="linkName"></el-table-column>
        <el-table-column label="类型" :formatter="type_format"></el-table-column>
        <el-table-column label="LOGO">
          <template slot-scope="scope">
            <el-image :src="scope.row.img" ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="链接地址" prop="linkUrl"></el-table-column>
        <el-table-column label="操作">
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
  import FriendLinkApi from '@/api/HomePage/FriendLink'
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
        linkTypes: [
          { value: 1, name: '战略合作伙伴' },
          { value: 2, name: '媒体合作伙伴' },
          { value: 3, name: '链接聚合' },
          { value: 4, name: '友情链接' }
        ],
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
        FriendLinkApi.queryPage(this.query).then(data => {
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
          FriendLinkApi.remove(id).then(data => {
            console.log(data)
            this.$message.success('删除成功')
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
