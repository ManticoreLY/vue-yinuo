<template>
    <div class="word">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="相关推荐" name="related">
          <div class="content">
            <div v-for="i in 4" :key="i" class="item">
              <el-image :src="relArticles[i-1][0]?relArticles[i-1][0].abstractImg:''" :fit="'fit'" style="width: 200px; height: 120px;margin-right: 10px;"></el-image>
              <ul class="item-cont">
                <li v-for="t in relArticles[i-1]" :key="t.id" class="title ellipsis"><router-link tag="a" target="_blank" :to="'/articleInfo/'+t.id"  >{{t.title}}</router-link></li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其它推荐" name="other">
          <div class="content">
            <div v-for="i in 4" :key="i" class="item">
              <el-image :src="otherArticles[i-1][0]?otherArticles[i-1][0].abstractImg:''" :fit="'fit'" style="width: 200px; height: 120px;margin-right: 10px;"></el-image>
              <ul class="item-cont">
                <li v-for="t in otherArticles[i-1]" :key="t.id" class="title ellipsis"><router-link tag="a" target="_blank" :to="'/articleInfo/'+t.id"  >{{t.title}}</router-link></li>
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
    props: {
      articleInfo: {
        default: function() { return {} },
        type: Object
      }
    },
    computed: {
      relArticles() {
        const result = [[], [], [], []]
        if (this.articleInfo.relArticles) {
          for (let i = 0, len = this.articleInfo.relArticles.length; i < 4; i += 1) {
            var per = Math.floor(len / 4)
            if (i === 0) {
              result[0] = this.articleInfo.relArticles.slice(i * per, len / 4 + len % 4)
            } else if (len >= 4) {
              result[i] = this.articleInfo.relArticles.slice(i * per + len % 4, (i + 1) * per + len % 4)
            }
          }
        }
        return result
      },
      otherArticles() {
        const result = [[], [], [], []]
        if (this.articleInfo.otherArticles) {
          for (let i = 0, len = this.articleInfo.otherArticles.length; i < 4; i += 1) {
            var per = Math.floor(len / 4)
            if (i === 0) {
              result[0] = this.articleInfo.otherArticles.slice(i * per, len / 4 + len % 4)
            } else if (len >= 4) {
              result[i] = this.articleInfo.otherArticles.slice(i * per + len % 4, (i + 1) * per + len % 4)
            }
          }
        }
        return result
      }
    },
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
