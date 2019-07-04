<template>
    <div>
      <el-form ref="form" :model="ContactUs" label-width="120px" :rules="rules">
        <el-form-item label="免费热线" prop="freeHotLine">
          <el-input v-model="ContactUs.freeHotLine"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ContactUs.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ContactUs.email"></el-input>
        </el-form-item>
        <el-form-item label="合作热线" prop="cooperationHotLine">
          <el-input v-model="ContactUs.cooperationHotLine"></el-input>
        </el-form-item>
        <el-form-item label="投诉电话" prop="complaintTel">
          <el-input v-model="ContactUs.complaintTel"></el-input>
        </el-form-item>
        <el-form-item label="QQ咨询" prop="qq">
          <file-uploader :http-request="fileUploadRequest_qq" :file-list="fileList1" :limit="1"></file-uploader>
        </el-form-item>
        <el-form-item label="微信咨询" prop="weixin">
          <file-uploader :http-request="fileUploadRequest_wx" :file-list="fileList2" :limit="1"></file-uploader>
        </el-form-item>
        <el-form-item label="官方微博" prop="weibo">
          <el-input v-model="ContactUs.weibo" style="width: 320px">
            <el-button slot="prepend">https://</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="官方微信" prop="officialWeChat">
          <file-uploader :http-request="fileUploadRequest" :file-list="fileList" :limit="1"></file-uploader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import ContactUsApi from '@/api/HomePage/contactUs'
  import FileUploader from '@/components/FileUploader'
  import { uploadFile } from '@/utils/ali-upload'
  export default {
    name: 'edit',
    components: {
      FileUploader
    },
    data() {
      return {
        ContactUs: {
          id: null,
          freeHotLine: '',
          address: '',
          email: '',
          qq: '',
          weixin: '',
          weibo: '',
          cooperationHotLine: '',
          complaintTel: '',
          officialWeChat: ''
        },
        isUpdate: false,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请填写内容' }
          ]
        }
      }
    },
    computed: {
      fileList() {
        if (this.ContactUs.officialWeChat) {
          return [{ name: 'image', url: this.ContactUs.officialWeChat }]
        } else {
          return []
        }
      },
      fileList1() {
        if (this.ContactUs.qq) {
          return [{ name: 'image', url: this.ContactUs.qq }]
        } else {
          return []
        }
      },
      fileList2() {
        if (this.ContactUs.weixin) {
          return [{ name: 'image', url: this.ContactUs.weixin }]
        } else {
          return []
        }
      }
    },
    methods: {
      addForm() {
        this.isUpdate = false
        this.ContactUs.id = null
        this.ContactUs.freeHotLine = ''
        this.ContactUs.address = ''
        this.ContactUs.email = ''
        this.ContactUs.qq = ''
        this.ContactUs.weixin = ''
        this.ContactUs.weibo = ''
        this.ContactUs.cooperationHotLine = ''
        this.ContactUs.complaintTel = null
        this.ContactUs.officialWeChat = ''
      },
      editForm(entity) {
        this.isUpdate = true
        this.ContactUs = Object.assign(this.ContactUs, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              ContactUsApi.update(this.ContactUs).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              ContactUsApi.save(this.ContactUs).then(data => {
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
            this.ContactUs.officialWeChat = res.url
            opt.onSuccess(res)
          },
          err => {
            console.log(err)
          }
        )
      },
      fileUploadRequest_qq(opt) {
        uploadFile(
          opt.file,
          res => {
            this.ContactUs.qq = res.url
            opt.onSuccess(res)
          },
          err => {
            console.log(err)
          }
        )
      },
      fileUploadRequest_wx(opt) {
        uploadFile(
          opt.file,
          res => {
            this.ContactUs.weixin = res.url
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
