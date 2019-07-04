<template>
    <div>
        <div class="page">
           <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="query.likeCondition.shotName" placeholder="输入药品名称查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryKey">查询</el-button>
                    <el-button type="success" @click="addSeries">添加药品</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="dataList" :default-sort="{ prop: 'updatedDt', order: 'descending' }">
                <el-table-column label="ID" prop="id" width="60"></el-table-column>
                <!--<el-table-column label="序号" prop="indexNo"></el-table-column>-->
                <el-table-column label="药品名称" prop="name"></el-table-column>
                <el-table-column label="简介" prop="shotIntroduct"></el-table-column>
                <el-table-column label="药品说明" prop="string"></el-table-column>
                <el-table-column label="单位" prop="unit"></el-table-column>
                <el-table-column label="更新时间" prop="updatedDt" sortable></el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <router-link target="_blank" :to="'/medicineInfo/' + scope.row.id">
                          <el-button type="success" size="small">预览</el-button>
                        </router-link>&nbsp;&nbsp;
                        <el-button type="warning" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="toDelete(scope.row.id)">删除</el-button>
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
        </div>
      <el-dialog :title="formTitle" :visible.sync="formVisible" @before-close="handleClose" width="60%">
        <medicine-edit ref="editForm" @close="handleClose"></medicine-edit>
      </el-dialog>
    </div>
</template>

<script>
    import MedicineEdit from './edit'
    import MedicineApi from '@/api/medicine'
    import page from '@/utils/page'
    export default {
      name: 'index',
      components: {
        MedicineEdit
      },
      data() {
        return {
          query: {
            pageObj: {
              current: 1,
              size: 10
            },
            likeCondition: {
              shotName: ''
            }
          },
          page: {},
          formVisible: false,
          formTitle: '',
          index: '1-1',
          keyword: '',
          dataList: [
            { id: 1, name: '阿司匹林', indexNo: 1, message: '常用消炎药' }
          ]
        }
      },
      mounted() {
        this.search()
      },
      methods: {
        ...page(),
        search() {
          MedicineApi.queryPage(this.query).then(data => {
            this.page = Object.assign(this.page, data.obj)
            this.dataList = [].concat(data.obj.records)
          }).catch(err => {
            console.log(err)
            this.$message.warning(err.msg)
          })
        },
        edit(item) {
          this.formVisible = true
          this.formTitle = '药品管理-编辑'
          this.$nextTick(() => {
            this.$refs['editForm'].initData(item)
          })
        },
        queryKey() {
          this.search()
        },
        addSeries() {
          this.formTitle = '药品管理-添加'
          this.formVisible = true
        },
        handleClose() {
          this.formVisible = false
          this.$refs['editForm'].clearForm()
          this.search()
        },
        toDelete(id) {
          this.$confirm('', '请确认删除?', {}).then(() => {
            MedicineApi.remove(id).then(data => {
              console.log(data)
              this.$message.success('删除成功')
              this.search()
            }).catch(err => {
              console.log(err)
              this.$message.warning('操作失败')
            })
          })
        }
      }
    }
</script>

<style scoped>
</style>
