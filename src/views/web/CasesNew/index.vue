<template>
  <div class="page">
    <div class="bg">
      <el-image :src="img_url" :fit="'fill'"></el-image>
    </div>
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
              <router-link tag="a" target="_blank" :to="'/casesInfo/'+item.id"  >{{ titleFormat(item.title) }}</router-link>
              <span>更新时间：{{ item.updatedDt }}</span>
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
        <!--最新文章-->
        <disease-case/>
        <!--本周热门文章-->
        <hot-articles :name="'精选案例回顾'"/>
      </div>
    </div>
  </div>
</template>

<script>
  import page from '@/utils/page'
  import ArticlesApi from '@/api/articlesFront'
  import ChannelApi from '@/api/channelFront'
  import HotArticles from '../components/HotArticles'
  import DiseaseCase from '../components/DiseaseCase'
  export default {
    name: 'index',
    components: {
      HotArticles,
      DiseaseCase
    },
    data() {
      return {
        img_url: 'static/img/info/banner_patientStory.png',
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
.content .main .main-item .cont .title{position: relative;height: 4rem;padding:0 10px;line-height: 4rem;font-size: 1.75rem;}
.content .main .main-item .cont .title span{font-size: 1.25rem;color: #5a5a5a;display: block;float:right;margin-right: 15px;}
.content .main .main-item .cont .info{position: relative;margin-top: 20px; font-size: 1.25rem;color: #5a5a5a;text-indent: 2rem;}
</style>
