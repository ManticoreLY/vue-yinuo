<template>
    <div class="cure-case">
      <div class="nav">当前位置：
        <router-link :to="'/'">医诺寰宇海外医疗</router-link>
         >
        <router-link :to="'/'">首页疾病导航</router-link>
         > 二型糖尿病
      </div>
      <div class="content">
        <div class="main">
          <div class="main-title">二型糖尿病药物</div>
          <div class="main-case" v-for="item in items_info" :key="item">
            <div class="img">
              <el-image :src="item.img" :fit="'contain'"></el-image>
            </div>
            <div class="cont">
              <div class="title">{{item.name}}</div>
              <div class="tags">
                <el-tag size="small" class="style1">二型糖尿病</el-tag>
                <el-tag size="small" class="style2">一周一次口服</el-tag>
                <el-tag size="small" class="style3">低血糖发生率低</el-tag>
              </div>
              <div class="info"><span style="font-weight: 600">药品特性: </span>{{item.spec}}</div>
              <div class="info"><span style="font-weight: 600">药品简介: </span>{{item.intro}}<a style="color:#008aff">...【详情】</a></div>
              <div class="info" style="font-weight: 600">更多信息请见详细介绍，或咨询康安途医学顾问：4006120152。</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="words">
            <div class="word-name">相关链接</div>
            <div class="word-icon">
              <el-button size="small" v-for="word in link_words" :key="word" style="margin: 5px;padding: 5px 10px; border-radius: 15px">{{word}}</el-button>
            </div>
          </div>
          <div class="words">
            <div class="word-name">相关文章</div>
            <div  class="word-title" v-for="word in link_articles" :key="word.id" style="margin: 5px; padding: 5px">
              <p>{{word.title}}</p>
              <p style="width: 100%;text-align: right">{{word.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        img_url: 'static/img/info/banner_patientStory.png',
        items_info: [
          { img: 'https://www.kangantu.com/uploads/180322/1-1P3221559235T.jpg',
            intro: '适用于2型糖尿病患者，当一线使用二甲双胍治疗未达到预期的血糖控制目标时',
            name: '曲格列汀/trelagliptin/Zafatek',
            spec: '曲格列汀(trelagliptin)是目前全球首个一周一次口服给药的 DPP-4 抑制剂，最大优势是一周给药一次，且无严重不良反应，可显著提高患者的治疗依从性。与其他治疗相比，使用曲格列汀治疗的费用更低，药效持久，用药次数更少，可在每周周末服药即可，且用药期间检查随访次数少。与每天一次的阿格列汀（另外一种DPP-4抑制剂）相比，使用曲格列汀的患者的治疗满意度和生活质量更高。除降糖作用强外，还具有改善胰岛功能、不增加体重以及低血糖事件发生率低等优点。'
          },
          { img: 'https://www.kangantu.com/uploads/180322/1-1P3221605043V.jpg',
            intro: 'Empagliflozin是一种钠离子-葡萄糖协同转运体2（SGLT2）的抑制剂，适用于：（1）与运动和饮食协同，改善成年人2型糖尿病的血糖控制。（2）减少2型糖尿病伴明确的心血管疾病的成年人的心血管死亡风险。',
            name: '恩格列净/empagliflozin/Jardiance',
            spec: '恩格列净是唯一的一个可降低心血管并发症，降低心血管死亡风险的口服2型糖尿病药。（1）明显降低糖尿病患者心血管死亡风险 （2）降低血糖和血红蛋白 （3）降低患者因心衰住院的相对风险 （4）降低患者因任何原因发生死亡的风险 （5）可减轻体重 （6）可降低血压 （7）与其他降糖药相比，副作用无明显增加 （8）一日只需一片'
          }
        ],
        link_articles: [
          { title: '恩格列净/欧唐静能为糖尿病患者带来哪些益处？', date: '2019-04-26', id: '' },
          { title: '饭后血糖超20的患者除了吃曲格列汀(Zafatek)还要吃什么？', date: '2019-04-26', id: '' },
          { title: '恩格列净/恩格列净是糖尿病患者一种经济有效的治疗方案？', date: '2019-04-26', id: '' },
          { title: '恩格列净/恩格列净(JARDIANCE)在T2DM患者中极具成本效果？', date: '2019-04-26', id: '' }
        ],
        link_words: ['吉三代', 'AZD9291', 'PD-1', '格列卫', '特罗凯', '易瑞沙', '索非布韦', '多吉美舒', '尼替尼Vemlidy', '吉四代', '瑞格菲尼', '阿比特龙', '恩格列净', '赛可瑞', '吉二代', '曲格列汀', '依鲁替尼', '阿法替尼', '阿比特龙', '克唑替尼']
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
  .content .main .main-case .cont .tags .style1{margin: 5px;color: #008aff;border: 1px solid #008aff;border-radius: 12px}
  .content .main .main-case .cont .tags .style2{margin: 5px;color: #1daca4;border: 1px solid #1daca4;border-radius: 12px}
  .content .main .main-case .cont .tags .style3{margin: 5px;color: #D33146;border: 1px solid #D33146;border-radius: 12px}
  .content .main .main-case .cont .info{position: relative;margin-top: 20px; font-size: 1.25rem;color: #5a5a5a;}
  .content .right{width: 20%}
  .content .right .words{min-height: 200px;border: 1px solid #eee;margin-bottom: 20px;padding:15px;}
  .content .right .words>div.word-name{width:initial;border-bottom: 1px solid #eee;height: 4rem;line-height: 4rem;font-size: 1.5rem;font-weight: 600}
  .content .right .words>div.word-icon{width:initial;border-bottom: 1px solid #eee;line-height: 3rem;font-size: 1.25rem;color: #5a5a5a;}
  .content .right .words>div.word-title{width:initial;border-bottom: 1px solid #eee;font-size: 1.25rem;color: #5a5a5a;}
</style>
