<template>
  <div class="words">
    <div class="word-name">{{type===0?'新闻':'案例'}}频道</div>
    <div class="word-items">
      <el-button v-for="i in channels" :key="i.id"  @click="toChannelPage(i.id)" size="mini" border style="border: 1px solid #008aff;padding: 5px 10px;color: #008aff;margin: 5px;font-size: 1.35rem">{{i.name}}</el-button>
    </div>
  </div>
</template>

<script>
  import ChannelApi from '@/api/channelFront'
  export default {
    name: 'Channel',
    props: {
      type: {
        default: 0
      }
    },
    data() {
      return {
        channels: [],
        query: {
          pageObj: {
            current: 1,
            size: 200
          },
          andCondition: {
            type: 0
          }
        }
      }
    },
    mounted() {
      this.query.andCondition = { 'type': this.type }
      ChannelApi.queryPage(this.query).then(data => {
        this.channels = data.obj.records
      })
    },
    methods: {
      toChannelPage(id) {
        const routeData = this.$router.resolve({ path: (this.type === 0 ? '/news' : '/cases') + '/channel/' + id })
        window.open(routeData.href, '_blank')
      }
    }
  }
</script>

<style scoped>
.words{position:relative;height: 100%}
.words .word-name{padding-bottom: 1rem;font-size: 1.75rem;border-bottom: 1px solid #eee;}
.words .word-items{padding: 20px 0;display: flex;flex-flow: row wrap;}
</style>
