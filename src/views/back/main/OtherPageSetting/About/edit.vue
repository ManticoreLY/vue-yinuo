<template>
    <div>
      <el-form ref="form" :model="aboutObj" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="aboutObj.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!--<quill-editer v-model = "aboutObj.aboutUs" @getContent="aboutContentChange"></quill-editer>-->
          <UE :defaultMsg="aboutObj.aboutUs" :config=config ref="ue"></UE>
        </el-form-item>
        <el-form-item label="图片上传">
          <FileUploader :httpRequest="fileUploadRequest" :limit="3"></FileUploader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import AboutApi from '@/api/OtherPage/about'
  // import { getToken } from '@/utils/auth'
  import { uploadFile } from '@/utils/ali-upload'
  import FileUploader from '@/components/FileUploader'
  import QuillEditer from '@/components/QuillEditer'
  import UE from '@/components/ue.vue'

  export default {
    name: 'edit',
    components: {
      FileUploader,
      QuillEditer,
      UE
    },
    data() {
      return {
        aboutObj: {
          id: '',
          name: '',
          imageUrl: '',
          aboutUs: '',
          vision: '',
          legal: '',
          qualify: '',
          joinUs: '',
          contactUs: '',
          aboutQualifies: []
        },
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        isUpdate: false
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        AboutApi.findFrontOne().then(data => {
          debugger
          this.aboutObj = data.obj
          this.isUpdate = true
        }).catch(err => {
          console.log(err)
        })
      },
      aboutContentChange(val) {
        this.aboutObj.aboutUs = this.$refs.ue.getUEContent()
      },
      saveForm() {
        this.aboutContentChange()
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              AboutApi.update(this.aboutObj).then(() => {
                this.$message.success('修改成功！')
              }).catch(err => {
                console.log(err)
              })
            } else {
              AboutApi.save(this.aboutObj).then(() => {
                this.$message.success('添加成功！')
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      closeForm() {
        this.$refs['form'].resetFields()
        this.$emit('close')
      },
      fileUploadRequest(option) {
        uploadFile(
          option.file,
          res => {
            this.aboutObj.imgUrl = res.url
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
