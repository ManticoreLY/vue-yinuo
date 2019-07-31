<template>
    <div>
      <div class="page">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="query.likeCondition.name" placeholder="请输入疾病名称查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="success" @click="addNew">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableList" :default-sort="{ prop: 'id', order: 'descending' }">
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="diseaseType"></el-table-column>
          <el-table-column label="症状说明" prop="instruction"></el-table-column>
          <el-table-column label="药物治疗" prop=""></el-table-column>
          <el-table-column label="说明"></el-table-column>
          <el-table-column label="更新时间" prop="updatedDt" sortable></el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click="toEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="toDelete(scope.row.id, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
import EditForm from './edit'
import DiseaseApi from '@/api/disease'
import DiseaseTypeApi from '@/api/diseaseType'
import page from '@/utils/page'
export default {
  name: 'page',
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
        orderByCondition: {
          updatedDt: false
        }
      },
      diseaseTypes: [],
      page: {},
      name: '',
      tableList: [
        { id: 1, name: '乙肝', instruction: '' }
      ],
      index: '2',
      formTitle: '',
      editFormVisible: false
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    ...page(),
    search() {
      const _t = this
      DiseaseTypeApi.queryPage({ pageObj: { current: 1, size: 20 }}).then(data1 => {
        DiseaseApi.queryPage(_t.query).then(data => {
          _t.page = Object.assign(_t.page, data.obj)
          _t.diseaseTypes = data1.obj.records
          _t.tableList = data.obj.records.map(item => {
            return { ...item, diseaseType: item.typeNames ? item.typeNames.join(',') : '类型被删除' }
          })
        }).catch(err => {
          console.log(err)
          this.$message.warning(err.msg)
        })
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
        DiseaseApi.remove(id).then(data => {
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
  .page{width: 100%;margin-top: 20px;}
</style>
