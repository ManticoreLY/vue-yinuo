<template>
  <div class="hover-bar">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="main">
        <img :src="item.icon" style="width:28px;height:28px;">
        <span style="margin-left: 10px">{{item.name}}</span>
      </div>
      <div class="sub">
        <span v-if = "item.disease1"><router-link  tag="a" target="_blank" :to="'/navItemInfo/'+item.disease1.id">{{item.disease1?item.disease1.name:''}}</router-link></span>
        <span v-if = "item.disease2"><router-link  tag="a" target="_blank" :to="'/navItemInfo/'+item.disease2.id">{{item.disease2?item.disease2.name:''}}</router-link></span>
        <span v-if = "item.disease3"><router-link  tag="a" target="_blank" :to="'/navItemInfo/'+item.disease3.id">{{item.disease3?item.disease3.name:''}}</router-link></span>
      </div>
      <div class="panel">
        <div class="info-item" v-for="i in item.diseaseDbDetailConfigList" :key="i.id">
          <h5 style="color: #008aff;font-weight: 600"><router-link  tag="a" target="_blank" :to="'/navItemInfo/'+i.disease.id">{{ i.disease.name }}</router-link></h5>
          <h6>
            <span v-for="p in i.disease.medicines" :key="p.id"><router-link tag="a" target="_blank" :to="'/medicineInfo/'+p.id" >{{p.shotName}}</router-link></span>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DiseaseDBApi from '@/api/Homepage/home'

  export default {
    name: 'HoverBar',
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        DiseaseDBApi.diseaseDb().then(data => {
          const _this = this
          _this.list = data.obj
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
.hover-bar{width: 100%;height: 100%;}
.item{width: 98.5%;height: 16.5%;border-bottom:1px solid #eee;border-left:3px solid #1daca4}
.item:last-child{border: none}
.item:hover{background: #fff;border-left:3px solid #008aff;}
.item:hover .main,.item:hover .sub{color: #008aff;}
.item .main{font-size: 1.4rem;font-weight: 600;color: #f5f5f5;padding: 10px;display: flex;align-items: center;justify-content: flex-start}
.item .sub{font-size: 1.15rem;color: #eee;padding-left: 5px;}
.item .sub span{padding: 1px 4px;border-right: 1px solid #eee;}
.item:hover .sub span{padding: 1px 4px;border-right: 1px solid #008aff;}
.item .sub span:last-child{border:none}
.panel{visibility: hidden;position:absolute;width: 500px;height: 95%;left: 100%;top: 0;background: #fff;padding: 1rem;border-right: 1px solid #ccc;border-bottom: 1px solid #ccc}
.panel .info-item{width: 100%;height: auto;border-bottom: 1px dotted #ddd;color: #545454}
.panel .info-item a:hover{text-decoration: underline}
.panel .info-item h5{padding: 0 5px}
.panel .info-item h6>span{border-right: 1px solid #545454;padding: 0 5px}
.panel .info-item h6>span a:hover{color: #008aff;}
.panel .info-item h6>span:last-child{border: none}
.item:hover .panel{visibility: visible}
</style>
