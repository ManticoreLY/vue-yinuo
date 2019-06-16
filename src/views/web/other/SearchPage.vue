<template>
    <div class="search">
      <div class="search-item" style="border: 1px solid #eee">
        <el-image style="width: 30%;height: 100%" v-if="medicine && medicine.image" :src="medicine.image.split(',')[0]" ></el-image>
        <div class="search-main" v-if="medicine">
          <div class="key-word" style="height: 4rem;">{{medicine.name}}</div>
          <div class="search-content" style="height: 8rem;">{{medicine.shotIntroduct}}</div>
          <div class="more" style="width: 100%;height: 2rem;text-align: right;margin-top:15px;">
            <el-button type="primary" style="padding: 5px;"  @click="toMedicinePage(medicine.id)" >立即查看</el-button>
          </div>
        </div>
      </div>
      <div class="search-list">
        <div v-for="item in tableList" :key="item.id" class="list-item">
          <div class="list-title">{{item.title}}</div>
          <div class="list-content">
            <el-image style="width: 22%;height: 120px;" :src="item.abstractImg"></el-image>
            <div style="position: relative;margin-left: 20px;width: 76%;height: 120px">
              <div class="item-content">
                {{item.abstractText}}
              </div>
              <div class="item-info">
                <span v-if="item.channel"><i>分类:</i> {{item.channel.name}}</span>
                <span><i>作者:</i> {{item.author}}</span>
                <span><i>日期:</i> {{item.updatedDt}}</span>
                <span><i>关键词:</i>{{item.keywords}}</span>
              </div>
            </div>
          </div>
        </div>
        <el-pagination style="margin-top: 20px"
                       :current-page="page.current"
                       :page-size="page.size"
                       :total="page.total"
                       @current-change="pageChange"
                       @size-change="sizeChange"
                       prev-text="上一页"
                       next-text="下一页"
                       layout="prev, pager, next">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import MedicineApi from '@/api/medicine/medicineFront'
  import ArticlesApi from '@/api/articlesFront'
  export default {
    name: 'SearchPage',
    mounted() {
      this.search()
    },
    data() {
      return {
        page: {},
        tableList: [],
        medicine: null,
        medicineQuery: {
          pageObj: {
            current: 1,
            size: 10
          },
          likeCondition: {
            name: ''
          },
          fields: [
            'id',
            'name',
            'image',
            'shot_introduct shotIntroduct'
          ]
        },
        newsArticleQuery: {
          pageObj: {
            current: 1,
            size: 10
          },
          likeCondition: {
            title: ''
          },
          orderByConditionStr: {
          },
          fields: [
            'id',
            'author',
            'channel_id channelId',
            'title',
            'abstract_text abstractText',
            'abstract_img abstractImg',
            'type',
            'created_dt createdDt',
            'updated_dt updatedDt'
          ]
        }
      }
    },
    watch: {
      $route() {
        this.search()
      }
    },
    methods: {
      search() {
        const keywords = this.$route.query.keywords
        this.medicineQuery.likeCondition.name = keywords
        this.newsArticleQuery.likeCondition.title = keywords
        this.newsArticleQuery.orderByConditionStr = {}
        this.newsArticleQuery.orderByConditionStr['title like \"' + '%' + keywords + '%' + '\"'] = 'desc'
        this.newsArticleQuery.orderByConditionStr['abstract_text like \"' + '%' + keywords + '%' + '\"'] = 'desc'
        this.newsArticleQuery.orderByConditionStr['content like \"' + '%' + keywords + '%' + '\"'] = 'desc'
        this.medicineSearch()
        this.newsArticleSearch()
      },
      newsArticleSearch() {
        ArticlesApi.queryPage(this.newsArticleQuery).then(data => {
          this.page = Object.assign(this.page, data.obj)
          this.tableList = data.obj.records
          console.log(data.obj)
        }).catch(err => {
          console.log(err)
        })
      },
      medicineSearch() {
        MedicineApi.queryPage(this.medicineQuery).then(data => {
          if (data.obj.records && data.obj.records.length > 0) {
            this.medicine = Object.assign({}, data.obj.records[0])
            console.log(this.medicine)
          }
        }).catch(err => {
          console.log(err)
          this.$message.warning(err.msg)
        })
      },
      toMedicinePage(id) {
        debugger
        const routeData = this.$router.resolve({ path: '/medicineInfo/' + id })
        window.open(routeData.href, '_blank')
      },
      pageChange(val) {
        this.newsArticleQuery.pageObj.current = val
        this.newsArticleSearch()
      },
      sizeChange(val) {
        this.newsArticleQuery.pageObj.size = val
        this.newsArticleSearch()
      }
    }
  }
</script>

<style scoped>
.search{width: 100%;min-height: 600px}
.search .search-item{display: flex; align-items: flex-start; align-content: stretch; justify-content: space-between}
.search .search-item, .search .search-list{width: 92%;padding: 20px;min-height: 120px}
.search .search-item .search-main{margin-left: 20px;width: 65%;display: inline-block;flex-flow: column nowrap; align-items: flex-start;align-content: stretch;justify-content:flex-start}
.search .search-item .search-main .key-word{font-size: 2.25rem; font-weight: 600}
.search .search-item .search-main .search-content, .search .search-list .list-item .item-content{
  font-size: 1.5rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical}
.search .search-list .list-item{display:block;width: 100%;height: 150px;margin-bottom: 20px;}
.search .search-list .list-item .list-title{margin-bottom: 10px;font-size: 1.75rem; text-decoration: underline;color: #008aff}
.search .search-list .list-item .list-content{width: 100%;display: flex; align-items: flex-start;align-content: stretch; justify-content: space-between}
.search .search-list .list-item .item-info{position:absolute;bottom: 10px;left: 0;font-size: 1.25rem;margin-top: 15px}
.search .search-list .list-item .item-info>span{display: inline-block;marign-right: 15px;}
.search .search-list .list-item .item-info>span i{color: #ccc;font-style:normal}
</style>
