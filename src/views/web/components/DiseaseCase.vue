<template>
  <div class="words">
    <div class="word-name">{{ name }}</div>
    <div class="word-title" v-for="(article,index) in diseaseCases" :key="index">
      <router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id"  style="color: #545454">{{article.abstractText}}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DiseaseCase',
    props: {
      diseaseCases: Array,
      name: {
        type: String,
        default: '最新案例'
      }
    }
  }
</script>

<style scoped>
.words{min-height: 200px;border: 1px solid #eee;margin-bottom: 20px;padding:15px;}
.words>div.word-name{width:initial;border-bottom: 1px solid #eee;height: 4rem;line-height: 4rem;font-size: 1.5rem;font-weight: 600}
.words>div.word-title{width:initial;border-bottom: 1px solid #eee;height: 3rem;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;
  white-space: nowrap;overflow: hidden;text-overflow: ellipsis}
.words>div.word-title a:hover{color: #005cff}
</style>
