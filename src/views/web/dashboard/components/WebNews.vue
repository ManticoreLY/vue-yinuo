<template>
  <div class="web-news">
    <div v-for="(item,index) in newsReportVo.newsArticles" :key="index" class="news-item">
      <el-image :src="item.abstractImg" :fit="'fit'" style="width: 220px;height: 160px"/>
      <div>
        <p class="title" style="font-size: 1.75rem;height: 30px;">
          <router-link :to="'news/channel/' + item.id">{{item.title}}</router-link>
        </p>
        <p class="date" style="font-size:1.5rem;color: #7f7f7f;height: 2rem;line-height: 2rem">{{item.createdDt}}</p>
        <p class="content" style="font-size:1.25rem;color:#7f7f7f;height: 80px;text-indent:2rem;overflow: hidden">{{item.abstractText}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import home from '@/api/Homepage/home'
  export default {
    name: 'WebNews',
    data() {
      return {
        newsReportVo: {}
      }
    },
    created() {
      home.newsReport().then(data => {
        this.newsReportVo = data.obj
      })
    }
  }
</script>

<style scoped>
  .web-news{width: 100%;height: auto;display: flex;flex-flow:row wrap;align-items: center;justify-content: flex-start}
  .web-news .news-item{position:relative;display: inline-block;width: 50%;margin-bottom: 20px;display: inline-flex; align-items: flex-start;align-content: stretch;justify-content: flex-start}
  .web-news .news-item>div:nth-child(1){display: inline-block;width: 40%; margin-right: 15px}
  .web-news .news-item>div:nth-child(2){display: inline-block; width: 50%}
  .web-news .news-item>div:nth-child(2)>p.content{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical}
  .web-news .news-item>div:nth-child(2)>p.title{white-space: nowrap;overflow: hidden;text-overflow: ellipsis}
  .web-news .news-item p.title a:hover{color: #1daca4}
</style>
