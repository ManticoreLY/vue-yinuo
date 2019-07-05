<template>
  <div class="page">
    <div class="nav">当前位置：
      <router-link :to="'/'">医诺寰球海外医疗</router-link>
      >
      <router-link :to="'/cases'">治疗案例</router-link>
      >
      <span v-if="channel">
      <router-link :to="'/caseInfo'">{{channel.name}}</router-link>
      >
      </span>
    </div>
    <div class="content">
      <div class="main" style="border:none">
        <div class="main-item" v-for="(item, index) in tableList" :key="index">
          <div class="img">
            <el-image :src="item.abstractImg" :fit="'fit'" style="width: 200px;height: 180px;"></el-image>
          </div>
          <div class="cont">
            <div class="title">
              <span style="width: 65%;"><router-link tag="a" target="_blank" :to="'/casesInfo/'+item.id"  >{{ titleFormat(item.title) }}</router-link></span>
              <span style="width: 30%;font-size: 1.25rem;color: #008aff;text-align: right;float: right">更新时间：{{ item.updatedDt ? item.updatedDt.substring(0, 10) : ' ' }}</span>
            </div>
            <div class="info">{{ item.abstractText }}
              <router-link tag="a" target="_blank" :to="'/casesInfo/'+item.id"  ><span style="color:red;font-size: initial">【详情】</span></router-link>
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
        <!--案例频道-->
        <channel :name="'案例频道'" :type="1"></channel>
        <!--最新文章-->
        <latest-articles :name="'最新案例'" :type = 1 />
        <!--本周热门文章-->
        <hot-articles :name="'精选案例回顾'" :type = 1 />
      </div>
    </div>
  </div>
</template>

<script>
  import page from '@/utils/page'
  import ArticlesApi from '@/api/articlesFront'
  import ChannelApi from '@/api/channelFront'
  import Channel from '../components/Channel'
  import HotArticles from '../components/HotArticles'
  import LatestArticles from '../components/LatestArticles'
  export default {
    name: 'index',
    components: {
      HotArticles,
      Channel,
      LatestArticles
    },
    data() {
      return {
        img_url: '',
        channel: {},
        channels: [],
        casesInfo: {},
        query: {
          pageObj: {
            current: 1,
            size: 10
          },
          likeCondition: {
            name: ''
          },
          andCondition: {
            type: 1
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
        if (this.$route.params.id) {
          const channelId = this.$route.params.id
          this.query.andCondition = { 'channelId': channelId, 'type': 1 }
          ChannelApi.findFrontOne(channelId).then(data => {
            this.channel = data.obj
          })
        }
        ArticlesApi.queryPage(this.query).then(data => {
          this.page = Object.assign(this.page, data.obj)
          this.tableList = data.obj.records
        }).catch(err => {
          console.log(err)
        })
        ArticlesApi.findFrontInfo(0).then(data => {
          this.casesInfo = data.obj
        })
      },
      titleFormat(title) {
        if (!title && title.length > 10) {
          return title.substring(0, 10) + '...'
        } else {
          return title
        }
      }
    }
  }
</script>

<style scoped>
.content .main .main-item .img{margin-right: 15px;}
.content .main .main-item .cont{position: relative;height: 100%;width: 100%}
.content .main .main-item .cont .title{position: relative;min-height: 4rem;padding:0 10px;line-height: 2rem;font-size: 1.5rem;}
.content .main .main-item .cont .title span{display: inline-block;}
.content .main .main-item .cont .info{position: relative;margin-top: 20px; font-size: 1.25rem;color: #5a5a5a;text-indent: 2rem;}
</style>
