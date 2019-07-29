<template>
    <div>
      <el-form ref="form" :model="NavBanner" label-width="120px" :rules="rules">
        <!--<el-form-item label="选择类型">-->
          <!--<el-select v-model="obj" @change="handleChange" value-key="name">-->
            <!--<el-option v-for="(item, index) in dictionary.NavBanners" :key="index" :value="item" :label="item.name"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="导航名称" prop="email">
          <el-input v-model="NavBanner.name"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="img">
          <!--<el-image v-if="NavBanner.img" :src="NavBanner.img" style="width: 200px;height: 200px"></el-image>-->
          <file-uploader :http-request="fileUploadRequest" :on-remove="handleRemove" :fileList="getFileList([NavBanner.img])" :limit="1"></file-uploader>
        </el-form-item>
        <el-form-item label="跳转地址" prop="email">
          <el-input v-model="NavBanner.url"></el-input><el-button  type = 'text' @click="preview(NavBanner.url)" >预览</el-button>
        </el-form-item>
        <el-form-item label="地址辅助" prop="email">
          <el-select v-model="obj" @change="handleChange" value-key="name">
            <el-option v-for="(item, index) in dictionary.NavBanners" :key="index" :value="item" :label="item.name" :width="50"></el-option>
          </el-select>
          <el-select v-model="obj.id"
                     v-if="obj.rel"
                     filterable
                     remote
                     placeholder="请输入关键词"
                     :remote-method="objRemoteMethod"
                     :loading="loading">
            <el-option
              v-for="item in objIds"
              :key="item.id"
              :label="item.name?item.name:item.title"
              :value="item.id">
            </el-option>
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
  import NavBannerApi from '@/api/HomePage/NavBanner'
  import FileUploader from '@/components/FileUploader'
  import { uploadFile } from '@/utils/ali-upload'
  import { mapGetters } from 'vuex'
  import MedicineApi from '@/api/medicine'
  import DiseaseApi from '@/api/disease'
  import ArticleApi from '@/api/articles'
  import CasesApi from '@/api/articles'

  export default {
    name: 'edit',
    components: {
      FileUploader
    },
    data() {
      return {
        obj: {},
        NavBanner: {
          name: '',
          img: '',
          url: ''
        },
        isUpdate: false,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请填写频道名称' }
          ]
        },
        medicines: [],
        diseases: [],
        articles: [],
        cases: [],
        loading: false
      }
    },
    watch: {
      obj(value, oldValue) {
        this.NavBanner.url = window.location.host + '/#' + value.url + (value.rel ? ('/' + value.id) : '')
      }
    },
    computed: {
      ...mapGetters(['dictionary']),
      objIds() {
        if (!this.obj.rel) {
          return []
        } else if (this.obj.rel === 'medicine') {
          return this.medicines
        } else if (this.obj.rel === 'disease') {
          return this.diseases
        } else if (this.obj.rel === 'article') {
          return this.articles
        } else if (this.obj.rel === 'case') {
          return this.cases
        }
      }
    },
    created() {
    },
    methods: {
      editForm(entity) {
        this.isUpdate = true
        this.NavBanner = Object.assign(this.NavBanner, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isUpdate) {
              NavBannerApi.update(this.NavBanner).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              NavBannerApi.save(this.NavBanner).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      preview(url) {
        window.open(url.indexOf('http') > -1 ? url : 'http:\/\/' + url, '_blank')
      },
      closeForm() {
        this.$refs['form'].resetFields()
        this.$emit('close')
      },
      handleChange(opt) {
        this.NavBanner.url = opt.url
      },
      handleRemove() {
        this.NavBanner.img = ''
      },
      getFileList(...url) {
        const objs = url.map(l => {
          return { name: 'img', url: l }
        })
        return [].concat(...objs)
      },
      fileUploadRequest(opt) {
        uploadFile(
          opt.file,
          res => {
            this.NavBanner.img = res.url
            opt.onSuccess(res)
          },
          err => {
            console.log(err)
          }
        )
      },
      objRemoteMethod(query) {
        if (!this.obj.rel) {
          return []
        } else if (this.obj.rel === 'medicine') {
          this.medicineRemoteMethod(query)
        } else if (this.obj.rel === 'disease') {
          this.diseaseRemoteMethod(query)
        } else if (this.obj.rel === 'article') {
          this.articleRemoteMethod(query)
        } else if (this.obj.rel === 'cases') {
          this.casesRemoteMethod(query)
        }
      },
      medicineRemoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            MedicineApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }, fields: ['id', 'name', 'shotName'] }).then(data => {
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
      diseaseRemoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            DiseaseApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }, fields: ['id', 'name'] }).then(data => {
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
      articleRemoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            ArticleApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }, andCondition: { type: 0 }, fields: ['id', 'title'] }).then(data => {
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
      casesRemoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            CasesApi.queryPage({ pageObj: { current: 1, size: 10 }, likeCondition: { name: query }, andCondition: { type: 1 }, fields: ['id', 'title'] }).then(data => {
              this.cases = data.obj.records
            }).catch(err => {
              console.log(err)
              this.$message.warning(err.msg)
            })
          }, 200)
        } else {
          this.options = []
        }
      }
    }
  }
</script>

<style scoped>

</style>
