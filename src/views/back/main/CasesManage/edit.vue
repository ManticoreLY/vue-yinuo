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
        <el-form-item label="列表图示" prop="img">
          <FileUploader :httpRequest="fileUploadRequest" :file-list="fileList" :limit="1" :on-remove="handleRemove"></FileUploader>
        </el-form-item>
        <el-form-item label="上传图片" prop="img">
          <FileUploader :httpRequest="detailFileUploadRequest" :file-list="detailFileList" :limit="5" :on-remove="handleDetailRemove"></FileUploader>
        </el-form-item>
        <div v-for="(detail, index) in curedCase.details">
          <el-form-item :label="'图片描述' + (index+1)" prop="imageDescribe">
            <el-input v-model="detail.describe" type="textarea" :col="3" max-length="500"></el-input>
          </el-form-item>
        </div>
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
          img: '',
          details: []
        },
        isUpdate: false
      }
    },
    computed: {
      detailFileList() {
        if (this.curedCase.details) {
          return this.curedCase.details.map(detail => {
            return { name: 'img', url: detail.img }
          })
        } else {
          return []
        }
      },
      fileList() {
        if (this.curedCase.img && this.curedCase.img !== '') {
          return [{ name: 'img', url: this.curedCase.img }]
        } else {
          return []
        }
      }
    },
    methods: {
      editForm(entity) {
        CaseApi.findFullOne(entity.id).then(data => {
          this.curedCase = Object.assign(this.curedCase, data.obj)
          this.imgList = this.curedCase.details.map(one => one.img)
          this.isUpdate = true
        })
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
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
        this.curedCase.img = ''
      },
      handleDetailRemove(file) {
        const index = this.imgList.indexOf(file.url)
        this.imgList.splice(index, 1)
        this.curedCase.details.splice(index, 1)
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
            this.curedCase.img = res.url
            option.onSuccess(res)
          },
          err => {
            console.log(err)
          })
      },
      detailFileUploadRequest(option) {
        uploadFile(
          option.file,
          res => {
            this.imgList.push(res.url)
            this.curedCase.details.push({ describe: '', img: res.url })
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
