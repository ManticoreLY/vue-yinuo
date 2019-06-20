<template>
  <div class="words">
    <div class="word-name">{{ name }}</div>
    <div class="word-title" v-for="(article,index) in articleInfo.newArticles" :key="index"><router-link tag="a" target="_blank" :to="(type===0?'/articleInfo/':'/casesInfo/') +article.id"  style="color: #005cff">{{article.title}}</router-link></div>
  </div>
</template>

<script>
  import ArticlesApi from '@/api/articlesFront'
  export default {
    name: 'latestArticles', // 最新文章
    props: {
      name: {
        type: String,
        default: '最新文章'
      },
      type: {
        default: 0
      }
    },
    data() {
      return {
        articleInfo: {}
      }
    },
    mounted() {
      ArticlesApi.findFrontInfo(0, this.type).then(data => {
        this.articleInfo = data.obj
      })
    }
  }
</script>

<style scoped>
  .words{min-height: 200px;border: 1px solid #eee;margin-bottom: 20px;padding:15px;}
  .words>div.word-name{width:initial;border-bottom: 1px solid #eee;height: 4rem;line-height: 4rem;font-size: 1.5rem;font-weight: 600}
  .words>div.word-title{width:initial;border-bottom: 1px solid #eee;height: 3rem;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;
    white-space: nowrap;overflow: hidden;text-overflow: ellipsis}
</style>
