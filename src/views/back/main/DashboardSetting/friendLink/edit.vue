<template>
    <div>
      <el-form ref="form" :model="friendLink" label-width="120px" :rules="rules">
        <el-form-item label="类型" prop="type">
          <el-select v-model="friendLink.type">
            <el-option v-for="(opt, index) in DataTypes" :key="index" :value="opt.value" :label="opt.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="logo上传" prop="img">
          <file-uploader :http-request="fileUploadRequest" :file-list="fileList" :limit="1"></file-uploader>
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="friendLink.linkUrl"></el-input>
        </el-form-item>
        <el-form-item label="链接名称" prop="linkName">
          <el-input v-model="friendLink.linkName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import FriendLinkApi from '@/api/HomePage/FriendLink'
  import FileUploader from '@/components/FileUploader'
  import { uploadFile } from '@/utils/ali-upload'
  export default {
    name: 'edit',
    components: {
      FileUploader
    },
    data() {
      return {
        friendLink: {
          id: '',
          name: '',
          type: null,
          img: '',
          linkUrl: '',
          linkName: ''
        },
        // 1战略合作伙伴 2媒体合作伙伴 3链接聚合 4友情链接
        DataTypes: [
          { value: 1, name: '战略合作伙伴' },
          { value: 2, name: '媒体合作伙伴' },
          { value: 3, name: '链接聚合' },
          { value: 4, name: '友情链接' }
        ],
        isUpdate: false,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请填写名称' }
          ]
        }
      }
    },
    computed: {
      fileList() {
        if (this.friendLink.img) {
          return [{ name: 'image', url: this.friendLink.img }]
        } else {
          return []
        }
      }
    },
    methods: {
      addForm() {
        this.isUpdate = false
        this.friendLink.id = null
        this.friendLink.name = ''
        this.friendLink.type = null
        this.friendLink.img = ''
        this.friendLink.linkUrl = ''
        this.friendLink.linkName = ''
      },
      editForm(entity) {
        this.isUpdate = true
        this.friendLink = Object.assign(this.friendLink, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              FriendLinkApi.update(this.friendLink).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              FriendLinkApi.save(this.friendLink).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
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
