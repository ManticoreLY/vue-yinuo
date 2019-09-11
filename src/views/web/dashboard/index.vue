<template>
  <div id="web-index">
    <keep-alive>
      <web-header style="background: #fff"/>
    </keep-alive>
    <scroll-header class="fix-header"></scroll-header>
    <nav-bar v-if="$route.fullPath === '/dashboard'"/>
    <div class="bg" v-else-if="$route.fullPath === '/cases'">
      <el-image :src="img_url_case" :fit="'fill'"></el-image>
    </div>
    <div class="bg" v-else-if="$route.fullPath === '/drugDB'">
      <el-image :src="img_url_drugdb" :fit="'fill'"></el-image>
    </div>
    <div v-if="$route.fullPath === '/about'" class="web-content1">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div v-else class="web-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <web-info/>
    <footer>
      <div class="footer">
        <div>医诺寰球是出国看病的领导者，国内专业赴印度治疗丙肝、乙肝的团队。印度丙肝新药<b>索非布韦</b>、达卡他韦、<b>吉二代</b>，
          吉印度Mylan产<b>吉三代Hepbest</b>已经在印度上市，治疗所有分型丙肝。印度乙肝<b>TAF</b>新方案，副作用小价格低，
          Mylan产已经在印度上市。肿瘤癌症方案<b>AZD9291,PD-1</b>。糖尿病新药恩格列净。白血病淋巴瘤方案<b>CAR-T</b>疗法。
          更多资讯请访问医疗新闻。</div>
        <div>Copyright&nbsp;&copy;&nbsp;2015-2019&nbsp;医诺寰球-青岛医诺寰球有限公司&nbsp;&nbsp;版权所有 | 鲁ICP备15022986号-1</div>
      </div>
    </footer>
    </div>
</template>

<script>
  import { WebHeader, WebInfo, NavBar, ScrollHeader } from './components'
  export default {
    name: 'index',
    components: {
      WebHeader,
      WebInfo,
      NavBar,
      ScrollHeader
    },
    data() {
      return {
        searchWord: '医诺寰球是出国看病的领导者，国内专业赴印度治疗丙肝、乙肝的团队。印度丙肝新药',
        img_url_case: 'static/img/info/banner_patientStory.png',
        img_url_drugdb: 'static/img/info/医药数据库banner2.jpg',
        show_words: '',
        scrollNews: []
      }
    }
  }
</script>

<style scoped>
  /*color:#1CACA3*/
  #web-index{position: relative;margin: 0;padding: 0;}
  .fix-header{width: 100%;position: fixed;background: #fff}
  .web-content{position: relative;width: 80%; margin: 0 10%;}
  .web-content1{position: relative;width: initial;}
  .footer{background: #f5f5f5;border-top: 1px solid #eee;width: 80%;height: 100px;padding: 0 10%;text-align: center;font-size: .75rem;color: #545454;text-space: 5px;
   display: flex; flex-flow: row wrap; align-content: center; align-items: center;justify-content: space-around}
  .footer div{line-height: 28px}
</style>
