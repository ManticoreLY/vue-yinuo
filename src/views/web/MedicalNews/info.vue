<template>
  <div class="page">
    <div class="nav">当前位置：
      <router-link :to="'/'">医诺寰宇海外医疗</router-link>
      >
      <router-link :to="'/news'">医疗新闻</router-link>
      >
      <router-link :to="'/news'">肿瘤新闻</router-link>
      > {{medicalArticle.title}}
    </div>
    <div class="content">
      <div class="main">
        <div class="title-info">
          <div style="font-size: 2rem;">{{medicalArticle.title}}</div>
          <div style="font-size: 1.2rem">
            <span>时间: {{medicalArticle.updatedDt}}</span>&nbsp;&nbsp;&nbsp;
            <span>来源: {{medicalArticle.source?medicalArticle.source:'医诺'}}</span>&nbsp;&nbsp;&nbsp;
            <span>作者: {{medicalArticle.author?medicalArticle.author:'医诺海外医疗'}}</span>
          </div>
        </div>
        <div class="content-info">
          <div class="content" v-html="medicalArticle.content"></div>
          <!--<div class="info">详情请访问:-->
            <!--<a>肿瘤: https://www.baidu.com</a>-->
          <!--</div>-->
        </div>
        <div class="clare-info">
          <p style="font-size: 1.375rem;font-weight: 600">免责声明</p>
          <p style="color: #5a5a5a;font-size: 1.15rem;">由本文所表达的关于疾病的建议都不应该被视为医生的建议或替代品, 请咨询您的治疗医生了解更多细节. 本站信息权供参考, 医诺寰球不承担任何责任.</p>
        </div>
        <div class="other-info">
          <span v-if="articleInfo.prevArticle">上一篇: <router-link tag="a" target="_blank" :to="'/articleInfo/'+articleInfo.prevArticle.id"  style="color: #005cff">{{articleInfo.prevArticle.title}}</router-link></span>
          <span v-if="articleInfo.nextArticle">下一篇: <router-link tag="a" target="_blank" :to="'/articleInfo/'+articleInfo.nextArticle.id"  style="color: #005cff">{{articleInfo.nextArticle.title}}</router-link></span>
        </div>
        <related-recommand/>
      </div>
      <div class="right">
        <!--频道栏目-->
        <channel/>
        <div class="words test">
          <img src="static/img/医诺寰球公众号二维码.jpg" style="width: 120px;height: 120px"/>
          <div style="font-size: 1.5rem">添加医诺寰球官方客服免费咨询</div>
          <div style="margin: 5% auto;width: 90%;font-size: 1.2rem;text-indent: 2rem">已有<em>127822</em>名患者成功添加专业医学博士, 7*24小时响应需求, 用药参考, 前沿治疗, 报告解读您在治疗过程中遇到的所有问题.</div>
        </div>
        <!--最新文章-->
        <latest-articles/>
        <!--本周热门文章-->
        <hot-articles/>
      </div>
    </div>
  </div>
</template>

<script>
  import articleApi from '@/api/articlesFront'
  import channelApi from '@/api/channelFront'
  import HotArticles from '../components/HotArticles'
  import DiseaseCase from '../components/DiseaseCase'
  import Channel from '../components/Channel'
  import RelatedRecommand from '../components/RelatedRecommand'
  export default {
    name: 'index',
    components: {
      HotArticles,
      DiseaseCase,
      Channel,
      RelatedRecommand
    },
    data() {
      return {
        medicalArticle: {
          title: '',
          abstractText: '',
          content: '',
          author: '',
          abstractImg: ''
        },
        articleInfo: {},
        channels: [],
        items: ['乙肝新闻', '丙肝新闻', '肿瘤新闻', '试管婴儿新闻', '赴美生子新闻', '心脏支架新闻', '眼角膜新闻', 'HPV疫苗新闻', '智能诊疗新闻', '癌症早筛新闻', '海外医疗新闻', '男科新闻', '周边新闻', '糖尿病新闻', '风湿免疫新闻']
      }
    },
    created() {
      this.initData()
    }, methods: {
      initData() {
        articleApi.findFrontOne(this.$route.params.id).then(data => {
          this.medicalArticle = data.obj
        })
        articleApi.findFrontInfo(this.$route.params.id).then(data => {
          this.articleInfo = data.obj
        })
        channelApi.queryPage({ pageObj: { current: 1, size: 200 }, andCondition: { type: 0 }}).then(data => {
          this.channels = data.obj.records
        })
      },
      toChannelPage(id) {
        const routeData = this.$router.resolve({ path: '/news/channel/' + id })
        window.open(routeData.href, '_blank')
      }
    }
  }
</script>

<style scoped>
.content{width: 90%; padding: 0 5%; position: relative; display: flex; align-items: flex-start; align-content: stretch; justify-content: space-between}
.content .main{width: 70%;margin: 0; padding: 0;}
.content .main .title-info{width: 100%;height: 100px;border-bottom: 1px solid #eee; display: flex; flex-flow: column nowrap; align-items: center; align-content: center; justify-content: space-around}
.content .main .content-info{position: relative;width: 90%; padding: 30px 5%;min-height: 600px}
.content .main .content-info .info{position: absolute; height: 3rem; line-height: 3rem; width: auto; left: 20px; bottom: 0; font-size: 1.15rem;}
.content .main .clare-info{position: relative;width: 90%; margin: 15px; padding: 15px; border: 6px double #eee}
.content .main .other-info{position: relative;width: 90%; margin: 20px; display: flex; align-items: center; align-content: center; justify-content: space-between}
.content .main .other-info span{font-size: 1.1rem;}
.content .right .words{position:relative;height: 100%}
.content .right .test{min-height: 260px;display: flex; flex-flow: column nowrap; align-items: center; align-content: center; justify-content: space-around}
.content .right .words .word-name{padding-bottom: 1rem;font-size: 1.6rem;border-bottom: 1px solid #eee;}
.content .right .words .word-title{width:initial;border-bottom: 1px solid #eee;height: 3rem;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;
  white-space: nowrap;overflow: hidden;text-overflow: ellipsis}
.content .right .words .word-items{padding: 20px 0;display: flex;flex-flow: row wrap;}
</style>
