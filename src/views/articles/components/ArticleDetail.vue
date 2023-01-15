<template>
  <div class="markdown-container">
    <el-form
      label-position="right"
      label-width="80px"
      :model="articleForm"
      class="article-form"
    >
      <div class="article-header">
        <el-row :gutter="20">
          <el-col
            :span="20"
          ><el-form-item class="article-title" label="标题">
            <el-input
              v-model="articleForm.title"
              class="title-input"
              placeholder="标题"
            /> </el-form-item></el-col>
          <el-col class="status-col" :span="2">
            <el-button
              type="primary"
              @click="articleStatus('发布')"
            >发布</el-button>
          </el-col>
          <el-col class="status-col" :span="2">
            <el-button
              type="warning"
              @click="articleStatus('草稿')"
            >草稿</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col
            :span="5"
          ><el-form-item label="所属分类">
            <el-select v-model="articleForm.cate_id" placeholder="请选择分类">
              <el-option
                v-for="item in artcateOptions"
                :key="item.Id"
                :label="item.name"
                :value="item.Id"
              />
            </el-select> </el-form-item></el-col>
          <el-col
            :span="5"
          ><el-form-item label="封面图">
            <el-upload
              class="upload-demo"
              :action="uploadAction"
              :headers="{
                Authorization: getToken(),
              }"
              name="cover_img"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-change="onChange"
              :on-remove="handleRemove"
              :limit="1"
              :auto-upload="true"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item></el-col>
        </el-row>
      </div>
      <el-row class="article-content-row" :gutter="24">
        <el-col :span="24">
          <el-form-item label-width="0px">
            <markdownEdit
              ref="markdownEditor"
              v-model="articleForm.content"
              :floder="articleForm.article_floder"
              :options="{ language: 'zh-CN', placeholder: '输入内容' }"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/i18n/zh-cn'
import markdownEdit from '@/components/Markdown'
import { getArtcateList } from '@/api/artcate'
import { addArticle, getArticleById, updateArticleById } from '@/api/article'
import { getToken } from '@/utils/auth'
const defaultForm = {
  title: '',
  cate_id: '',
  state: '草稿',
  cover_img: '',
  content: '',
  article_floder: 'markdown-editor-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
}
export default {
  components: {
    markdownEdit
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      getToken,
      artcateOptions: [],
      uploadAction: '',
      articleForm: Object.assign({}, defaultForm),
      fileList: []
    }
  },
  created() {
    this.uploadAction = process.env.VUE_APP_BASE_API + '/my/article/upload'
    this.getArtcate()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    // 获取文章分类
    getArtcate() {
      const query = {
        status: 0,
        page: 1,
        pageSize: 1000
      }
      getArtcateList(query)
        .then((res) => {
          this.artcateOptions = res.data.artcateList
        })
        .catch((err) => {
          console.error(err)
        })
    },

    // 根据id获取文章详情
    fetchData(id) {
      getArticleById(id).then(res => {
        this.articleForm = {
          id: res.data.Id,
          title: res.data.title,
          content: res.data.content,
          cover_img: res.data.cover_img,
          state: res.data.state,
          cate_id: res.data.cate_id,
          article_floder: res.data.article_floder ? res.data.article_floder : 'markdown-editor-' +
          +res.data.Id
        }
        this.fileList = [{ name: 'cover_img', url: res.data.cover_img }]
      }).catch(err => {
        console.error(err)
      })
    },

    // 封面图上传-------------------------
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      this.articleForm.cover_img = response.data
      this.fileList.push({
        name: file.name,
        url: response.data
      })
    },
    handleError(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('封面图上传失败')
    },
    onChange(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = []
    },
    handleExceed(files, fileList) {
      if (files.length > 1) {
        this.$message.error('封面图仅支持上传一张')
      }
    },

    // 新增|更新文章状态-------------------
    articleStatus(state) {
      this.articleForm.state = state
      if (!this.isEdit) {
        addArticle(this.articleForm)
          .then((res) => {
            console.log(res)
            this.$notify({
              message: res.message,
              type: 'success',
              onClose: () => {
                this.$router.replace('/article/list')
              }
            })
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        updateArticleById(this.articleForm)
          .then((res) => {
            console.log(res)
            this.$notify({
              message: res.message,
              type: 'success',
              onClose: () => {
                this.$router.replace('/article/list')
              }
            })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  }
}
</script>
  <style lang="scss">
  .markdown-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    .article-form {
      height: 100%;
    }
    .article-header {
      .status-col {
        display: flex;
        justify-content: right;
      }
      .article-title {
        .title-input {
          input {
            border-radius: 0;
            border: none;
            border-bottom: 1px solid #e0e0e0;
            &:focus {
              border-color: #409eff;
            }
          }
        }
      }
      .upload-demo {
        position: relative;
        .el-upload__tip {
          position: absolute;
          top: 0;
          left: 90px;
          white-space: nowrap;
        }
      }
    }
    .article-content-row {
      height: calc(100% - 150px);
      .el-col-24 {
        height: 100%;
        .el-form-item {
          height: 100%;
          .el-form-item__content {
            height: 100%;
            .article-content {
              width: 100%;
              height: 100%;
              display: flex;
            }
          }
        }
      }
    }
  }
  </style>

