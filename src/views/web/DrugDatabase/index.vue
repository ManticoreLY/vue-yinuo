<template>
    <div class="drug-db">
      <div class="item-list">
        <div class="item bg1">
          <div class="title">数据全面</div>
          <div class="cont">涵盖上百种靶向信息和数据</div>
        </div>
        <div class="item bg2">
          <div class="title">资料参考</div>
          <div class="cont">多方面覆盖药物各项资料供参考</div>
        </div>
        <div class="item bg3">
          <div class="title">智能搜索</div>
          <div class="cont">数据库智能匹配，推送相关资讯</div>
        </div>
        <div class="item bg4">
          <div class="title">疑问解答</div>
          <div class="cont">在线医生实时解答药品相关疑问</div>
        </div>
      </div>
      <div class="category">
        <div style="height:3rem;line-height:3rem;text-align: center;font-size: 2rem;">{{drugDbObj.title}}</div>
        <div style="height:3rem;line-height:3rem;text-align: center;font-size: 1.375rem;color: #545454">{{drugDbObj.describe}}</div>
        <div v-for="(diseases,diseaseTypeName,diseaseTypeIndex) in drugDbObj.drugDbDiseaseMap" :key="diseaseTypeIndex">
          <div style="height:3rem;line-height:3rem;font-size: 2rem;font-weight: 600;color: #545454;margin:10px 0">{{diseaseTypeName}}</div>
          <div class="list">
            <div class="item" v-for="(item,diseaseIndex) in diseases" :key="diseaseIndex">
              <el-image :src="item.disease.icon" :fit="'fit'" style="float:left;width: 40px;height: 40px"></el-image>
              <div class="name">
                <div><router-link  tag="a" target="_blank" :to="'/navItemInfo/'+item.disease.id">{{ item.disease.name }}</router-link></div>
                <div v-for="(drug, index) in item.disease.medicines" :key="index" v-if="index < 3 || (item.show && index >= 3)"><router-link  tag="a" target="_blank" :to="'/medicineInfo/'+drug.id">{{ drug.name }}</router-link> </div>
                <div v-show="item.disease.medicines.length > 3 && !item.show"><a @click="toggleFold(diseaseTypeName, item,diseaseIndex)">更多<i class="el-icon-arrow-down"></i></a></div>
                <div v-show="item.disease.medicines.length > 3 && item.show"><a @click="toggleFold(diseaseTypeName, item,diseaseIndex)">收起<i class="el-icon-arrow-up"></i></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table">
        <div>
          <el-divider content-position="center">{{drugDbObj.rankTitleMedicine}}</el-divider>
          <el-table :data="drugDbObj.drugDbRankMedicineList" :border="false" :default-sort="{ prop: 'index', sort: 'ascending' } " :header-cell-style="rankHeaderCellStyle">
            <el-table-column  label="排名" width="100px">
              <template slot-scope="scope">
                <span v-if="scope.$index < 3" style="background: #00a4ff;    width: 20px; height: 20px;text-align: center; display: inline-block; color: #fff;    border-radius: 5px;">{{scope.$index+1}}</span>
                <span v-if="scope.$index >= 3" style="  width: 20px; height: 20px;text-align: center; display: inline-block;  border-radius: 5px;">{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="药品名称" align="left">
              <template slot-scope="scope">
                <router-link  tag="a" target="_blank" :to="'/medicineInfo/'+ scope.row.medicine.id"> {{ scope.row.medicine.name }}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="适应症" align="center">
              <template slot-scope="scope"><span style="    color: #999;">{{ scope.row.medicine.fitDisease }}</span></template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-divider content-position="center">{{drugDbObj.rankTitleMaker}}</el-divider>
          <el-table :data="drugDbObj.drugDbRankMakerList" :border=false :header-cell-style="rankHeaderCellStyle">
            <el-table-column  label="排名"  width="100px">
              <template slot-scope="scope">
                <span v-if="scope.$index < 3" style="background: #00a4ff;    width: 20px; height: 20px;text-align: center; display: inline-block; color: #fff;    border-radius: 5px;">{{scope.$index+1}}</span>
                <span v-if="scope.$index >= 3" style="  width: 20px; height: 20px;text-align: center; display: inline-block;  border-radius: 5px;">{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="药厂名称" prop="name" align="left">
            </el-table-column>
            <el-table-column label="所属地区" prop="area" align="center">
              <template slot-scope="scope"><span style="    color: #999;">{{ scope.row.area }}</span></template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="display">
        <div class="title">{{drugDbObj.titleFoot}}</div>
        <div class="subtitle">{{drugDbObj.describeFoot}}</div>
        <div class="logos">
          <el-image v-for="(item,index) in drugDbObj.imageUrlFootList" :key="index" :src="item" fit="fit" style="width: 160px;height: 80px"></el-image>
        </div>
      </div>
    </div>
</template>

<script>
  import DrugDbApi from '@/api/OtherPage/drugdbFront'

  export default {
    name: 'index',
    data() {
      return {
        drugDbObj: {
          id: '',
          name: '',
          imageUrl: '',
          title: '',
          describe: '',
          drugDbDiseaseList: [],
          drugDbDiseaseIdList: [],
          drugDbDiseaseMap: {},
          rankTitleMedicine: '',
          drugDbRankMedicineList: [],
          drugDbRankMedicineIdList: [],
          rankTitleMaker: '',
          drugDbRankMakerList: [],
          drugDbRankMakerIdList: [],
          titleFoot: '',
          describeFoot: '',
          imageUrlsFoot: '',
          imageUrlFootList: [],
          imageUrlFootFileList: [{}, {}, {}, {}, {}, {}]
        },
        rankHeaderCellStyle: {
          'background': '#fafafa',
          'border-top': '1px solid #e8e8e8',
          'border-bottom': '1px solid #e8e8e8',
          'font-size': '12px',
          'font-weight': 'normal' },
        img_url: 'static/img/1.png'
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        DrugDbApi.findFrontOne().then(data => {
          if (data.result) {
            this.drugDbObj = data.obj
            for (var key in this.drugDbObj.drugDbDiseaseMap) {
              this.drugDbObj.drugDbDiseaseMap[key].forEach(item => { item.show = false })
            }
          }
        })
      },
      toggleFold(diseaseTypeName, t, diseaseIndex) {
        const item = this.drugDbObj.drugDbDiseaseMap[diseaseTypeName][diseaseIndex]
        item.show = !item.show
        this.$set(this.drugDbObj.drugDbDiseaseMap[diseaseTypeName], diseaseIndex, item)
      }
    }
  }
</script>

<style scoped>
.drug-db{width: 100%;}
.bg{width: 100%}
.bg1{background-image: url('../../../../static/img/1.png');background-repeat: no-repeat;background-size: 50%;background-position: 100% 100%}
.bg2{background-image: url('../../../../static/img/2.png');background-repeat: no-repeat;background-size: 50%;background-position: 100% 100%}
.bg3{background-image: url('../../../../static/img/3.png');background-repeat: no-repeat;background-size: 50%;background-position: 100% 100%}
.bg4{background-image: url('../../../../static/img/4.png');background-repeat: no-repeat;background-size: 50%;background-position: 100% 100%}
.item-list{width:90%;padding: 20px 5%;display: inline-flex;flex-direction: row;align-items: center;justify-content: space-around}
.item-list .item{width: 18%;height: 10rem;border: 1px solid #ccc;box-shadow: 1px 1px 2px #ccc;padding: 20px;transition: margin-top .5s}
.item-list .item:hover{margin-top: -10px;}
.item-list .item:hover .title{color: #2b96cc}
.item-list .item .title{display: inline-block;font-size: 1.75rem;font-weight: 600;padding-bottom: 1rem; border-bottom: 2px solid #2b96cc}
.item-list .item .cont{font-size: 1.25rem;padding:10px 0;color: #545454}
.category{background: #fff;width:90%;padding: 2rem 5%;margin-top: 0px;}
.category .list{width:100%;margin-top: 10px;display:flex;flex-flow: row wrap;align-items: stretch;align-content: stretch;justify-content: flex-start}
.category .list .item{width:24%;margin-top: 20px;}
.category .list .item .name{width:70%;margin-left: 5%;display: inline-block;font-size: 1.75rem;}
.category .list .item .name div{border-top:1px solid #ccc;height: 3rem;line-height: 3rem;font-size: 1.25rem;color: #7a7a7a}
.category .list .item .name div:nth-child(1){height: 4rem;font-size: 1.5rem;border:none;line-height: inherit;font-weight: 600}
.category .list .item .name div:hover{color: #1caca3;background: #efefef}
.table{width: 90%;padding: 0 5%;min-height: 300px;background: #fff;display: inline-flex;flex-flow: row nowrap;align-items: flex-start;align-content: stretch;justify-content: space-between}
.table>div{width: 48%;display: inline-block;min-height: inherit;}
.display{width: 90%;padding: 20px 5%;height: auto;background: #fff;}
.display .title{width: 100%;height: 4rem;line-height: 4rem;font-size:2rem;font-weight: 600;text-align: center}
.display .subtitle{width: 100%;height: 4rem;line-height: 4rem;font-size:1.5rem;color:#aaa;text-align: center}
.display .logos{width: 90%;padding: 20px 5%;display: inline-flex;flex-flow: row nowrap;align-items: center;justify-content: space-around}
</style>
