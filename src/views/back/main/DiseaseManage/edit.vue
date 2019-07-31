<template>
    <div>
      <el-form ref="form" :model="disease" label-width="120px">
        <el-form-item label="疾病分类:" prop="types">
          <el-select v-model="disease.typeIds" multiple>
            <el-option v-for="opt in DiseaseTypes" :key="opt.id" :value="opt.id" :label="opt.name"></el-option>
          </el-select>
          <!--<el-popover placement="bottom" width="400" trigger="click">-->
            <!--<el-form ref="typeForm" label-width="80px">-->
              <!--<el-form-item label="分类名称">-->
                <!--<el-input v-model="newType"></el-input>-->
              <!--</el-form-item>-->
              <!--<div style="text-align: center">-->
                <!--<el-button type="primary" size="medium" @click="saveType">保存分类</el-button>-->
              <!--</div>-->
            <!--</el-form>-->
            <!--<el-button type="primary" size="medium" class="el-icon-plus" slot="reference">增加分类</el-button>-->
          <!--</el-popover>-->
        </el-form-item>
        <el-form-item label="名称:" prop="name">
          <el-input v-model="disease.name"></el-input>
        </el-form-item>
        <el-form-item label="是否子分类:" prop="isChildren">
          <el-radio v-model="disease.isChildren" label="1">是</el-radio>
          <el-radio v-model="disease.isChildren" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="上级选择:" v-if="disease.isChildren === '1'">
          <el-select v-model="disease.sub">
            <el-option v-for="item in diseases" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病图标">
          <FileUploader :httpRequest="fileUploadRequest" :fileList="icon" :onChange="onImageChange0"  :limit="1"></FileUploader>
        </el-form-item>
        <el-form-item label="治疗药物:">
          <el-select v-model="disease.medicineIds" value-key="id" multiple
                     filterable
                     reserve-keyword
                     placeholder="请输入关键词"
                     remote
                     :remote-method="medicineRemoteMethod"
                     :loading="loading">
            <el-option v-for="item in medicines" :key="item.id" :value="item.id" :label="item.shotName"></el-option>
          </el-select>
          <rank-pad :data-list="fitMedicines" @returnData="(data) => { disease.medicineIds = data.map(one => one.id) }"></rank-pad>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button @click="closeForm">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import DiseaseApi from '@/api/disease'
  import DiseaseTypeApi from '@/api/diseaseType'
  import MedicineApi from '@/api/medicine'
  import { uploadFile } from '@/utils/ali-upload'
  import FileUploader from '@/components/FileUploader'
  import RankPad from '@/components/RankPad'
  export default {
    name: 'edit',
    components: {
      FileUploader,
      RankPad
    },
    data() {
      return {
        icon: [],
        disease: {
          id: '',
          types: '',
          name: '',
          isChildren: '',
          medicines: [],
          medicineIds: [],
          typeIds: []
        },
        loading: false,
        newType: '',
        isUpdate: false,
        DiseaseTypes: [
          { name: '常见传染病、慢性病', value: '0' },
          { name: '癌症、肿瘤', value: '1' }
        ],
        medicines: [],
        selectedMedicines: [],
        diseases: []
      }
    },
    computed: {
      fitMedicines() {
        return this.selectedMedicines.filter(one => this.disease.medicineIds.indexOf(one.id) > -1).sort((a, b) => this.disease.medicineIds.indexOf(a.id) - this.disease.medicineIds.indexOf(b.id))
      }
    },
    created() {
      this.$store.dispatch('getAllDiseases').then(data => {
        this.diseases = data
      })
      this.initType()
    },
    methods: {
      initType() {
        DiseaseTypeApi.queryPage({ pageObj: { current: 1, size: 100 }}).then(data => {
          this.DiseaseTypes = data.obj.records
        })
      },
      editForm(entity) {
        this.icon = [].concat([{ name: '', url: entity.icon }])
        DiseaseApi.getFullDisease(entity.id).then(data => {
          this.disease = Object.assign(this.disease, data.obj)
          this.medicines = this.disease.medicines
          this.selectedMedicines = this.medicines
          if (this.disease.parentId === 0) {
            this.disease.isChildren = '0'
          } else {
            this.disease.isChildren = '1'
          }
          this.isUpdate = true
        })
        // this.disease = Object.assign(this.disease, entity)
      },
      saveType() {
        if (!this.newType) return
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              DiseaseApi.saveFullDisease(this.disease).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              DiseaseApi.saveFullDisease(this.disease).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      onImageChange0(file, fileList) {
        if (fileList && fileList.length > 0 && fileList[0].response) {
          this.disease.icon = fileList[0].response.url
          this.icon = fileList
        }
      },
      medicineRemoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            MedicineApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }, fields: ['id', 'name', 'shotName'] }).then(data => {
              this.medicines = data.obj.records
              this.selectedMedicines = this.selectedMedicines.concat(this.medicines.filter(one => this.selectedMedicines.map(one => one.id).indexOf(one.id) < 0))
            }).catch(err => {
              console.log(err)
              this.$message.warning(err.msg)
            })
          }, 200)
        } else {
          this.options = []
        }
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
