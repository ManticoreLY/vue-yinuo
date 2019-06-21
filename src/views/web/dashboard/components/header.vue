<template>
  <div>
    <div class="web-title">
      <div class="item1">
        <div class="text-icon">寰球医疗最新动态<i class="arrow-right"></i></div>
      </div>
      <my-canvas class="item2" :words="show_words" :width="500" :font-color="'#ccc'" style="margin-left: 10px"></my-canvas>
      <div class="item3" style="max-width: 50%;min-width: 35%;text-align: right">
        <router-link v-show="$route.fullPath !== '/dashboard'" to="/dashboard" class="item-title"><i class="my-icon-home" style="color: #1daca4;font-size: 1.2rem">&nbsp;医诺寰球首页</i></router-link>
        <!--<el-popover placement="bottom" trigger="hover">
          <website-map/>
          <a slot="reference" class="item-title">网站地图</a>
        </el-popover>-->
        <a class="item-title">医疗客服</a>
        <a class="item-title">海外医疗：400-0000-000</a>
        <a class="item-title" style="border: none">邮箱：xxxx@yinuohuanqiu.com</a>
      </div>
    </div>
    <div class="web-header">
      <div class="web-logo" style="margin-left:5%;width: 15%">
        <router-link :to="{ path: '/dashboard'}">
          <img src="static/img/医诺寰球横版logo.png" style="height: 60%;width: 100%"/>
        </router-link>
      </div>
      <div class="search-frame" style="width: 50%">
        <el-input v-model="searchWord" class="search-bar" placeholder="请输入疾病或药品名,例如乙肝 吉三代">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <el-button slot="append" @click="search">医疗搜索</el-button>
        </el-input>
      </div>
      <div class="code-img" style="width:20%">
        <img src="static/img/微信二维码-扫码咨询.jpg" style="height:80px;height: 80px;">
        <span class="text">扫码咨询</span>
        <img src="static/img/医诺寰球公众号二维码.jpg" style="height:80px;height: 80px;margin-left: 40px;">
        <span class="text">扫码咨询</span>
      </div>
    </div>
    <div class="nav-bar">
      <span style="position:relative" id="hover-icon">
        <i class="el-icon-d-arrow-right"></i>
        &nbsp;&nbsp;&nbsp;&nbsp;常见疾病库&nbsp;&nbsp;&nbsp;&nbsp;
        <div id="hover-panel">
          <hover-bar></hover-bar>
        </div>
      </span>
      <span class="link">
        <router-link :to="{ path: '/drugDB' }">医药数据库</router-link>
      </span>
      <span class="link">
        <router-link :to="{ path: '/cases' }">治疗案例</router-link>
      </span>
      <span class="link">
        <router-link :to="{ path: '/news' }">医疗新闻</router-link>
      </span>
      <span class="link">
        <router-link :to="{ path: '/about' }">关于我们</router-link>
      </span>
    </div>
    <div class="fix-content">
      <el-popover placement="left" trigger="hover" :content="dianhua.content">
          <a slot="reference">
            <img :src="dianhua.img" style="height:38px;height:38px"><br/><b>咨询电话</b>
          </a>
      </el-popover>
      <a><img :src="qq" style="height:38px;height:38px"><br/><b>QQ咨询</b></a>
      <a><img :src="weixin" style="height:38px;height:38px"><br/><b>微信咨询</b></a>
      <a><img :src="weibo" style="height:38px;height:38px"><br/><b>官方微博</b></a>
      <el-popover placement="left" trigger="hover">
        <el-image src="static/img/医诺寰球客服二维码.jpeg" style="width: 180px;height: 180px"></el-image>
        <a slot="reference"><img :src="wxgzh.img" style="height:38px;height:38px"><br/><b>官方微信</b></a>
      </el-popover>
  </div>
  </div>
</template>

<script>
  import home from '@/api/Homepage/home'
  import HoverBar from './HoverBar'
  import MyCanvas from '@/components/MyCanvas'
  // import WebsiteMap from '@/views/web/components/WebsiteMap'
  export default {
    name: 'header',
    components: {
      HoverBar,
      // WebsiteMap,
      MyCanvas
    },
    data() {
      return {
        scrollNews: [],
        show_words: [],
        searchWord: '',
        dianhua: { img: 'static/icon/dianhua.png', content: '全国免费咨询电话: 4006-120-152' },
        qq: 'static/icon/qqicon.png',
        weixin: 'static/icon/微信icon.png',
        wxgzh: { img: 'static/icon/微信公众号icon.png', content: '' },
        weibo: 'static/icon/微博icon.png'
      }
    },
    methods: {
      search() {
        const words = this.searchWord.replace(/\s*/g, '')
        if (words && words.length > 0) {
          this.$router.push({ path: '/search', query: { keywords: words }})
        }
      },
      fillShowWords() {
        if (this.scrollNews) {
          this.show_words = this.scrollNews.map(news => {
            return { id: news.id, title: news.title }
          })
        }
      }
    },
    created() {
      home.headerScrollNews().then(data => {
        this.scrollNews = data.obj
        this.fillShowWords()
      })
    }
  }
</script>

<style scoped>
  .web-title{position: relative;width:90%;padding-left:10%;height: 2.75rem;background: #f5f5f5;border-bottom: 1px solid #eee;display:flex;align-items: center; align-content: center;justify-content: flex-start}
  .web-title .item1, .web-title .item2, .web-title .item3{display: inline-block}
  .web-title .item1 .text-icon{display: inline-block;position:relative;font-size: 1rem;font-weight: 600;color: #efefef;background: #1CACA3;color: #ececec;padding: 4px 12px;border-radius: 3px;}
  .web-title .item1 .text-icon .arrow-right{position:absolute;top:8px;right: -10px;height: 0;width: 0;border-width: 5px;border-style: solid;border-color: transparent transparent transparent #1CACA3}
  .web-title .item3{font-size: 1.125rem;color: #545454;line-height: 1.5rem;line-height: 1.5rem;}
  .web-title .item3 .item-title{display: inline-flex;position:relative;border-right:1px solid #545454;padding: 0 6px;}
  .web-title .item3 .item-title .arrow-down{position:absolute;top: 5px;right: -10px;height: 0;width: 0;border-width: 5px;border-style: solid;border-color: #545454 transparent transparent transparent}

  .web-header{width: 80%;padding: 0 10%;height: 140px;display: flex;flex-flow:row nowrap;justify-content: space-around;align-items: center;align-content: center}
  .web-header>div.code-img{position: relative;height: 80px;display: inline-flex;align-items: center}
  .web-header .search-frame .search-bar{width: 100%;height: 40px;border: 2px solid #1CACA3;border-radius: 4px;}
  .web-header .code-img img, .web-header .code-img span{display: inline-block}
  .web-header .code-img .text{display: inline-flex;height: 80px;width: 2rem;font-size: 1.125rem;color: #ccc;flex-flow: column wrap}
  >>> .el-input-group__append{background: #1daca4;border:none;color:#fff;font-size: 18px;border-radius: 0px;}
  >>> .el-input{border: none}

  .nav-bar{width: 76%;height: 42px;padding: 0 12%;font-size: 1.5rem;border-bottom: 4px solid #1CACA3}
  .nav-bar span{display: inline-block;padding: 10px 2.25rem;}
  .nav-bar span:nth-child(1){display: inline-block;padding: 10px 2.25rem;background: #1CACA3;color: #efefef}
  .nav-bar span.link.is-active a{color: #1daca4}

  .fix-content{position: fixed;right: 2.25rem; top: 16rem;z-index: 20;display: inline-flex;flex-flow: column nowrap;font-size: 10px;}
  .fix-content a{display: inline-block;margin:2px 0;padding: 5px;width:60px;height: 56px;text-align:center;background: #fff;box-shadow: 0 2px 5px 0 #444;z-index: 99}

  #hover-panel{position:absolute;width: 207px;height: 450px;background: #2cbca3;top: 45px;left: 0;z-index: 100;visibility: hidden}
  #hover-icon:hover #hover-panel{visibility: visible}

</style>
