<template>
  <div>
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data() {
      return {
        editor: null,
        isReady: false
      }
    },
    props: {
      id: {
        type: String
      },
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    watch: {
      defaultMsg() {
        debugger
        if (this.isReady) {
          this.editor.setContent(this.defaultMsg) // 确保UE加载完成后，放入内容。
        }
      }
    },
    mounted() {
      const _this = this
      // const UE = document.getElementById(this.id)
      debugger
      /* global UE */
      this.editor = UE.getEditor(this.id, this.config) // 初始化UE
      this.editor.addListener('ready', function() {
        if (!_this.defaultMsg) {
          _this.defaultMsg = ''
        }
        _this.isReady = true
        _this.editor.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
      })
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy()
    }
  }
</script>
