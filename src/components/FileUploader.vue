<template>
    <el-upload :action="action" list-type="picture-card" :headers="headers" :name="name" :show-file-list="showFileList" :multiple="limit > 1"
               :accept="accept" :drag="drag" :limit="limit" :http-request="httpRequest" :file-list="fileList" :on-remove="onChange" :on-success="onSuccess" :on-change="onChange">
      <i class="el-icon-plus"></i>
      <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
    </el-upload>
</template>

<script>
  import { randomUUID } from '@/utils/random'

  export default {
    name: 'FileUploader',
    props: {
      httpRequest: {
        type: Function
      },
      onRemove: {
        type: Function
      },
      onSuccess: {
        type: Function
      },
      onChange: {
        type: Function
      },
      accept: {
        type: String,
        default: 'jpg, JPG, png, PNG, bmp, BMP, gif, GIf'
      },
      drag: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 1
      },
      fileList: {
        type: Array,
        default: []
      },
      showFileList: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        name: randomUUID(),
        headers: {
          'Content-Type': 'image/jpeg'
        }
      }
    }
  }
</script>

<style scoped>

</style>
