<template>
    <div class="cure-case">
      <div class="bg">
        <el-image :src="img_url" :fit="'fill'"></el-image>
      </div>
      <div class="nav">当前位置：
        <router-link :to="'/'">医诺寰宇海外医疗</router-link>
         >
        <router-link :to="'/cases'">医疗案例</router-link>
         >
      </div>
      <div class="content">
        <div class="main">
          <div class="main-title">医疗案例</div>
          <div class="main-case" v-for="item in cases" :key="item.id">
            <div class="img">
              <el-image :src="item.img" :fit="'contain'"></el-image>
            </div>
            <div class="cont">
              <div class="title">{{item.title}}<span>更新时间：{{item.updatedDt}}</span></div>
              <div class="info">{{item.describe}}...<a style="color:red">【详情】</a></div>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              small
              prev-text="上一页"
              next-text="下一页"
              :current-page="page.current"
              :page-size="page.size"
              :total="page.total"
              layout="prev, pager, next">
            </el-pagination>
          </div>
        </div>
        <div class="right">
          <div class="words">
            <div class="word-name">最新文章</div>
            <div class="word-title" v-for="(article,index) in articleInfo.newArticles" :key="index"><router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id"  style="color: #005cff">{{article.title}}</router-link></div>
          </div>
          <div class="words">
            <div class="word-name">本周热门文章</div>
            <div class="word-title" v-for="(article,index) in articleInfo.hotArticles" :key="index"><router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id"  style="color: #005cff">{{article.title}}</router-link></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import CaseApi from '@/api/casesFront'
  import ArticlesApi from '@/api/articlesFront'
  export default {
    name: 'index',
    data() {
      return {
        img_url: 'static/img/info/banner_patientStory.png',
        cases: [],
        articleInfo: {},
        query: {
          pageObj: {
            current: 1,
            size: 10
          }
        },
        page: {},
        latest_words: ['西达本胺能延缓乳腺癌内分泌治疗..', '吉西他滨与奥沙利铂辅助治疗胆管..', '病毒性丙肝发展到肝癌需要多久？', '阿格列汀治疗糖尿病患者的疗效怎',
          '糖尿病药曲格列汀治疗时要注意哪', '仑伐替尼瑞戈非尼是治疗原发肝癌..', '晚期肺癌患者一线用药是先选择AZ..', '饭后血糖超20的患者除了吃曲格列']
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        CaseApi.queryPage(this.query).then(data => {
          this.page = Object.assign(this.page, data.obj)
          this.cases = data.obj.records
        }).catch(err => {
          console.log(err)
        })
        ArticlesApi.findFrontInfo(0).then(data => {
          this.articleInfo = data.obj
        })
      }
    }
  }
</script>

<style scoped>
  .cure-case{width: 100%;background: #fff}
  .bg{width: 100%}
  .nav{width: 100%;padding: 10px 0;height: 2rem;line-height: 2rem;font-size: 1.25rem;color: #5a5a5a}
  .content{position: relative;width: 100%;display: flex; flex-flow: row wrap; align-items: flex-start;align-content: stretch;justify-content: space-between}
  .content .main{width: 73%;padding: 10px;min-height: 500px;border: 1px solid #eee;}
  .content .main .main-title{width: 90%;height: 4rem;line-height: 4rem;padding: 5px 5%;border-bottom: 1px solid #eee;font-size: 1.5rem;font-weight: 600}
  .content .main .main-case{width: initial;padding:10px;border-bottom: 1px dotted #eee;min-height: 150px;
    display: inline-flex;flex-flow: row nowrap; align-items: flex-start;align-content: stretch;justify-content: space-between}
  .content .main .main-case .img{width: 25%;}
  .content .main .main-case .cont{width: 70%;}
  .content .main .main-case .cont .title{position: relative;height: 4rem;line-height: 4rem;font-size: 1.5rem;font-weight: 600;}
  .content .main .main-case .cont .title span{font-size: 1.25rem;color: #5a5a5a;display: block;float:right;margin-right: 15px;}
  .content .main .main-case .cont .info{position: relative;margin-top: 20px; font-size: 1.25rem;color: #5a5a5a;}
  .content .right .words{min-height: 200px;border: 1px solid #eee;margin-bottom: 20px;padding:15px;}
  .content .right .words>div.word-name{width:initial;border-bottom: 1px solid #eee;height: 4rem;line-height: 4rem;font-size: 1.5rem;font-weight: 600}
  .content .right .words>div.word-title{width:initial;border-bottom: 1px solid #eee;height: 3rem;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;
      white-space: nowrap;overflow: hidden;text-overflow: ellipsis}
</style>
