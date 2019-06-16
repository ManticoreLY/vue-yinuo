<template>
  <div class="words">
    <div class="word-name">乙肝案例</div>
    <div class="word-title" v-for="(article,index) in diseaseCases" :key="index"><router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id"  style="color: #005cff">{{article.title}}</router-link></div>
  </div>
</template>

<script>
  export default {
    name: 'DiseaseCase',
    data() {
      return {
        diseaseCases: []
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
