<template>
  <div>
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <!--<el-form-item label="序号" prop="indexNo">-->
        <!--<el-input-number v-model="form.indexNo" style="width: 240px;"></el-input-number>-->
      <!--</el-form-item>-->
      <el-form-item label="药品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="简称/英文名" prop="name">
        <el-input v-model="form.shotName"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="make">
        <el-input v-model="form.make"></el-input>
      </el-form-item>
      <el-form-item label="剂型" prop="form">
        <el-input v-model="form.form"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="form.unit"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="spec">
        <el-input v-model="form.spec"></el-input>
      </el-form-item>
      <el-form-item label="药品短简介" prop="shotIntroduct">
        <el-input v-model="form.shotIntroduct" type="textarea" :col="4"  maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="药品简介标题" prop="introductTitle">
        <el-input v-model="form.introductTitle"></el-input>
      </el-form-item>
      <el-form-item label="药品简介" prop="introduct">
        <UE id="introduct" :defaultMsg="form.introduct" :config=config ref="introduct"></UE>
      </el-form-item>
      <el-form-item label="副作用及并发症标题" prop="sideEffectTitle">
        <el-input v-model="form.sideEffectTitle"></el-input>
      </el-form-item>
      <el-form-item label="副作用及并发症" prop="sideEffect">
        <UE id = "sideEffect" :defaultMsg="form.sideEffect" :config=config ref="sideEffect"></UE>
      </el-form-item>
      <el-form-item label="耐药性标题" prop="resistantTitle">
        <el-input v-model="form.resistantTitle"></el-input>
      </el-form-item>
      <el-form-item label="耐药性" prop="resistant">
        <UE id = "resistant" :defaultMsg="form.resistant" :config=config ref="resistant"></UE>
      </el-form-item>
      <el-form-item label="药品图片" prop="image">
        <FileUploader :httpRequest="fileUploadRequest" :fileList="imageFile" :onChange="onImageChange0"  :limit="6"></FileUploader>
      </el-form-item>
      <el-form-item label="相关药品:" prop="reMedicineIds">
        <el-select v-model="form.reMedicineIds" value-key="id" multiple
                   filterable
                   reserve-keyword
                   placeholder="请输入关键词">
          <el-option v-for="item in relMedicines" :key="item.id" :value="item.id" :label="item.shotName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="相关新闻:" prop="newsArticleIds">
        <el-select v-model="form.newsArticleIds" value-key="id" multiple
                   filterable
                   reserve-keyword
                   remote
                   :remote-method="articleRemoteMethod"
                   placeholder="请输入关键词"
                   :loading="loading">
          <el-option v-for="item in articles" :key="item.id" :value="item.id" :label="item.title"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对应疾病:" prop="fitDiseaseIds">
        <el-select v-model="form.fitDiseaseIds" value-key="id" multiple
                   filterable
                   reserve-keyword
                   placeholder="请输入关键词"
                   remote
                   :remote-method="diseaseRemoteMethod"
                   :loading="loading">
          <el-option v-for="item in diseases" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
        <rank-pad :data-list="fitDisease" @returnData="(data) => { form.fitDiseaseIds = data.map(one => one.id) }"></rank-pad>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm">保存</el-button>
        <el-button type="info" @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import medicine_api from '@/api/medicine'
    import DiseaseApi from '@/api/disease'
    import articlesApi from '@/api/articles'
    import { uploadFile } from '@/utils/ali-upload'
    import FileUploader from '@/components/FileUploader'
    import UE from '@/components/ue.vue'
    import RankPad from '@/components/RankPad'

    export default {
      name: 'edit',
      components: {
        FileUploader,
        UE,
        RankPad
      },
      data() {
        return {
          articles: [],
          loading: false,
          imageFile: [],
          isUpdate: false,
          config: {
            initialFrameWidth: null,
            initialFrameHeight: 350
          },
          form: {
            indexNo: null,
            shotName: '',
            foreignName: '',
            image: '',
            make: '',
            spec: '',
            unit: '',
            shotIntroduct: '',
            introduct: '',
            introductTitle: '',
            sideEffect: '',
            resistant: '',
            resistantTitle: '',
            reMedicineIds: [],
            sideEffectTitle: '',
            fitDiseaseIds: ''
          },
          rules: {
            name: [
              { required: true, trigger: 'blur', message: '请输入药品名称' }
            ],
            message: [
              { required: true, trigger: 'blur', message: '请输入药品说明' }
            ]
          },
          relMedicines: [],
          diseases: [],
          selectedDiseases: []
        }
      },
      computed: {
        fitDisease() {
          return this.selectedDiseases.filter(one => this.form.fitDiseaseIds.indexOf(one.id) > -1).sort((a, b) => this.form.fitDiseaseIds.indexOf(a.id) - this.form.fitDiseaseIds.indexOf(b.id))
        }
      },
      created() {
        this.$store.dispatch('getAllMedicines').then(data => {
          this.relMedicines = data
        })
      },
      methods: {
        initData(item) {
          /* medicine_api.getEntity(id).then(data => {
            this.form = Object.assign({}, data.obj)
          }).catch(err => {
            console.log(err)
          })*/
          medicine_api.getFullOne(item.id).then(data => {
            this.form = Object.assign({}, data.obj)
            this.imageFile = []
            if (this.form.image) {
              var imageUrlList = this.form.image.split(',')
              for (var j in imageUrlList) {
                this.imageFile.push({
                  url: imageUrlList[j]
                })
              }
            }
            this.diseases = this.form.medicineDiseaseRelations.map(item => ({ id: item.disease.id, name: item.disease.name }))
            this.selectedDiseases = this.diseases
            this.isUpdate = true
          })
          this.articleRemoteMethod(' ')
        },
        saveForm() {
          this.form.introduct = this.$refs.introduct.getUEContent()
          this.form.sideEffect = this.$refs.sideEffect.getUEContent()
          this.form.resistant = this.$refs.resistant.getUEContent()
          this.$refs['form'].validate((valid) => {
            if (valid) {
              if (this.isUpdate) {
                medicine_api.update(this.form).then(data => {
                  this.$message.success('保存成功')
                  this.resetForm()
                }).catch(err => {
                  console.log(err)
                })
              } else {
                medicine_api.save(this.form).then(data => {
                  this.$message.success('保存成功')
                  this.resetForm()
                }).catch(err => {
                  console.log(err)
                })
              }
            } else {
              this.$message.error('信息不全')
            }
          })
        },
        articleRemoteMethod(query) {
          if (query !== '') {
            this.loading = true
            setTimeout(() => {
              this.loading = false
              articlesApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { title: query }}).then(data => {
                this.articles = data.obj.records
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
          this.imageFile = fileList
          var urlList = []
          for (var idx in fileList) {
            if (fileList[idx].response) {
              urlList.push(fileList[idx].response.url)
            }
          }
          this.form.image = urlList.join(',')
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
        diseaseRemoteMethod(query) {
          if (query !== '') {
            this.loading = true
            setTimeout(() => {
              this.loading = false
              DiseaseApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }}).then(data => {
                this.diseases = data.obj.records
                this.selectedDiseases = this.selectedDiseases.concat(this.diseases.filter(one => this.selectedDiseases.map(one => one.id).indexOf(one.id) < 0))
              }).catch(err => {
                console.log(err)
                this.$message.warning(err.msg)
              })
            }, 200)
          } else {
            this.options = []
          }
        },
        resetForm() {
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
