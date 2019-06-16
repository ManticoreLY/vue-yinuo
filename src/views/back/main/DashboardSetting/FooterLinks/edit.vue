<template>
    <div>
      <el-form ref="form" :model="footerLink" label-width="120px" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="footerLink.name"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="footerLink.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import FooterLinksApi from '@/api/HomePage/FooterLinks'
  export default {
    name: 'edit',
    data() {
      return {
        footerLink: {
          id: null,
          name: '',
          url: ''
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
      }
    },
    methods: {
      addForm() {
        this.isUpdate = false
        this.footerLink.id = null
        this.footerLink.name = ''
        this.footerLink.url = ''
      },
      editForm(entity) {
        this.isUpdate = true
        this.footerLink = Object.assign(this.footerLink, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              FooterLinksApi.update(this.footerLink).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              FooterLinksApi.save(this.footerLink).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
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
