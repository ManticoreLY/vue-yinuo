<template>
    <div style="padding: 20px">
      <div class="section1">
        <span class="title">栏目直达</span>
        <span class="items">
          <a v-for="item in webItems" :key="item.name">{{ item.name }}</a>
        </span>
      </div>
      <div class="section2">
        <span class="title">海外医疗</span>
        <span class="items">
          <a v-for="item in webItems2" :key="item.name">{{ item.name }}</a>
        </span>
      </div>
      <div class="section3">
        <span class="title">医疗新闻</span>
        <span class="items">
          <a v-for="item in webItems3" :key="item.name">{{ item.name }}</a>
        </span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'WebsiteMap',
    data() {
      return {
        webItems: [
          { name: '康安首页', url: '' },
          { name: '医疗保险', url: '' },
          { name: '转阴案例', url: '' },
          { name: '康安学术', url: '' },
          { name: '康安讲坛', url: '' },
          { name: '医疗新闻', url: '' },
          { name: '关于我们', url: '' },
          { name: '康安论坛', url: '' }
        ],
        webItems2: [
          { name: 'PD', url: '' },
          { name: '肺癌', url: '' },
          { name: '靶向药', url: '' },
          { name: '德国医疗', url: '' },
          { name: '智能诊疗', url: '' },
          { name: '试管婴儿', url: '' },
          { name: '赴美生子', url: '' },
          { name: '卵巢调理', url: '' },
          { name: 'HPV疫苗', url: '' },
          { name: '国内转诊', url: '' },
          { name: '美国远程', url: '' },
          { name: 'HIV急救业务', url: '' },
          { name: '肿瘤早早筛', url: '' },
          { name: '二型糖尿病', url: '' },
          { name: '心脏支架/搭桥', url: '' }
        ],
        webItems3: [
          { name: '肿瘤新闻', url: '' },
          { name: '男科新闻', url: '' },
          { name: '周边新闻', url: '' },
          { name: '眼角膜新闻', url: '' },
          { name: '癌症早筛新闻', url: '' },
          { name: '糖尿病新闻', url: '' },
          { name: 'HPV疫苗新闻', url: '' },
          { name: '试管婴儿新闻', url: '' },
          { name: '赴美生子新闻', url: '' },
          { name: '心脏支架新闻', url: '' }
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
.section1{width: 300px;height: 200px;display: inline-block;border-right: 1px solid #eee}
.section1 .title{width: 30%;float:left;font-size: 1.5rem; color: #1daca4;font-weight: 600}
.section1 .items{width: 55%;float:left;padding: 0 5%;display: flex;flex-flow: row wrap;align-items: flex-start;align-content: stretch;justify-content: flex-start}
.section1 .items a{display: inline-block;width: 50%;margin-bottom: 20px;font-size: 1.15rem;}
.section1 .items a:hover{color: #1daca4;text-decoration: underline}
.section2{width: 450px;height: 200px;display: inline-block;border-right: 1px solid #eee;margin-left: 20px}
.section2 .title{width: 25%;float:left;font-size: 1.5rem; color: #ac7b43;font-weight: 600}
.section2 .items{width: 60%;float:left;padding: 0 5%;display: flex;flex-flow: row wrap;align-items: flex-start;align-content: stretch;justify-content: flex-start}
.section2 .items a{display: inline-block;width: 33%;margin-bottom: 20px;font-size: 1.15rem;}
.section2 .items a:hover{color: #AC7B43;text-decoration: underline}
.section3{width: 450px;height: 200px;display: inline-block;margin-left: 20px}
.section3 .title{width: 25%;float:left;font-size: 1.5rem; color: #008aff;font-weight: 600}
.section3 .items{width: 60%;float:left;padding: 0 5%;display: flex;flex-flow: row wrap;align-items: flex-start;align-content: stretch;justify-content: flex-start}
.section3 .items a{display: inline-block;width: 33%;margin-bottom: 20px;font-size: 1.15rem;}
.section3 .items a:hover{color: #008aff;text-decoration: underline}
</style>
