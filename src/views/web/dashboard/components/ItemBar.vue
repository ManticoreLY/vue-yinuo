<template>
  <div class="item-bar">
    <span></span>
    <div>{{ name }}</div>
    <span></span>
    <div class="description">{{subTitle}}</div>
  </div>
</template>

<script>
    export default {
      name: 'ItemBar',
      props: {
        name: String,
        subTitle: {
          type: String,
          default: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX'
        }
      }
    }
</script>

<style scoped>
  .item-bar{width: 100%;position:relative;margin: 20px 0;display: inline-flex;flex-flow: row wrap; align-items: center;justify-content: space-between}
  .item-bar span{display: inline-block;width: 32%;height:0;border: 3px solid #1daca4}
  .item-bar div{display: inline-block;width: 34%;text-align: center;font-size: 4rem}
  .item-bar div.description{width: 100%;text-align: center;font-size: 1.5rem;color: #7f7f7f;margin: 10px auto 20px}
</style>
