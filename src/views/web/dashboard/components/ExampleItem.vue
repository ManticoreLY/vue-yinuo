<template>
    <div style="margin: 20px 0">
      <div class="web-content">
        <div v-for="item in treatmentCase" :key="item.id" class="example-item">
          <div>
            <router-link :to="`casesInfo/${item.id}`">
              <el-image :src="item.img" style="height: 100%;width: 100%"></el-image>
            </router-link>
          </div>
          <div>
            <div style="font-size: 1.75rem;height:3rem;">
              <router-link :to="`casesInfo/${item.newsArticleId}`">{{ item.title }}</router-link>
            </div>
            <div style="font-size: 1.25rem;color: #7f7f7f;word-wrap: break-word;white-space: pre-wrap">{{item.description}}</div>
          </div>
        </div>
      </div>
      <div style="width: 100%;text-align: center;margin-top: 20px;">
        <el-button style="background-color: #1daca4;color:#efefef" @click="getMore">查看更多</el-button>
      </div>
    </div>
</template>

<script>
    import home from '@/api/Homepage/home'
    export default {
      name: 'ExampleItem',
      data() {
        return {
          treatmentCase: []
        }
      },
      methods: {
        getMore() {
          this.$router.push({ path: '/cases' })
        }
      },
      created() {
        home.treatmentCase().then(data => {
          this.treatmentCase = data.obj
        })
      }
    }
</script>

<style scoped>
  .web-content{width: 100%;height: auto;display: flex;flex-flow:row wrap;justify-content: flex-start; align-items: center; align-content: baseline}
  .web-content .example-item{position:relative;width: 22.5%;margin:0 1% 20px 1%;border: 1px solid #ccc;}
  .web-content .example-item>div:nth-child(1){height: 240px;width: 100%;border-bottom: 4px solid #1daca4;}
  .web-content .example-item>div:nth-child(2){height: 100px;width: 93%;padding: 10px 15px;}
</style>
