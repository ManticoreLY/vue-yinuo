<template>
    <div>
      <el-form ref="form" :model="drugDbObj" label-width="120px">
        <el-form-item label="头部图片">
          <FileUploader :httpRequest="fileUploadRequest" :fileList="headImage" :onChange="onImageChange0"  :limit="1"></FileUploader>
        </el-form-item>
        <el-form-item label="药品类目标题">
          <el-input v-model="drugDbObj.title"></el-input>
        </el-form-item>
        <el-form-item label="药品类目内容">
          <el-input v-model="drugDbObj.describe" type="textarea" :col="5" max-length="500" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="药品类目的疾病">
          <el-select v-model="drugDbObj.drugDbDiseaseIdList"
                     multiple
                     filterable
                     remote
                     reserve-keyword
                     placeholder="请输入关键词"
                     :remote-method="diseaseRemoteMethod"
                     :loading="loading">
            <el-option
              v-for="item in diseases"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <rank-pad v-if="" :data-list="drugDbDiseaseList" @returnData="fixDiseaseRank"></rank-pad>
        </el-form-item>
        <el-form-item label="药品排行标题">
          <el-input v-model="drugDbObj.rankTitleMedicine"></el-input>
        </el-form-item>
        <el-form-item label="药品排行">
          <el-select v-model="drugDbObj.drugDbRankMedicineIdList"
                     multiple
                     filterable
                     remote
                     reserve-keyword
                     placeholder="请输入关键词"
                     :remote-method="medicineRemoteMethod"
                     :loading="loading">
            <el-option
              v-for="item in medicines"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <rank-pad v-if="" :data-list="drugDbRankMedicineList" @returnData="fixMedicineRank"></rank-pad>
        </el-form-item>
        <el-form-item label="药厂排行标题">
          <el-input v-model="drugDbObj.rankTitleMaker"></el-input>
        </el-form-item>
        <el-form-item label="药厂排行">
          <el-row v-for="(drugDbRankMaker, index) in drugDbObj.drugDbRankMakerList" :key="index">
            <el-col :span="3">
              <el-input v-model="drugDbRankMaker.area" placeholder="地区"></el-input>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="3">
              <el-input v-model="drugDbRankMaker.name" placeholder="药厂"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="danger" @click="removeMaker(index)">删除</el-button>
            </el-col>
          </el-row>
          <el-col :span="11">
            <el-button type="primary" @click="addMaker">增加一个</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="合作药厂标题">
          <el-input v-model="drugDbObj.title"></el-input>
        </el-form-item>
        <el-form-item label="合作药厂内容">
          <el-input v-model="drugDbObj.describe" type="textarea" :col="5" max-length="500" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="合作药厂图标">
          <FileUploader :httpRequest="fileUploadRequest" :fileList="drugDbObj.imageUrlFootFileList" :onChange="onImageChange1" :limit="6"></FileUploader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import DrugDbApi from '@/api/OtherPage/drugdb'
  import DiseaseApi from '@/api/disease'
  import MedicineApi from '@/api/medicine'
  import RankPad from '@/components/RankPad'
  // import { getToken } from '@/utils/auth'
  import { uploadFile } from '@/utils/ali-upload'
  import FileUploader from '@/components/FileUploader'

  export default {
    name: 'edit',
    components: {
      FileUploader,
      RankPad
    },
    data() {
      return {
        headImage: [],
        diseases: [],
        loading: false,
        medicines: [],
        makers: [],
        drugDbObj: {
          id: '',
          name: '',
          imageUrl: '',
          title: '',
          describe: '',
          drugDbDiseaseList: [],
          drugDbDiseaseIdList: [],
          rankTitleMedicine: '',
          drugDbRankMedicineList: [],
          drugDbRankMedicineIdList: [],
          rankTitleMaker: '',
          drugDbRankMakerList: [],
          drugDbRankMakerIdList: [],
          titleFoot: '',
          describeFoot: '',
          imageUrlsFoot: '',
          imageUrlFootList: [],
          imageUrlFootFileList: []
        },
        isUpdate: false
      }
    },
    computed: {
      drugDbRankMedicineList() {
        return this.medicines.filter(one => this.drugDbObj.drugDbRankMedicineIdList.indexOf(one.id) > -1).sort((a, b) => this.drugDbObj.drugDbRankMedicineIdList.indexOf(a.id) - this.drugDbObj.drugDbRankMedicineIdList.indexOf(b.id))
      },
      drugDbDiseaseList() {
        return this.diseases.filter(one => this.drugDbObj.drugDbDiseaseIdList.indexOf(one.id) > -1).sort((a, b) => this.drugDbObj.drugDbDiseaseIdList.indexOf(a.id) - this.drugDbObj.drugDbDiseaseIdList.indexOf(b.id))
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        DrugDbApi.findFrontOne().then(data => {
          this.drugDbObj = data.obj
          this.headImage.push({ url: this.drugDbObj.imageUrl })
          this.drugDbObj.imageUrlFootFileList = []
          this.diseases = this.drugDbObj.drugDbDiseaseList.map(item => ({ id: item.disease.id, name: item.disease.name }))
          this.medicines = this.drugDbObj.drugDbRankMedicineList.map(item => ({ id: item.medicine.id, name: item.medicine.name }))
          for (var j in this.drugDbObj.imageUrlFootList) {
            this.drugDbObj.imageUrlFootFileList.push({
              url: this.drugDbObj.imageUrlFootList[j]
            })
          }
          this.isUpdate = true
        })
      },
      fixMedicineRank(data) {
        this.drugDbObj.drugDbRankMedicineIdList = data.map(one => one.id)
      },
      fixDiseaseRank(data) {
        this.drugDbObj.drugDbDiseaseIdList = data.map(one => one.id)
      },
      diseaseRemoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            DiseaseApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }}).then(data => {
              this.diseases = data.obj.records
            }).catch(err => {
              console.log(err)
              this.$message.warning(err.msg)
            })
          }, 200)
        } else {
          this.options = []
        }
      },
      medicineRemoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            MedicineApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }}).then(data => {
              this.medicines = data.obj.records
            }).catch(err => {
              console.log(err)
              this.$message.warning(err.msg)
            })
          }, 200)
        } else {
          this.options = []
        }
      },
      onImageChange0(file, fileList) {
        if (fileList && fileList.length > 0 && fileList[0].response) {
          this.drugDbObj.imageUrl = fileList[0].response.url
          this.headImage = fileList
        }
      },
      onImageChange1(file, fileList) {
        this.drugDbObj.imageUrlFootFileList = fileList
        var urlList = []
        for (var idx in fileList) {
          if (fileList[idx].response) {
            urlList.push(fileList[idx].response.url)
          }
        }
        this.drugDbObj.imageUrlFootList = urlList
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              DrugDbApi.update(this.drugDbObj).then(() => {
                this.$message.success('修改成功！')
              }).catch(err => {
                console.log(err)
              })
            } else {
              DrugDbApi.save(this.drugDbObj).then(() => {
                this.$message.success('添加成功！')
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      addMaker() {
        this.drugDbObj.drugDbRankMakerList.push({ name: '', area: '' })
      },
      removeMaker(idx) {
        if (idx > -1) {
          this.drugDbObj.drugDbRankMakerList.splice(idx, 1)
        }
      },
      closeForm() {
        this.$refs['form'].resetFields()
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
