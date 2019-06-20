<template>
  <div class="web-nav">
    <div class="nav-images">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="banner in banners" :key="banner.id" style="height: 400px">
          <a :href="`http://${banner.url}`" target="_blank">
            <el-image :src="banner.img" style="width: 100%;height:100%" fit="fill"></el-image>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import home from '@/api/Homepage/home'
  export default {
    name: 'NavBar',
    data() {
      return {
        banners: [],
        imgs: [
          'static/img/首页banner2.jpg', 'static/img/首页banner3.jpg', 'static/img/首页banner4.jpg',
          'static/img/首页banner2.jpg', 'static/img/首页banner5.jpg', 'static/img/首页banner6.jpg'
        ]
      }
    },
    created() {
      home.banners().then(data => {
        this.banners = data.obj
      })
    }
  }
</script>

<style scoped>
  .web-nav{width: 100%;height: 400px;margin-bottom: 5rem}
  .web-nav .nav-images{position: relative}
  >>>.el-carousel__container{height: 400px}
</style>
