<template>
  <canvas id="canvas" ref="mycanvas" :width="width" :height="height"></canvas>
</template>

<script>
  export default {
    name: 'MyCanvas',
    props: {
      words: {
        type: Array,
        default: []
      },
      width: {
        type: Number,
        default: 500
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
        position: null,
        hasCursor: false,
        word: {}
      }
    },
    mounted() {
      this.cancas = this.$refs['mycanvas']
      this.ctx = this.cancas.getContext('2d')
      this.ctx.font = `${this.fontSize}px Microsoft Yahei`// '16px Microsoft Yahei'
      this.ctx.fillStyle = `${this.fontColor}`
      if (this.words && this.words.length) {
        this.start(this.cancas.width)
      }

      const can = document.getElementById('canvas')
      can.addEventListener('mouseover', (e) => {
        if (e) {
          this.ctx.fillStyle = '#008aff'
          this.hasCursor = true
          setTimeout(() => {
            this.stop()
          }, 20)
        }
      })
      can.addEventListener('mouseout', (e) => {
        if (e) {
          this.ctx.fillStyle = `${this.fontColor}`
          this.start(this.position)
        }
      })
      can.addEventListener('mouseup', (e) => {
        if (e) {
          const route = this.$router.resolve({ path: `/articleInfo/${this.word.id}` })
          window.open(route.href, '_blank')
        }
      })
    },
    methods: {
      start(position) {
        const _this = this
        _this.position = position
        _this.word = _this.nextWord()
        let length = _this.ctx.measureText(_this.word.title).width
        if (_this.timer) clearInterval(_this.timer)
        _this.timer = setInterval(() => {
          _this.ctx.clearRect(0, 0, _this.cancas.width, _this.cancas.height)
          _this.ctx.fillText(_this.word.title, _this.position--, 22)
          if (_this.position <= -length) {
            _this.word = _this.nextWord()
            length = _this.ctx.measureText(_this.word.title).width
            _this.position = _this.cancas.width
          }
        }, 20)
      },

      stop() {
        clearInterval(this.timer)
      },
      nextWord() {
        if (this.hasCursor) {
          this.hasCursor = false
          return this.word
        }
        const index = this.words.indexOf(this.word)
        if (index === this.words.length - 1) return this.words[0]
        return this.words[index + 1]
      }
    },
    watch: {
      words() {
        this.start(this.cancas.width)
      }
    }
  }
</script>

<style scoped>

</style>
