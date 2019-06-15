<template>
    <div class="nav-bar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item" :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-dropdown split-button type="success" size="medium" @click="checkInfo">
            当前用户: {{ user.name }}
          <el-dropdown-menu slot="dropdown">
<!--            <el-dropdown-item>查看资料</el-dropdown-item>-->
            <el-dropdown-item>
              <el-button type="text" @click="logout">退出登陆</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
  import store from '@/store'
  import { mapGetters } from 'vuex'
  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      checkInfo() {
        const h = this.$createElement
        this.$notify({
          title: '当前用户',
          type: 'info',
          message: h('div', {}, `姓名: ${this.user.name}`),
          duration: 5000
        })
      },
      logout() {
        store.dispatch('logout').then(() => {
          this.$router.replace({ path: '/login' })
        })
      }
    }
  }
</script>

<style scoped>
</style>
