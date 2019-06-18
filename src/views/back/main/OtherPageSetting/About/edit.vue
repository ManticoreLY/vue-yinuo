<template>
    <div>
      <el-form ref="form" :model="aboutObj" label-width="120px">
        <el-form-item label="关于我们头部大图">
          <FileUploader :httpRequest="fileUploadRequest" :onChange="onImageChange0" :fileList="imageFile" :limit="1"></FileUploader>
        </el-form-item>
        <el-form-item label="关于我们">
          <!--<quill-editer v-model = "aboutObj.aboutUs" @getContent="aboutContentChange"></quill-editer>-->
          <UE  id = "aboutUs" :defaultMsg="aboutObj.aboutUs" :config=config ref="aboutUs"></UE>
        </el-form-item>
        <el-form-item label="法律申明">
          <!--<quill-editer v-model = "aboutObj.aboutUs" @getContent="aboutContentChange"></quill-editer>-->
          <UE id = "legal" :defaultMsg="aboutObj.legal" :config=config ref="legal"></UE>
        </el-form-item>
        <el-form-item label="加入我们">
          <!--<quill-editer v-model = "aboutObj.aboutUs" @getContent="aboutContentChange"></quill-editer>-->
          <UE id = "joinUs" :defaultMsg="aboutObj.joinUs" :config=config ref="joinUs"></UE>
        </el-form-item>
        <el-form-item label="联系我们">
          <!--<quill-editer v-model = "aboutObj.aboutUs" @getContent="aboutContentChange"></quill-editer>-->
          <UE id = "contactUs" :defaultMsg="aboutObj.contactUs" :config=config ref="contactUs"></UE>
        </el-form-item>
        <el-form-item label="医诺资质1-标题">
          <el-input v-model="aboutObj.aboutQualifies[0].name"></el-input>
        </el-form-item>
        <el-form-item label="医诺资质1-内容">
          <el-input v-model="aboutObj.aboutQualifies[0].describe" type="textarea" :col="3" max-length="500"></el-input>
        </el-form-item>
        <el-form-item label="医诺资质1-图">
          <FileUploader  :httpRequest="fileUploadRequest" :fileList="aboutObj.aboutQualifies[0].imageList" :onChange="onImageChange1" :limit="3"></FileUploader>
        </el-form-item>
        <el-form-item label="医诺资质2-标题">
          <el-input v-model="aboutObj.aboutQualifies[1].name"></el-input>
        </el-form-item>
        <el-form-item label="医诺资质2-内容">
          <el-input v-model="aboutObj.aboutQualifies[1].describe" type="textarea" :col="3" max-length="500"></el-input>
        </el-form-item>
        <el-form-item label="医诺资质2-图">
          <FileUploader  :httpRequest="fileUploadRequest" :fileList="aboutObj.aboutQualifies[1].imageList" :onChange="onImageChange2" :limit="3"></FileUploader>
        </el-form-item>
        <el-form-item label="医诺资质3-标题">
          <el-input v-model="aboutObj.aboutQualifies[2].name"></el-input>
        </el-form-item>
        <el-form-item label="医诺资质3-内容">
          <el-input v-model="aboutObj.aboutQualifies[2].describe" type="textarea" :col="3" max-length="500"></el-input>
        </el-form-item>
        <el-form-item label="医诺资质3-图">
          <FileUploader  :httpRequest="fileUploadRequest" :fileList="aboutObj.aboutQualifies[2].imageList" :onChange="onImageChange3" :limit="3"></FileUploader>
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
        imageFile: [{}],
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
          aboutQualifies: [{ imageUrlList: [], imageList: [] }, { imageUrlList: [], imageList: [] }, { imageUrlList: [], imageList: [] }]
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
          this.aboutObj = data.obj
          if (!this.aboutObj.aboutQualifies || this.aboutObj.aboutQualifies.length < 3) {
            var count = 0
            if (this.aboutObj.aboutQualifies) {
              count = this.aboutObj.aboutQualifies.length
            }
            for (var i = 0; i < 3 - count; i++) {
              var aboutQualify = {
                name: '',
                describe: '',
                imageUrlList: []
              }
              this.aboutObj.aboutQualifies.push(aboutQualify)
            }
          }
          this.imageFile = []
          this.imageFile.push({ url: this.aboutObj.imageUrl })
          for (var idx in this.aboutObj.aboutQualifies) {
            this.aboutObj.aboutQualifies[idx].imageList = []
            for (var j in this.aboutObj.aboutQualifies[idx].imageUrlList) {
              this.aboutObj.aboutQualifies[idx].imageList.push({
                url: this.aboutObj.aboutQualifies[idx].imageUrlList[j]
              })
            }
          }
          this.isUpdate = true
        }).catch(err => {
          console.log(err)
        })
      },
      saveForm() {
        this.aboutObj.aboutUs = this.$refs.aboutUs.getUEContent()
        this.aboutObj.legal = this.$refs.legal.getUEContent()
        this.aboutObj.joinUs = this.$refs.joinUs.getUEContent()
        this.aboutObj.contactUs = this.$refs.contactUs.getUEContent()
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
      onImageChange0(file, fileList) {
        if (fileList && fileList.length > 0 && fileList[0].response) {
          this.aboutObj.imageUrl = fileList[0].response.url
          this.imageFile = fileList
        }
      },
      onImageChange1(file, fileList) {
        this.aboutObj.aboutQualifies[0].imageList = fileList
        var urlList = []
        for (var idx in fileList) {
          if (fileList[idx].response) {
            urlList.push(fileList[idx].response.url)
          }
        }
        this.aboutObj.aboutQualifies[0].imageUrlList = urlList
      },
      onImageChange2(file, fileList) {
        this.aboutObj.aboutQualifies[1].imageList = fileList
        var urlList = []
        for (var idx in fileList) {
          if (fileList[idx].response) {
            urlList.push(fileList[idx].response.url)
          }
        }
        this.aboutObj.aboutQualifies[1].imageUrlList = urlList
      },
      onImageChange3(file, fileList) {
        this.aboutObj.aboutQualifies[2].imageList = fileList
        var urlList = []
        for (var idx in fileList) {
          if (fileList[idx].response) {
            urlList.push(fileList[idx].response.url)
          }
        }
        this.aboutObj.aboutQualifies[2].imageUrlList = urlList
      },
      fileUploadRequest(option) {
        uploadFile(
          option.file,
          res => {
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
