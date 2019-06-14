<template>
  <div class="page">
    <div class="nav">当前位置：
      <router-link :to="'/'">医诺寰球海外医疗</router-link>
      >
      <router-link :to="'/news'">医疗新闻</router-link>
      >
    </div>
    <div class="content">
      <div class="main" style="border:none">
        <div class="main-item" v-for="(item, index) in tableList" :key="index">
          <div class="img">
            <el-image :src="item.abstractImg" :fit="fit" style="width: 200px"></el-image>
          </div>
          <div class="cont">
            <div class="title">
              <router-link tag="a" target="_blank" :to="'/articleInfo/'+item.id"  >{{ item.title }}</router-link>
            </div>
            <div class="info">{{ item.abstractText }}
              <router-link tag="a" target="_blank" :to="'/articleInfo/'+item.id"  ><span style="color:red;font-size: initial">【详情】</span></router-link>
            </div>
            <div class="foot">
              作者：{{item.author}}&nbsp;&nbsp;&nbsp;&nbsp;
              时间：{{item.updatedDt}}
              <span style="display: inline-block;float: right">阅读量：{{item.readCount}}</span>
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            small
            prev-text="上一页"
            next-text="下一页"
            :page-size="page.size"
            :current-page="page.current"
            :total="page.total"
            layout="prev, pager, next"
            @current-change="handlePageChange"
            @size-change="handleSizeChange">
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <div class="words">
          <div class="word-name">频道栏目</div>
          <div class="word-items">
            <el-button v-for="i in items" :key="i" size="mini" border style="border: 1px solid #008aff;padding: 5px 10px;color: #008aff;margin: 5px;font-size: 1.5rem">{{i}}</el-button>
          </div>
        </div>
        <div class="words">
          <div class="word-name">最新文章</div>
          <div class="word-title" v-for="(article,index) in articleInfo.newArticles" :key="index"><router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id"  style="color: #005cff">{{article.title}}</router-link></div>
        </div>
        <div class="words">
          <div class="word-name">本周热门文章</div>
          <div class="word-title" v-for="(article,index) in articleInfo.hotArticles" :key="index"><router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id"  style="color: #005cff">{{article.title}}</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import page from '@/utils/page'
  import ArticlesApi from '@/api/articlesFront'
  // import ChannelApi from '@/api/channel'

  export default {
    name: 'index',
    data() {
      return {
        articleInfo: {},
        query: {
          pageObj: {
            current: 1,
            size: 10
          },
          likeCondition: {
            name: ''
          }
        },
        page: {},
        name: '',
        tableList: [],
        formTitle: '',
        editFormVisible: false
      }
    },
    created() {
      this.search()
    },
    methods: {
      ...page(),
      search() {
        ArticlesApi.queryPage(this.query).then(data => {
          this.page = Object.assign(this.page, data.obj)
          this.tableList = data.obj.records
        }).catch(err => {
          console.log(err)
        })
        debugger
        ArticlesApi.findFrontInfo(0).then(data => {
          this.articleInfo = data.obj
        })
      }
    }
  }
</script>

<style scoped>
.content .main .main-item .cont{position: relative;height: 100%}
.content .main .main-item .cont .title{position: relative;height: 4rem;padding:0 10px;line-height: 4rem;font-size: 1.5rem;font-weight: 600;}
.content .main .main-item .cont .info{position: relative;padding:0 10px;margin-top: 20px; font-size: 1.25rem;color: #5a5a5a;text-indent: 3rem;}
.content .main .main-item .cont .foot{position:relative;width:100%;margin-top:20px;height: 1rem;line-height: 1rem;padding: 0 10px;bottom: 0; left: 0;right: 0;font-size: 1rem;color: #686868;}
.content .right .words{position:relative;height: 100%}
.content .right .words .word-name{padding-bottom: 1rem;font-size: 1.75rem;border-bottom: 1px solid #eee;}
.content .right .words .word-title{width:initial;border-bottom: 1px solid #eee;height: 3rem;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;
  white-space: nowrap;overflow: hidden;text-overflow: ellipsis}
.content .right .words .word-items{padding: 20px 0;display: flex;flex-flow: row wrap;}
</style>
