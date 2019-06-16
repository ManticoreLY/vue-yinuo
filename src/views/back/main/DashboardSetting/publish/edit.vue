<template>
    <div>
      <el-form ref="form" :model="officialPublish" label-width="120px" :rules="rules">
        <el-form-item label="内容" prop="content">
          <UE id = "content" :defaultMsg="officialPublish.content" :config=config ref="content"></UE>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import OfficialPublishApi from '@/api/HomePage/OfficialPublish'
  import UE from '@/components/ue.vue'
  export default {
    components: {
      UE
    },
    name: 'edit',
    data() {
      return {
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        officialPublish: {
          id: null,
          content: ''
        },
        isUpdate: false,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请填写内容' }
          ]
        }
      }
    },
    methods: {
      addForm() {
        this.isUpdate = false
        this.officialPublish.id = null
        this.officialPublish.content = ''
      },
      editForm(entity) {
        debugger
        this.isUpdate = true
        this.officialPublish = Object.assign(this.officialPublish, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.officialPublish.content = this.$refs.content.getUEContent()
            if (this.isUpdate) {
              OfficialPublishApi.update(this.officialPublish).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              OfficialPublishApi.save(this.officialPublish).then(data => {
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
        this.$refs['form'].resetFields()
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>
