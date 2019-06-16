<template>
    <div>
      <el-form ref="form" :model="abroadCases" label-width="120px" :rules="rules">
        <el-form-item label="案例名称" prop="name">
          <el-input v-model="abroadCases.name"></el-input>
        </el-form-item>
        <el-form-item label="选择实例" prop="newsArticleId">
          <el-select v-model="abroadCases.newsArticleId">
            <el-option v-for="(opt, index) in treatmentCases" :key="index" :value="opt.id" :label="opt.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import TCApi from '@/api/HomePage/TreatmentCase'
  import newsArticleApi from '@/api/articles'
  // import FileUploader from '@/components/FileUploader'
  // import { uploadFile } from '@/utils/ali-upload'
  export default {
    name: 'edit',
    components: {
      // FileUploader
    },
    data() {
      return {
        query: {
          pageObj: {
            current: 1,
            size: 1000
          },
          andCondition: {
            type: 1
          }
        },
        abroadCases: {
          id: null,
          name: '',
          newsArticleId: null
        },
        treatmentCases: [],
        isUpdate: false,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请填写内容' }
          ]
        }
      }
    },
    created() {
      newsArticleApi.queryPage(this.query).then(data => {
        this.treatmentCases = data.obj.records
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      addForm() {
        this.isUpdate = false
        this.abroadCases.id = null
        this.abroadCases.newsArticleId = null
      },
      editForm(entity) {
        this.isUpdate = true
        this.abroadCases = Object.assign(this.abroadCases, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              TCApi.update(this.abroadCases).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              TCApi.save(this.abroadCases).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      /*
      fileUploadRequest(opt) {
        uploadFile(
          opt.file,
          res => {
            this.friendLink.img = res.url
            opt.onSuccess(res)
          },
          err => {
            console.log(err)
          }
        )
      },*/
      closeForm() {
        this.clearForm()
        this.$emit('close')
      },
      clearForm() {
        this.$refs['form'].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
