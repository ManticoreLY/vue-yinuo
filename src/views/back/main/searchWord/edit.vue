<template>
    <div>
      <el-form ref="form" :model="searchWord" label-width="120px" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="searchWord.name"></el-input>
        </el-form-item>
        <el-form-item label="搜索量" prop="count">
          <el-input-number v-model="searchWord.count"  :min="1" style="width: initial"></el-input-number>
        </el-form-item>
        <el-form-item label="常用词" prop="common">
          <el-switch
            v-model="searchWord.common" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="常用排序" prop="idx">
          <el-input-number v-model="searchWord.idx"  :min="1" style="width: initial"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import ChannelApi from '@/api/searchWord'
  export default {
    name: 'edit',
    data() {
      return {
        searchWord: {
          name: '',
          common: false
        },
        isUpdate: false,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请填写频道名称' }
          ]
        }
      }
    },
    methods: {
      addForm() {
        this.isUpdate = false
      },
      editForm(entity) {
        this.isUpdate = true
        this.searchWord = Object.assign(this.searchWord, entity)
      },
      saveForm() {
        this.searchWord.type = 0
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              ChannelApi.update(this.searchWord).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              ChannelApi.save(this.searchWord).then(data => {
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
