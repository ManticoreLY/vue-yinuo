<template>
  <div class="many-logo">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="战略合作伙伴" name="first">
        <div v-for="item in friendLinkVo.strategyCompanies" :key="item.id" class="logo-pane">
          <img :src="item.img" :key="item.id" height="50">
        </div>
      </el-tab-pane>
      <el-tab-pane label="媒体合作" name="second">
        <div v-for="item in friendLinkVo.mediaCompanies" :key="item.id" class="logo-pane">
          <img :src="item.img" :key="item.id"  height="50">
        </div>
      </el-tab-pane>
      <el-tab-pane label="链接聚合" name="third">
        <div v-for="item in friendLinkVo.linksAggregations" :key="item.linkUrl" class="logo-pane link">
          <a :href="item.linkUrl" :title="item.linkUrl" target="_blank">{{item.linkName}}</a>
        </div>
      </el-tab-pane>
      <el-tab-pane label="友情链接" name="fourth">
        <div v-for="item in friendLinkVo.friendLinks" :key="item.linkUrl" class="logo-pane link">
          <a :href="item.linkUrl" :title="item.linkUrl" target="_blank">{{item.linkName}}</a>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import home from '@/api/Homepage/home'
  export default {
    name: 'LogoDisplay',
    data() {
      return {
        activeName: 'first',
        friendLinkVo: {},
        logo_images: [
          '中国新闻网.jpg', '中国江苏网.jpg', '中国青年报.jpg', '今日头条.jpg', '凤凰.png', '参考消息.jpg',
          '山东大学报.jpg', '搜狐.jpg', '腾讯.png', '新浪.png', '环球.png', '网易.png', '界面.png', '搜狗搜索.png', '百度.png'
        ],
        logo_medias: [
          '新浪.png', '环球.png', '网易.png', '界面.png', '搜狗搜索.png', '百度.png', '第一财经.jpg', '腾讯.png'
        ],
        logo_links: [
          '1-1F32G43H1W4.jpg', '1-1F32G43JX63.jpg', '1-1F32G4353V35.jpg', '1-1F32G4401KK.jpg', '1-1F32G4403X93.jpg',
          '1-1F32G4403X93.jpg', '1-1F32G44102J5.jpg', '1-1F32G441441D.jpg', '1-1F32G43601919.jpg', '1-1F32G43621543.jpg', '1-1F32G43642612.jpg'
        ],
        logo_friends: [
          '1-1F32G43916126.jpg', '1-1F32G43935624.jpg', '1-1F32G44001295.jpg', '1-1F32G44126227.jpg', '1-1F32G44216226.jpg',
          '1-1F32G44216226.jpg', '1-1P1030915140-L.png', '1-1P1152206190-L.png'
        ]
      }
    },
    created() {
      home.friendLinks().then(data => {
        this.friendLinkVo = data.obj
      })
    }
  }
</script>

<style scoped>
  .many-logo{width: 100%; min-height: 360px; margin: 20px 0;}
  .many-logo .logo-pane{position: relative;width: 20%;display: inline-flex;flew-flow: row wrap;align-items: center;align-content: stretch;justify-content: space-between}
  .many-logo .logo-pane img{margin: 25px}
  .many-logo .link{}
  .many-logo .link a{margin: 10px;font-size: 1.5rem;color: #555}
  .many-logo .link a:hover{font-size: 1.5rem;color: #005cff;text-decoration: underline}
  >>> .el-tabs__content{width: 94%;margin: 0 auto}
  >>> .el-tabs__item{font-weight: 600}
  /*>>> .el-tabs__item.is-active, >>> .el-tabs__item:hover{color: #1daca4}*/
</style>
