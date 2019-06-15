<template>
    <div>
      <el-form ref="form" :model="disease" label-width="120px" :rules="rules">
        <el-form-item label="选择疾病" prop="name">
          <el-autocomplete v-model="disease.name" :fetch-suggestions="querySearchAsync"  placeholder="请输入疾病名称搜索" @select="handleSelect" value-key="name" value="id"></el-autocomplete>
        </el-form-item>
        <el-form-item label="疾病icon上传" prop="icon">
          <file-uploader :http-request="fileUploadRequest" :file-list="fileList" :limit="1"></file-uploader>
        </el-form-item>
        <el-form-item label="对应药品" prop="description">
          <el-input v-model="disease.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import DiseaseItemApi from '@/api/HomePage/DiseaseItems'
  import DiseaseApi from '@/api/disease'
  import FileUploader from '@/components/FileUploader'
  import { uploadFile } from '@/utils/ali-upload'
  export default {
    name: 'edit',
    components: {
      FileUploader
    },
    computed: {
      fileList() {
        if (this.disease.icon) {
          return [{ name: 'image', url: this.disease.icon }]
        } else {
          return []
        }
      }
    },
    data() {
      return {
        query: {
          pageObj: {
            current: 1,
            size: 1000
          },
          likeCondition: {
            name: ''
          }
        },
        disease: {
          id: null,
          name: '',
          icon: '',
          diseaseId: null,
          description: ''
        },
        diseases: [],
        isUpdate: false,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请填写名称' }
          ]
        }
      }
    },
    methods: {
      addForm() {
        this.isUpdate = false
        this.disease.id = null
        this.disease.name = ''
        this.disease.diseaseId = null
        this.disease.description = ''
      },
      editForm(entity) {
        debugger
        this.isUpdate = true
        this.disease = Object.assign(this.disease, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              DiseaseItemApi.update(this.disease).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              DiseaseItemApi.save(this.disease).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      querySearchAsync(query, callback) {
        if (!query) return
        else {
          debugger
          this.query.likeCondition.name = query
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            DiseaseApi.queryPage(this.query).then(data => {
              console.log(data)
              callback(data.obj.records)
            }).catch(err => {
              console.log(err)
              callback([])
            })
          }, 500)
        }
      },
      fileUploadRequest(opt) {
        uploadFile(
          opt.file,
          res => {
            this.disease.icon = res.url
            opt.onSuccess(res)
          },
          err => {
            console.log(err)
          }
        )
      },
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
