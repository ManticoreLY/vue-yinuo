<template>
    <div class="cure-case">
      <div class="nav">当前位置：
        <router-link :to="'/'">医诺寰球海外医疗</router-link>
         >
        <router-link :to="'/'">首页疾病导航</router-link>
         > {{disease.name}}
      </div>
      <div class="content">
        <div class="main">
          <div class="main-title">{{disease.name}}药物</div>
          <div class="main-case" v-if="disease.medicines" v-for="item in disease.medicines" :key="item.id">
            <div class="img">
              <el-image  :src="item.image?item.image.split(',')[0]:img_url" :fit="'contain'"></el-image>
            </div>
            <div class="cont">
              <div class="title">{{item.name}}</div>
              <div class="tags">
                <el-tag size="small" class="style1"><router-link  tag="a" target="_blank" :to="'/medicineInfo/'+item.id" >{{disease.name}}</router-link></el-tag>
                <p style="display: flex;flex-flow: row wrap;align-items: center;justify-content: space-between">
                  <span size="small" class="style2">药品规格: {{item.spec}}</span>
                  <span size="small" class="style2">药品俗名: {{item.unit}}</span>
                  <span size="small" class="style2">药品用量: {{item.form}}</span>
                  <span size="small" class="style2">药品厂家: {{item.make}}</span>
                </p>
                <!--<el-tag size="small" class="style3">低血糖发生率低</el-tag>-->
              </div>
<!--              <div class="info"><span style="font-weight: 600">药品规格: </span>{{item.spec}}</div>-->
              <div class="info"><span style="font-weight: 600">药品简介: </span>{{removeTag(item.introduct).substring(0, 50)}}<router-link  tag="a" target="_blank" :to="'/medicineInfo/'+item.id" style="color:#008aff">...【详情】</router-link></div>
<!--              <div class="info"><span style="font-weight: 600">药品剂型: </span>{{item.form}}</div>-->
<!--              <div class="info"><span style="font-weight: 600">药品单位: </span>{{item.unit}}</div>-->
<!--              <div class="info"><span style="font-weight: 600">厂家: </span>{{item.make}}</div>-->
<!--              <div class="info" style="font-weight: 600">更多信息请见详细介绍，或咨询医诺寰球微信客服：DrYiNuoInternational</div>-->
            </div>
          </div>
        </div>
        <div class="right">
          <!--<div class="words">
            <div class="word-name">相关链接</div>
            <div class="word-icon">
              <el-button size="small" v-for="word in link_words" :key="word.id" @click="toMedicinePage(word.id)" style="margin: 5px;padding: 5px 10px; border-radius: 15px">{{word.shotName}}</el-button>
            </div>
          </div>-->
          <div class="words">
            <div class="word-name">相关文章</div>
            <div class="word-title" v-for="(word, index) in link_articles" :key="index" v-if="index < 8" style="margin: 5px; padding: 5px">
              <p><router-link tag="a" target="_blank" :to="'/articleInfo/'+word.id"  >{{word.title}}</router-link></p>
              <p style="width: 100%;text-align: right">{{word.updatedDt}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import DiseaseApi from '@/api/diseaseFront'
  export default {
    name: 'index',
    data() {
      return {
        disease: {
          medicines: []
        },
        img_url: 'static/img/info/banner_patientStory.png'
      }
    },
    computed: {
      link_words() {
        var result = []
        this.disease.medicines.forEach(one => {
          if (one.reMedicines) {
            result = result.concat(one.reMedicines)
          }
        })
        return result
      },
      link_articles() {
        var result = []
        this.disease.medicines.forEach(one => {
          if (one.newsArticles) {
            result = result.concat(one.newsArticles)
          }
        })
        return result
      }
    },
    created() {
      this.search()
    },
    methods: {
      search() {
        DiseaseApi.getFullDisease(this.$route.params.id).then(data => {
          this.disease = Object.assign(this.disease, data.obj)
          if (this.disease.parentId === 0) {
            this.disease.isChildren = '0'
          } else {
            this.disease.isChildren = '1'
          }
        })
        // this.disease = Object.assign(this.disease, entity)
      },
      removeTag(text) {
        return text.replace(/<\/?.+?\/?>/g, '')
      },
      toMedicinePage(id) {
        const routeData = this.$router.resolve({ path: '/medicineInfo/' + id })
        window.open(routeData.href, '_blank')
      }
    }
  }
</script>

<style scoped>
  .cure-case{width: 100%;background: #fff}
  .bg{width: 100%}
  .nav{width: 100%;padding: 10px 0;height: 2rem;line-height: 2rem;font-size: 1.25rem;color: #5a5a5a}
  .content{position: relative;width: 100%;display: flex; flex-flow: row wrap; align-items: flex-start;align-content: stretch;justify-content: space-between}
  .content .main{width: 73%;padding: 10px;min-height: 500px;border: 1px solid #eee;}
  .content .main .main-title{width: 90%;height: 4rem;line-height: 4rem;padding: 5px 5%;border-bottom: 1px solid #eee;font-size: 1.5rem;font-weight: 600}
  .content .main .main-case{width: initial;padding:10px;border-bottom: 1px dotted #eee;min-height: 150px;
    display: inline-flex;flex-flow: row nowrap; align-items: flex-start;align-content: stretch;justify-content: space-between}
  .content .main .main-case .img{width: 35%;}
  .content .main .main-case .cont{width: 55%;}
  .content .main .main-case .cont .title{position: relative;height: 4rem;line-height: 4rem;font-size: 2.25rem;}
  .content .main .main-case .cont .tags .style1{margin: 10px;color: #008aff;border: 1px solid #008aff;border-radius: 12px}
  .content .main .main-case .cont .tags .style2{display:inline-block;width: 42%;margin: 10px;text-align: center;background: #1daca4;padding:7px 0;color: #fff;border: 1px solid #1daca4;border-radius: 4px}
  .content .main .main-case .cont .tags .style3{margin: 5px;color: #D33146;border: 1px solid #D33146;border-radius: 12px}
  .content .main .main-case .cont .info{position: relative;margin-top: 20px; font-size: 1.25rem;color: #5a5a5a;}
  .content .right{width: 20%}
  .content .right .words{min-height: 200px;border: 1px solid #eee;margin-bottom: 20px;padding:15px;}
  .content .right .words>div.word-name{width:initial;border-bottom: 1px solid #eee;height: 4rem;line-height: 4rem;font-size: 1.5rem;font-weight: 600}
  .content .right .words>div.word-icon{width:initial;border-bottom: 1px solid #eee;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;}
  .content .right .words>div.word-title{width:initial;border-bottom: 1px solid #eee;font-size: 1.25rem;color: #5a5a5a;}
</style>
