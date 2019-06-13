<template>
    <div>
      <div class="nav">当前位置：
        <router-link :to="'/'">医诺寰宇海外医疗</router-link>
        >
        <router-link :to="'/about'">关于我们</router-link>
        > 医诺资质
      </div>
      <div class="main" v-for="p in data" :key="p">
        <div>
          <p>{{p.name}}</p>
          <h5>
            {{p.describe}}
          </h5>
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in p.imageUrlList" :key="item">
              <h3 class="medium"><el-image :src="item"></el-image></h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Credential',
    props: {
      data: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .main{width: 100%;height: 100%}
  .main>div{width: 90%;margin: 20px 5%;text-align: center}
  .main>div p{;padding: 2rem 1rem;font-size: 2rem;font-weight: 500;}
  .main>div h5{font-size: 1.375rem;line-height: 2.5rem;margin: 20px 0;}
  >>> .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  >>> .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  >>> .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
