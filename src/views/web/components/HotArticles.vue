<template>
  <div class="words">
    <div class="word-name">{{ name }}</div>
    <div class="word-content" v-for="(article,index) in articleInfo.hotArticles" :key="index">
      <div style="width: 40%"><el-image :src="article.abstractImg" fit="fit"/></div>
      <div style="margin-left: 10px;width: 50%">
        <router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id"  style="font-size: 1.15rem">{{article.title}}</router-link>
        <br/><br/>
        <span style="color: #ccc">人气：</span><span style="color: red">{{article.readCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticlesApi from '@/api/articlesFront'
  export default {
    name: 'HotArticles', // 本周热门文章
    props: {
      name: {
        type: String,
        default: '本周热门文章'
      }
    },
    data() {
      return {
        articleInfo: {}
      }
    },
    mounted() {
      ArticlesApi.findFrontInfo(0).then(data => {
        this.articleInfo = data.obj
      })
    }
  }
</script>

<style scoped>
.words{min-height: 200px;border: 1px solid #eee;margin-bottom: 20px;padding:15px;}
.words>div.word-name{width:initial;border-bottom: 1px solid #eee;height: 4rem;line-height: 4rem;font-size: 1.5rem;font-weight: 600}
.words>div.word-content{position: relative;width:100%;margin: 5px;border-bottom: 1px solid #eee;display: flex;justify-content: flex-start;align-content: stretch}
.words>div.word-title{width:initial;border-bottom: 1px solid #eee;height: 3rem;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;
    white-space: nowrap;overflow: hidden;text-overflow: ellipsis}
</style>
