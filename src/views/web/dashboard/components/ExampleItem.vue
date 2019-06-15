<template>
    <div style="margin: 20px 0">
      <div class="web-content">
        <div v-for="item in treatmentCase" :key="item" class="example-item">
          <div>
            <el-image :src="item.img" style="height: 100%;width: 100%"></el-image>
          </div>
          <div>
            <div style="font-size: 1.75rem;height:3rem;">{{item.title}}</div>
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
  .web-content{width: 100%;height: auto;display: flex;flex-flow:row wrap;justify-content: space-around}
  .web-content .example-item{position:relative;width: 22%;margin-bottom: 20px;border: 1px solid #ccc;}
  .web-content .example-item>div:nth-child(1){height: 300px;width: 100%;border-bottom: 4px solid #1daca4;}
  .web-content .example-item>div:nth-child(2){height: 120px;width: 93%;padding: 10px 15px;}
</style>
