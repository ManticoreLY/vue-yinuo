<template>
    <div>
      <el-form ref="form" :model="newsArticle" label-width="120px" :rules="rules">
        <el-form-item label="选择新闻" prop="newsArticleTitle">
          <el-autocomplete v-model="newsArticle.newsArticleTitle" :fetch-suggestions="querySearchAsync"  placeholder="请输入新闻标题搜索" @select="handleSelect" value-key="title" value="id"></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button type="" @click="closeForm">取消</el-button>
        </el-form-item>
        <el-form-item prop="type">
          <el-radio-group v-model="newsArticle.type">
            <el-radio v-for="(item,index) in typeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import HomeNewsArticleApi from '@/api/HomePage/NewsArticle'
  import ArticleApi from '@/api/articles'
  export default {
    name: 'edit',
    data() {
      return {
        obj: null,
        typeOptions: [
          { value: 1, label: '医疗公告' },
          { value: 2, label: '医疗大事件' },
          { value: 3, label: '全球医疗热点' }
        ],
        NewsSetting: {
          id: '',
          title: '',
          img: '',
          url: ''
        },
        newsArticle: {
          id: null,
          newsArticleId: '',
          newsArticleTitle: '',
          type: null
        },
        query: {
          pageObj: {
            current: 1,
            size: 10
          },
          likeCondition: {
            title: '',
            abstractText: '',
            content: ''
          },
          fields: [
            'id',
            'title'
          ]
        },
        timer: null,
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
        this.newsArticle.id = null
        this.newsArticle.newsArticleId = null
        this.newsArticle.newsArticleTitle = ''
      },
      editForm(entity) {
        debugger
        this.isUpdate = true
        this.newsArticle = Object.assign(this.newsArticle, entity)
      },
      saveForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            debugger
            if (this.isUpdate) {
              HomeNewsArticleApi.update(this.newsArticle).then(data => {
                this.$message.warning('修改成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            } else {
              HomeNewsArticleApi.save(this.NavBanner).then(data => {
                this.$message.warning('添加成功！')
                this.closeForm()
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      },
      getFileList(...url) {
        const objs = url.map(l => {
          return { name: 'img', url: l }
        })
        return [].concat(...objs)
      },
      querySearchAsync(query, callback) {
        if (!query) return
        else {
          debugger
          this.query.likeCondition.title = query
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            ArticleApi.queryPage(this.query).then(data => {
              console.log(data)
              callback(data.obj.records)
            }).catch(err => {
              console.log(err)
              callback([])
            })
          }, 500)
        }
      },
      handleSelect(item) {
        console.log(item)
        this.newsArticle.newsArticleId = item.id
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
