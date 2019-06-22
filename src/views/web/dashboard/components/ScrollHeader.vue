<template>
    <div id="scroll-header">
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
          <a class="item-title">海外医疗：{{homeFooterFixedInfo.freeHotLine}}</a>
          <a class="item-title" style="border: none">邮箱：{{homeFooterFixedInfo.email}}</a>
        </div>
      </div>
      <div class="nav-bar">
        <div class="nav">
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
        <div class="search-frame" style="width: 30%">
        <el-input v-model="searchWord" class="search-bar" placeholder="请输入疾病或药品名,例如乙肝 吉三代">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <el-button slot="append" @click="search">医疗搜索</el-button>
        </el-input>
      </div>
      </div>
    </div>
</template>

<script>
  import home from '@/api/Homepage/home'
  import HoverBar from './HoverBar'
  import MyCanvas from '@/components/MyCanvas'
  export default {
    name: 'ScrollHeader',
    components: {
      HoverBar,
      MyCanvas
    },
    data() {
      return {
        searchWord: '',
        scrollNews: [],
        show_words: [],
        footerVo: {},
        homeFooterFixedInfo: {}
      }
    },
    created() {
      home.headerScrollNews().then(data => {
        this.scrollNews = data.obj
        this.fillShowWords()
      })
      home.footer().then(data => {
        this.footerVo = data.obj
        this.homeFooterFixedInfo = this.footerVo.homeFooterFixedInfo
      })
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
    }
  }
</script>

<style scoped>
  #scroll-header{width: 100%;height: 100px;position: fixed;top: 0;left: 0;right: 0;z-index: 199;border: 1px solid #eee;box-shadow: 0 1px 1px #eee;visibility: hidden;transition: visibility .2s}
  .web-title{position: relative;width:90%;padding-left:10%;height: 32px;background: #f5f5f5;border-bottom: 1px solid #eee;display:flex;align-items: center; align-content: center;justify-content: flex-start}
  .web-title .item1, .web-title .item2, .web-title .item3{display: inline-block}
  .web-title .item1 .text-icon{display: inline-block;position:relative;font-size: 1rem;font-weight: 600;color: #efefef;background: #1CACA3;color: #ececec;padding: 4px 12px;border-radius: 3px;}
  .web-title .item1 .text-icon .arrow-right{position:absolute;top:8px;right: -10px;height: 0;width: 0;border-width: 5px;border-style: solid;border-color: transparent transparent transparent #1CACA3}
  .web-title .item3{font-size: 1.125rem;color: #545454;line-height: 1.5rem;line-height: 1.5rem;}
  .web-title .item3 .item-title{display: inline-flex;position:relative;border-right:1px solid #545454;padding: 0 6px;}
  .web-title .item3 .item-title .arrow-down{position:absolute;top: 5px;right: -10px;height: 0;width: 0;border-width: 5px;border-style: solid;border-color: #545454 transparent transparent transparent}

  .nav-bar{width: 76%;height: 68px;padding: 0 12%;font-size: 1.5rem;display: inline-flex;align-items: center; justify-content: space-between}
  .nav-bar .nav{height: 67px;display: inline-flex;align-items: flex-end;justify-content: flex-start}
  .nav-bar span{display: inline-block;padding: 10px 2.25rem;}
  .nav-bar span:nth-child(1){display: inline-block;padding: 10px 2.25rem;background: #1CACA3;color: #efefef}
  .nav-bar span.link.is-active a{color: #1daca4}

  #hover-panel{position:absolute;width: 207px;height: 450px;background: #2cbca3;top: 40px;left: 0;z-index: 100;visibility: hidden}
  #hover-icon:hover #hover-panel{visibility: visible}

  .search-frame .search-bar{width: 100%;height: 36px;border: 2px solid #1CACA3;border-radius: 4px;}
  >>> .el-input-group__append{background: #1daca4;border:none;color:#fff;font-size: 15px;border-radius: 0px;}
  >>> .el-input{border: none}

</style>
