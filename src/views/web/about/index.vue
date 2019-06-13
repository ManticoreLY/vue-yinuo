<template>
    <div class="page">
      <div class="bg">
        <el-image :src="aboutObj.imageUrl"></el-image>
        <div class="foot">
          <a v-for="t in items" :key="t" href="javascript: void(0)" @click="toggle(t)">{{ t.name }}</a>
        </div>
      </div>
      <div>
        <page v-show="items[0].show" :data = aboutObj.aboutUs></page>
        <declear v-show="items[1].show" :data = aboutObj.legal></declear>
        <credential v-show="items[2].show" :data = aboutObj.aboutQualifies></credential>
        <join-us v-show="items[3].show" :data = aboutObj.joinUs></join-us>
        <contact-us v-show="items[4].show" :data = aboutObj.contactUs></contact-us>
      </div>
    </div>
</template>

<script>
  import page from './page'
  import declear from './declare'
  import Credential from './Credential'
  import JoinUs from './JoinUs'
  import ContactUs from './ContactUs'
  import AboutApi from '@/api/OtherPage/aboutFront'

  export default {
    name: 'index',
    components: { page, declear, Credential, JoinUs, ContactUs },
    data() {
      return {
        aboutObj: {
          id: '',
          name: '',
          imageUrl: '',
          aboutUs: '',
          vision: '',
          legal: '',
          qualify: '',
          joinUs: '',
          contactUs: '',
          aboutQualifies: [{}, {}, {}]
        },
        items: [
          { name: '关于我们', show: true },
          { name: '法律声明', show: false },
          { name: '医诺资质', show: false },
          { name: '加入我们', show: false },
          { name: '联系我们', show: false }
        ]
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        AboutApi.findFrontOne().then(data => {
          this.aboutObj = data.obj
        }).catch(err => {
          console.log(err)
        })
      },
      toggle(item) {
        this.items.forEach(t => {
          t.show = false
        })
        item.show = true
      }
    }
  }
</script>

<style scoped>
.bg{position: relative}
.bg .foot{position: absolute;left:0;bottom: 0;width: 100%;height: 4rem;line-height: 4rem;background: rgba(0,0,0,.5);text-align: center}
.bg .foot a{display: inline-block;width: auto;height: 4rem;line-height:4rem;padding: 0 40px;font-size: 1.5rem;color: #f5f5f5}
.bg .foot a:hover{background: #1daca4;color: #fff}
</style>
