<template>
    <div class="page">
      <the-header @searchWord="getSearchWord" class="head"/>
      <div style="margin-top: 190px;">
        <div class="search-title">搜索<em style="font-style: normal;color: red"> {{ searchWord }} </em>的结果</div>
        <div style="width: 100%;display: flex;align-items: flex-start;align-content: stretch;">
          <div class="main">
            <router-view/>
          </div>
          <div class="sider">
            <div style="width: 100%;padding: 20px;float:left">
              <p style="font-size: 1.5rem;font-weight: 600;">搜索热点</p>
              <div class="el-icon-arrow-right" style="font-size: 1.3rem; line-height: 2rem;">
                <span v-for="word in searchWords" :key="word.id" style="display: inline-block;margin-right: 20px;color: #008aff">
                  <router-link tag="a"  target="_blank" :to = "{ path: 'search', query: { keywords: word.name }}">{{word.name}}</router-link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">Copyright &copy; 2015-2019 医诺 - 青岛医诺寰球海外医疗服务有限公司 版权所有</div>
    </div>
</template>

<script>
  import TheHeader from './components/TheHeader'
  import searchWordApi from '@/api/searchWordFront'
  export default {
    name: 'index',
    components: {
      TheHeader
    },
    data() {
      return {
        query: {
          pageObj: {
            current: 1,
            size: 20
          },
          likeCondition: {
            name: ''
          },
          andCondition: {
            common: true
          },
          orderByConditionStr: {
            idx: 'asc'
          }
        },
        searchWord: '',
        searchWords: []
      }
    },
    created() {
      this.initSearchWords()
    },
    methods: {
      getSearchWord(searchWord) {
        this.searchWord = searchWord
      },
      initSearchWords() {
        searchWordApi.queryPage(this.query).then(data => {
          this.searchWords = data.obj.records
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
.page{position:relative;width: 100%;height: 100%}
.head{position:fixed; top:0;left: 0;right: 0;z-index: 99;height: 190px;}
.search-title{width: 76%;padding: 0 12%;height: 3rem;border: 1px solid #eee; background: #f5f5f5;border-left: none;border-right: none;font-size: 1.5rem; line-height: 3rem}
.main{position:relative;display: inline-block;width: 58%;padding:20px 30px 0 10%;border-right: 1px solid #eee;margin-bottom: 4rem;}
.sider{margin: 0;position: relative;display: inline-block;width: 18%;padding: 20px 10% 0 0;}
.footer{width: 100%;height: 4rem;line-height: 4rem;text-align: center;position:absolute;left: 0;bottom: 0;right: 0;z-index: 99;border-top: 1px solid #eee}
</style>
