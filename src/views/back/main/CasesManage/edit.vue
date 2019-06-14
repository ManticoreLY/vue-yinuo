<template>
    <div>
      <el-form ref="form" :model="curedCase" label-width="120px">
        <el-form-item label="案例名称" prop="name">
          <el-input v-model="curedCase.name"></el-input>
        </el-form-item>
        <el-form-item label="案例标题" prop="title">
          <el-input v-model="curedCase.title"></el-input>
        </el-form-item>
        <el-form-item label="案例描述" prop="describe">
          <el-input v-model="curedCase.describe" type="textarea" :col="3" max-length="500"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="img">
          <FileUploader :httpRequest="fileUploadRequest" :file-list="fileList" :limit="5" :on-remove="handleRemove"></FileUploader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import CaseApi from '@/api/cases'
  // import { getToken } from '@/utils/auth'
  import { uploadFile } from '@/utils/ali-upload'
  import FileUploader from '@/components/FileUploader'

  export default {
    name: 'edit',
    components: {
      FileUploader
    },
    data() {
      return {
        imgList: [],
        curedCase: {
          name: '',
          title: '',
          describe: '',
          img: ''
        },
        isUpdate: false
      }
    },
    computed: {
      fileList() {
        if (this.curedCase.img) {
          return this.curedCase.img.split(',').map(img => {
            return { name: 'img', url: img }
          })
        } else {
          return []
        }
      }
    },
    methods: {
      editForm(entity) {
        this.curedCase = Object.assign(this.curedCase, entity)
        this.imgList = this.curedCase.img.split(',')
        this.isUpdate = true
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.curedCase.img = this.imgList.join(',')
            if (this.isUpdate) {
              CaseApi.update(this.curedCase).then(() => {
                this.$message.success('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              CaseApi.save(this.curedCase).then(() => {
                this.$message.success('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      handleRemove(file) {
        const index = this.imgList.indexOf(file.url)
        this.imgList.splice(index, 1)
      },
      closeForm() {
        this.clearForm()
        this.$emit('close')
      },
      clearForm() {
        this.$refs['form'].resetFields()
      },
      fileUploadRequest(option) {
        uploadFile(
          option.file,
          res => {
            this.imgList.push(res.url)
            option.onSuccess(res)
          },
          err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
