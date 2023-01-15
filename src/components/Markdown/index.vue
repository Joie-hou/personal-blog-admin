<template>
  <div class="article-content">
    <div :id="id" class="markdown-editor" />
  </div>
</template>

<script>
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

import defaultOptions from './default-options'
import { getToken } from '@/utils/auth'
import { uploadArticleFile } from '@/api/article'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return (
          'markdown-editor-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    floder: {
      type: String,
      default() {
        return (
          'markdown-editor-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    }
  },
  data() {
    return {
      editor: null,
      getToken
    }
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)
      return options
    }
  },
  watch: {
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.editor.getMarkdown()) {
        this.editor.setMarkdown(newValue)
      }
    }
  },
  created() {
    this.uploadAction = process.env.VUE_APP_BASE_API + '/my/article/upload'
  },
  mounted() {
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    // markdown编辑器--------------------------
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions
      })
      if (this.value) {
        this.editor.setValue(this.value)
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getMarkdown())
      })

      this.uploadImg()
    },
    destroyEditor() {
      if (!this.editor) return
      this.editor.off('change')
      this.editor = null
    },

    setHtml(value) {
      this.editor.setHtml(value)
    },
    getHtml() {
      return this.editor.getHtml()
    },

    // 上传图片方法
    uploadImg() {
      this.editor.removeHook('addImageBlobHook')
      this.editor.on('addImageBlobHook', (_file, cb) => {
        const formdata = new FormData()
        formdata.append('floder', this.floder)
        formdata.append('article_img', _file)
        // 这是我们往服务器上传图片调接口
        uploadArticleFile(formdata).then(res => {
          if (res.status === 0) {
            cb(res.data, formdata.name)
          }
        }).catch(err => {
          console.error(err)
        })
      })
    }
  }
}
</script>
<style lang="scss">
.markdown-editor {
  height: 100%;
  width: 100%;
  .te-md-splitter {
    width: 50%;
    .te-preview {
      width: auto;
    }
  }
}
</style>
