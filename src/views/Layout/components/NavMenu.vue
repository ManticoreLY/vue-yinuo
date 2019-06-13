<template>
  <div id="navmenu">
    <el-menu :default-active="$route.path" mode="vertical" class="el-menu-vertical-demo" background-color="#304156"
             text-color="#bfcbd9"
             active-text-color="#409EFF"
             @open="handleOpen">
      <template v-for="item in menus" v-show="!item.hidden">
        <router-link v-if="hasOneChildrenOption(item)" :to="{ path: pathResolve(item.path, item.children[0].path)}">
          <el-menu-item :index="pathResolve(item.path, item.children[0].path)">{{ item.name }}</el-menu-item>
        </router-link>
        <el-submenu v-else>
          <template slot="title">{{ item.name }}</template>
          <el-menu-item-group>
            <router-link v-for="childMenu in item.children" :key="childMenu" v-if="!childMenu.hidden" :to="{ path: pathResolve(item.path, childMenu.path) }">
              <el-menu-item :index="pathResolve(item.path, childMenu.path)">{{ childMenu.name }}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
    // import { mapGetters } from 'vuex'
    import yinuo from '@/router/yinuo'

    export default {
      name: 'NavMenu',
      data() {
        return {}
      },
      computed: {
        menus() {
          return yinuo
        }
      },
      methods: {
        hasOneChildrenOption(item) {
          const children = item.children.filter(item => !item.hidden)
          if (children.length === 1) {
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
  #navmenu{overflow-x: hidden!important;}
</style>
