<template>
  <div class="web-news">
    <div v-for="(item, index) in medicalNewsVo.typeVos" :key="index" class="news-module">
      <div class="module-name">{{item.name}}</div>
      <div class="module-cont">
        <div style="width: 36%;margin-right: 15px;margin-top: 10px"><el-image :src="item.newsArticles[0].abstractImg" style="width: 100%;height: 160px;"/></div>
        <div style="width: 58%">
        <p style="font-size:1.75rem;color:#1daca4;height: 4.25rem;">
          <router-link :to="'articleInfo/' + item.newsArticles[0].id" tag="a" target="_blank">
          {{item.newsArticles[0].title.substring(0, 18)}}<em v-show="item.newsArticles[0].title.length > 18">...</em>
          </router-link>
        </p>
        <p style="font-size: 1.25rem;color:#7f7f7f;text-indent: 2rem;height: 100px;width: 100%;overflow: hidden;margin-top: 10px;">1月12日，{{item.newsArticles[0].abstractText.substring(0, 60) + '...'}}
          <router-link :to="'articleInfo/' + item.newsArticles[0].id" tag="a" target="_blank">【详情】</router-link>
        </p>
        </div>
      </div>
      <div class="module-title">
        <div v-for="(vo, index) in item.newsArticles" :key="index" v-if="index > 1" style="margin-top: 10px">
          <div class="ellipsis" style="font-size: 1.25rem;color:#7f7f7f;width: 64%">
            <router-link :to="'articleInfo/' + vo.id" tag="a" target="_blank">{{vo.title}}</router-link>
          </div>
          <div style="width: 20%">{{vo.createdDt.substring(0, 10)}}</div>
      </div>
    </div>
  </div>
    <div style="width: 100%;text-align: center;margin-top: 20px;">
      <router-link :to="'/news'">
        <el-button style="background-color: #1daca4;color:#efefef">查看更多</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import home from '@/api/Homepage/home'
  export default {
    name: 'MedicalReport',
    data() {
      return {
        medicalNewsVo: {}
      }
    },
    created() {
      home.medicalNews().then(data => {
        this.medicalNewsVo = data.obj
      })
    }
  }
</script>

<style scoped>
  .web-news{width: 100%;height: auto;display: flex;flex-flow:row wrap;justify-content: flex-start;align-items:center;align-content: stretch}
  .web-news .news-module{position:relative;display: inline-block;width: 31%;margin:5px 10px;border-right: 1px solid #ccc}
  .web-news .news-module:last-child{border:none}
  .web-news .news-module .module-name{font-size: 2.1rem;height: 36px}
  .web-news .news-module .module-cont{height: 175px;width: 100%;display: inline-flex;justify-content: flex-start;align-content: stretch;align-items:center}
  .web-news .news-module .module-cont>div{display: inline-block;}
  .web-news .news-module .module-title{width: 96%;}
  .web-news .news-module .module-title>div{display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: center;align-content: stretch}
</style>
