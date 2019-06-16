<template>
    <div class="word">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="相关推荐" name="related">
          <div class="content">
            <div v-for="i in 4" :key="i" class="item">
              <el-image src="" :fit="'fit'" style="width: 200px; height: 120px;margin-right: 10px;"></el-image>
              <ul class="item-cont">
                <li v-for="t in titles" :key="t" class="title ellipsis">{{t}}</li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其它推荐" name="other">
          <div class="content">
            <div v-for="i in 4" :key="i" class="item">
              <el-image src="" :fit="'fit'" style="width: 200px; height: 120px;margin-right: 10px;"></el-image>
              <ul class="item-cont">
                <li v-for="t in titles" :key="t" class="title ellipsis">{{t}}</li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  export default {
    name: 'RelatedRecommand',
    data() {
      return {
        activeName: 'related',
        titles: [
          'aaaaaaaaaaaaaaaaaaa', '你和我我和你,你和他,他和我', '北京欢迎你', '夏天就要到了', '还有人地楞兴呆料'
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
.word{position: relative;margin: 15px}
.content{position: relative;padding: 2px; width: 96%;display: flex; flex-flow: row wrap; align-items: flex-start; align-content: stretch; justify-content: space-between}
.item{position: relative;width: 46%;margin: 5px; display: inline-flex; align-items: flex-start; align-content:flex-start}
.item .item-cont{width: 60%;margin:0 0 0 -30px}
.item .item-cont .title{font-size: 1.25rem; color: #a1a1a1;}

  >>>.el-tabs__header{margin: 0}
>>>.el-tabs__item:hover,>>>.el-tabs__item.is-active{color: #1daca4}
  >>>.el-tabs__content{border: 1px solid #eee;border-top: none}
</style>
