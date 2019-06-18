<template>
  <div id="app" v-cloak>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style>
html{font-size: 12px;box-sizing: content-box}
body{
  margin: 0;
  padding: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
h1,h2,h3,h4,h5,h6{margin: 10px;font-weight: 500}
a{text-decoration: none;color: inherit}
a:hover{cursor: pointer;color: #008aff}
p{margin: 5px auto;}
label{font-weight: 600}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-input, .el-select{width: 240px}
</style>
