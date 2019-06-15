<template>
  <canvas id="canvas" ref="mycanvas" :width="width" :height="height"></canvas>
</template>

<script>
  export default {
    name: 'MyCanvas',
    props: {
      words: {
        type: String,
        default: ''
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 30
      },
      fontSize: {
        type: Number,
        default: 16
      },
      fontColor: {
        type: String,
        default: '#adadad'
      }
    },
    data() {
      return {
        canvas: null,
        ctx: null,
        timer: null,
        position: null
      }
    },
    mounted() {
      this.cancas = this.$refs['mycanvas']
      this.ctx = this.cancas.getContext('2d')
      this.ctx.font = `${this.fontSize}px Microsoft Yahei`// '16px Microsoft Yahei'
      this.ctx.fillStyle = `${this.fontColor}`
      debugger
      if (this.words) {
        this.start(this.cancas.width)
      }

      const can = document.getElementById('canvas')
      can.addEventListener('mouseover', (e) => {
        if (e) {
          this.ctx.fillStyle = '#008aff'
          setTimeout(() => {
            this.stop()
          }, 100)
        }
      })
      can.addEventListener('mouseout', (e) => {
        if (e) {
          this.ctx.fillStyle = `${this.fontColor}`
          this.start(this.position)
        }
      })
    },
    methods: {
      start(position) {
        this.position = position
        const length = this.words.length * this.fontSize
        if (this.timer) clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.ctx.clearRect(0, 0, this.cancas.width, this.cancas.height)
          this.ctx.fillText(this.words, this.position--, 22)
          if (this.position <= -length) this.position = this.cancas.width
        }, 20)
      },
      stop() {
        clearInterval(this.timer)
      }
    },
    watch: {
      words: 'start'
    }
  }
</script>

<style scoped>

</style>
