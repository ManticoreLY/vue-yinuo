<template>
  <div class="web-brand">
    <div v-for="(item, index) in brands" :key="index" :class="classSeries(index)">
      <div class="title"><img :src="item.icon" class="el-icon-bell" />&nbsp;&nbsp;{{ item.title }}</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
  import home from '@/api/Homepage/home'
  export default {
    name: 'brand',
    data() {
      return {
        brands: []
      }
    },
    methods: {
      classSeries(item) {
        if (item % 2 === 0) {
          return 'brand-item normal'
        } else {
          if (item === 1) {
            return 'brand-item blue'
          } else if (item === 3) {
            return 'brand-item graygreen'
          } else if (item === 5) {
            return 'brand-item yellow'
          } else if (item === 7) {
            return 'brand-item green'
          }
        }
      }
    },
    created() {
      home.brands().then(data => {
        this.brands = data.obj
      })
    }
  }
</script>

<style scoped>
  .web-brand{position:relative;width: 96%;margin: 0 auto;height: auto;display: flex;flex-flow: row wrap; justify-content: flex-start}
  .web-brand .brand-item{height: 285px;width: 33%;}
  .web-brand .brand-item .title{height: 75px;font-size:2.5rem;margin: 20px;display: flex;align-items: center; align-content: center;justify-content: center}
  .web-brand .brand-item .content{height: 200px;font-size:2rem;padding:0 15px;}
  .web-brand .brand-item.normal{background: #f5f5f5;}
  .web-brand .brand-item.normal .title{color: #1daca4}
  .web-brand .brand-item.blue{background: #2b96cc;color: #fff}
  .web-brand .brand-item.green{background: #29a466;color: #fff}
  .web-brand .brand-item.graygreen{background: #1daca4;color: #fff}
  .web-brand .brand-item.yellow{background: #f0a226;color: #fff}
  .web-brand .brand-item.blue, .web-brand .brand-item.green, .web-brand .brand-item.graygreen, .web-brand .brand-item.yellow{font-size:4rem;color:#FFF}
</style>
