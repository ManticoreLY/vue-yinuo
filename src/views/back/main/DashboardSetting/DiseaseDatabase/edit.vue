<template>
    <div>
      <el-form ref="form" :model="diseaseDb" label-width="120px" :rules="rules">
        <el-form-item label="一级目录名称" prop="name">
          <el-input v-model="diseaseDb.name"></el-input>
        </el-form-item>
        <el-form-item label="一级目录icon" prop="icon">
          <file-uploader :http-request="fileUploadRequest" :file-list="fileList" :limit="1"></file-uploader>
        </el-form-item>

        <el-form-item label="一级目录下疾病" prop="diseaseId1">
          <el-select v-model="diseaseDb.diseaseId1"
                     filterable
                     placeholder="请输入关键词">
            <el-option v-for="item in diseases" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
          <el-select v-model="diseaseDb.diseaseId2"
                     filterable
                     placeholder="请输入关键词">
            <el-option v-for="item in diseases" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
          <el-select v-model="diseaseDb.diseaseId3"
                     filterable
                     placeholder="请输入关键词">
            <el-option v-for="item in diseases" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="弹出疾病" prop="diseaseId1">
          <el-select v-model="diseaseDb.diseaseIds"
                     filterable
                     multiple
                     reserve-keyword
                     placeholder="请输入关键词">
            <el-option v-for="item in diseases" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import diseaseDbApi from '@/api/HomePage/DiseaseDatabase'
  import FileUploader from '@/components/FileUploader'
  import { uploadFile } from '@/utils/ali-upload'
  export default {
    name: 'edit',
    components: {
      FileUploader
    },
    data() {
      return {
        query: {
          pageObj: {
            current: 1,
            size: 1000
          }
        },
        diseaseDb: {
          name: '',
          icon: '',
          diseaseId1: '',
          diseaseId2: '',
          diseaseId3: '',
          diseaseId4: '',
          diseaseId5: '',
          // diseaseDbDetailConfigList: [],
          diseaseIds: []
        },
        diseases: [],
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
        if (this.diseaseDb.icon) {
          return [{ name: 'image', url: this.diseaseDb.icon }]
        } else {
          return []
        }
      }
    },
    created() {
      this.$store.dispatch('getAllDiseases').then(data => {
        this.diseases = data
      })
    },
    methods: {
      editForm(entity) {
        this.isUpdate = true
        this.diseaseDb = Object.assign(this.diseaseDb, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              diseaseDbApi.update(this.diseaseDb).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              diseaseDbApi.save(this.diseaseDb).then(data => {
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
            this.diseaseDb.icon = res.url
            opt.onSuccess(res)
          },
          err => {
            console.log(err)
          }
        )
      },
      /*
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
      },*/
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
