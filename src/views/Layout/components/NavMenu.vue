<template>
  <div id="navmenu">
    <el-menu :default-active="$route.path" mode="vertical" class="el-menu-vertical-demo" background-color="#304156"
             text-color="#bfcbd9"
             active-text-color="#409EFF"
             @open="handleOpen">
      <template v-for="item in menus" v-if="hasRole(item) && isShow(item)">
        <router-link v-if="hasOneChildrenOption(item)" :to="{ path: pathResolve(item.path, item.children[0].path)}">
          <el-menu-item :index="pathResolve(item.path, item.children[0].path)">{{ item.name }}</el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.path">
          <template slot="title">{{ item.name }}</template>
          <el-menu-item-group>
            <router-link v-for="childMenu in item.children" :key="childMenu" v-if="!childMenu.hidden" :to="{ path: pathResolve(item.path, childMenu.path) }">
              <el-menu-item :index="pathResolve(item.path, childMenu.path)" style="width: 180px">{{ childMenu.name }}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
    import store from '@/store'
    import yinuo from '@/router/yinuo'

    export default {
      name: 'NavMenu',
      data() {
        return {
          role: 'user'
        }
      },
      computed: {
        menus() {
          return yinuo
        }
      },
      beforeCreate() {
        store.dispatch('userInfo').then(user => {
          this.role = user.type === 0 ? 'admin' : 'user'
        })
      },
      methods: {
        isShow(route) {
          if (this.hasOneChildrenOption(route)) {
            return !route.children[0].hidden
          }
          return true
        },
        hasRole(route) {
          if (route.meta) {
            return route.meta.indexOf(this.role) > -1
          }
          return true
        },
        hasOneChildrenOption(item) {
          const children = item.children.filter(item => !item.hidden)
          if (children.length === 1 || item.children.length === 1) {
            return true
          }
          return false
        },
        pathResolve(path, childPath) {
          if (childPath) {
            return path + '/' + childPath
          } else {
            return path
          }
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath)
        }
      }
    }
</script>

<style scoped>
  #navmenu{overflow-x: hidden !important;width: 100%;height: 100%;}
  #navmenu::-webkit-scrollbar {display:none}
  >>> .el-menu{width: 100%;height: 100%}
  >>> .el-submenu .el-menu-item{width: 200px}
</style>
