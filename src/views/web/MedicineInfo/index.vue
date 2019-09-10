<template>
    <div id="medicine-info">
      <div class="description">
        <div class="item" style="width: 36%">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in medicine.imageList" :key="item">
              <img :src="item" style="width: 100%;height: 100%">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="item" style="position: relative;width: 50%">
          <div class="item-name">{{medicine.name}}({{medicine.shotName}})</div>
          <div class="item-unit">
            <p class="shallowblue">品牌: {{medicine.make}}</p>
            <p class="green">用量: {{medicine.form}}</p>
            <p class="graygreen">俗名: {{medicine.unit}}</p>
            <p class="yellow">规格: {{medicine.spec}}</p>
          </div>
          <div class="item-info">{{medicine.shotIntroduct}}</div>
          <div class="item-bottom"><b style="color: #29a466">注:</b>本网站关于药品使用的建议仅供参考,不能替代医属</div>
        </div>
      </div>
      <div class="information">
        <div class="item">
          <div class="info-title">
            <el-divider content-position="center"><b class="text">{{medicine.introductTitle}}</b></el-divider>
          </div>
          <div v-html="medicine.introduct"></div>
        </div>
        <div class="item">
          <div class="info-title">
            <el-divider content-position="center"><b class="text">{{medicine.sideEffectTitle}}</b></el-divider>
          </div>
          <div v-html="medicine.sideEffect"></div>
        </div>
        <div class="item">
          <div class="info-title">
            <el-divider content-position="center"><b class="text">{{medicine.resistantTitle}}</b></el-divider>
          </div>
          <div v-html="medicine.resistant"></div>
        </div>
      </div>
      <div class="information">
        <div class="item">
          <div class="info-title">
            <el-divider content-position="center"><b class="text" style="font-size: 1.8rem">相关药品</b></el-divider>
          </div>
          <div class="info-items">
            <el-button v-for="item in medicine.reMedicines" :key="item.id" round><router-link tag="a" target="_blank" :to="'/medicineInfo/'+item.id" >{{ item.shotName }}</router-link></el-button>
          </div>
          <div class="info-title">
            <el-divider content-position="center"><b class="text" style="font-size: 1.8rem">常见问题</b></el-divider>
          </div>
          <div class="info-display">
            <div style="width: 20%">
              <el-image :src="img_url" :fit="'fit'" width="30rem" height="20rem"></el-image>
            </div>
            <div style="width: 75%">
              <p v-for="article in medicine.newsArticles" :key="article.id">
                <router-link tag="a" target="_blank" :to="'/articleInfo/'+article.id" >{{article.title}}</router-link>
              </p>
            </div>
          </div>
        </div>
        <div class="footer">注：【医诺寰球海外医疗】为您提供印度特罗凯官方正品保障，特罗凯价格、说明书查询请认准医诺寰球官方网站</div>
      </div>
    </div>
</template>

<script>
  import medicineApi from '@/api/medicine/medicineFront'
  export default {
    name: 'index',
    data() {
      return {
        medicine: {
          image: '',
          imageList: [],
          shotName: '',
          foreignName: '',
          spec: '',
          unit: '',
          introduct: '',
          sideEffect: '',
          resistant: '',
          reMedicineIds: []
        },
        img_url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      }
    },
    created() {
      this.initData()
    }, methods: {
      initData() {
        medicineApi.findFrontOne(this.$route.params.id).then(data => {
          this.medicine = data.obj
          this.medicine.imageList = this.medicine.image.split(',')
        })
      }
    }
  }
</script>

<style scoped>
#medicine-info{position: relative;}
.shallowblue{background:#2b96cc;color: #fff}
.green{background: #29a466;color: #fff}
.graygreen{background: #1daca4;color: #fff}
.yellow{background: #f0a226;color: #fff}
.description{width: 90%;background: #fff;padding: 10px 5%;display:flex;align-items: center;align-content: stretch;justify-content: space-around}
.description .item .item-name{font-size: 2.75rem;font-weight: 600}
.description .item .item-extra{font-size: 1.2rem;}
.description .item .item-unit{height: 10rem;display: flex;flex-flow: row wrap;align-items: center;align-content: center;}
.description .item .item-unit p{width: 43%;height: 32px;line-height: 32px;font-size: 1.1rem;padding-left: 5px;margin: 10px 30px 10px 0px;}
.description .item .item-info{height: 12rem;font-size: 1.25rem;}
.description .item .item-bottom{font-size: 1.1rem}
.information{width: 90%;margin:20px 0;background: #fff;padding:0 5%}
.information .item{margin:2rem;}
.information .item .info-title .text{color: #29a466;font-size: 2rem;font-weight: 700}
.information .item .info-question{height: 3rem;line-height: 3rem;font-size: 1.75rem;font-weight: 800}
.information .item .info-answer{line-height: 1.75rem;font-size: 1.2rem;font-weight: 800}
.el-button.is-round{padding: 8px 15px;border: 1px solid #2b96cc;margin: 10px 5px;color: #2b96cc}
.el-button.is-round:hover{padding: 8px 15px;border: 1px solid #29a466;margin: 10px 5px;color: #fff;background: #29a466}
.information .item .info-display{display:inline-flex;flex-flow: row nowrap;align-items: center;align-content: stretch;justify-content: space-between}
.information .item .info-display>div:nth-child(2){display:flex;flex-flow: row wrap;align-items: flex-start;align-content: stretch;justify-content: space-between}
.information .item .info-display>div:nth-child(2) p{width: 45%;font-size: 1.2rem;white-space: nowrap;text-overflow: ellipsis;overflow: hidden}
.footer{color: #ccc;}
</style>
