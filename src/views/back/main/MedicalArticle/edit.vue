<template>
  <div>
    <el-form ref="form" :model="medicalArticle" label-width="120px">
      <el-form-item label="序号">
        <el-input-number v-model="medicalArticle.idx" :min="1" style="width: initial"></el-input-number>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="medicalArticle.title"></el-input>
      </el-form-item>
      <el-form-item label="频道" prop="channelId">
        <el-select v-model="medicalArticle.channelId"
                   filterable
                   remote
                   reserve-keyword
                   placeholder="请输入关键词"
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
      <el-form-item label="摘要" prop="abstractText">
        <el-input v-model="medicalArticle.abstractText" type="textarea" :col="4"  maxlength="500" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <UE id = "content" :defaultMsg="medicalArticle.content" :config=config ref="content"></UE>
      </el-form-item>
      <el-form-item label="图片上传" prop="abstractImg">
        <FileUploader :http-request="fileUploadRequest" :fileList="imageFile" :onChange="onImageChange0"  :limit="1"></FileUploader>
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-input v-model="medicalArticle.source"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="medicalArticle.author"></el-input>
      </el-form-item>
      <el-form-item label="阅读量(排行用)" prop="readCount">
        <el-input-number v-model="medicalArticle.readCount"  :min="1" style="width: initial"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm">保存</el-button>
        <el-button @click="closeForm">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ArticleApi from '@/api/articles'
  import ChannelApi from '@/api/channel'
  import { uploadFile } from '@/utils/ali-upload'
  import FileUploader from '@/components/FileUploader'
  import UE from '@/components/ue.vue'
  import { mapState } from 'vuex'
  export default {
    name: 'edit',
    components: {
      FileUploader,
      UE
    },
    computed: {
      ...mapState({
        user: state => state.user.user
      })
    },
    data() {
      return {
        loading: false,
        imageFile: [],
        medicalArticle: {
          title: '',
          abstractText: '',
          content: '',
          author: '',
          abstractImg: '',
          channelId: '',
          readCount: 1
        },
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        channels: [],
        isUpdate: false
      }
    },
    methods: {
      addForm(entity) {
        this.isUpdate = false
        this.medicalArticle = Object.assign(this.medicalArticle, entity)
        if (this.medicalArticle.channel) {
          this.channels = [this.medicalArticle.channel]
        }
      },
      editForm(entity) {
        this.isUpdate = true
        this.medicalArticle = Object.assign(this.medicalArticle, entity)
        this.imageFile = []
        this.imageFile.push({ url: this.medicalArticle.abstractImg })
        this.channels = [this.medicalArticle.channel]
      },
      saveForm() {
        // this.medicalArticle.author = this.user.name
        this.medicalArticle.content = this.$refs.content.getUEContent()
        this.medicalArticle.type = 0
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              ArticleApi.update(this.medicalArticle).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              ArticleApi.save(this.medicalArticle).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
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
      onImageChange0(file, fileList) {
        if (fileList && fileList.length > 0 && fileList[0].response) {
          this.medicalArticle.abstractImg = fileList[0].response.url
          this.imageFile = fileList
        }
      },
      fileUploadRequest(opt) {
        uploadFile(
          opt.file,
          res => {
            this.medicalArticle.imgUrl = res.url
            opt.onSuccess(res)
          },
          err => {
            console.log(err)
          }
        )
      },
      handleRemove(file) {
        const index = this.medicalArticle.imgUrl.findIndex(url => url === file.response.url)
        this.medicalArticle.imgUrl.splice(index, 1)
      },
      closeForm() {
        this.clearForm()
        this.$emit('close')
      },
      clearForm() {
        this.$refs['form'].resetFields()
        this.medicalArticle = {
          title: '',
          abstractText: '',
          content: '',
          author: '',
          abstractImg: '',
          channelId: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
