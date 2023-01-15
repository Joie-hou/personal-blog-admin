<template>
  <div class="userinfo-container">
    <h2>基本信息</h2>
    <el-form label-position="top" label-width="80px" :model="userinfoForm">
      <el-form-item label="昵称">
        <div v-show="!isEdit">{{ name }}</div>
        <el-input v-show="isEdit" v-model="userinfoForm.nickname" />
      </el-form-item>
      <el-form-item label="邮箱">
        <div v-show="!isEdit">{{ email }}</div>
        <el-input v-show="isEdit" v-model="userinfoForm.email" />
      </el-form-item>
      <el-form-item>
        <el-button v-show="!isEdit" type="primary" @click="editStatus">编辑</el-button>
        <el-button v-show="isEdit" type="success" @click="userinfoEdit">提交</el-button>
        <el-button v-show="isEdit" type="warning" @click="editStatus">取消</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <h2>用户头像</h2>
    <el-avatar :src="avatar ? avatar : ''">{{ avatar ? '' : name }}</el-avatar>
    <el-button style="margin-left: 10px;" type="primary" size="medium" @click="uploadAvatarShow = true">设置头像</el-button>
    <my-upload
      :model-value="uploadAvatarShow"
      :url="uploadUrl"
      :headers="{
        Authorization: getToken()
      }"
      :no-rotate="false"
      @update:modelValue="uploadAvatarShow = false"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { updateUserInfo } from '@/api/userInfo'
import { getToken } from '@/utils/auth'
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
export default {
  components: {
    myUpload
  },
  data() {
    return {
      userinfoForm: {
        nickname: '',
        email: ''
      },
      isEdit: false,
      uploadAvatarShow: false,
      uploadUrl: '',
      getToken,
      imgDataUrl: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'email', 'avatar'])
  },
  created() {
    this.uploadUrl = process.env.VUE_APP_BASE_API + '/my/upadte/avatar'
  },
  methods: {
    // 用户基本信息----------------------
    editStatus() {
      this.isEdit = !this.isEdit
      if (this.isEdit) {
        this.userinfoForm = {
          nickname: this.name,
          email: this.email
        }
      } else {
        this.userinfoForm = {
          nickname: '',
          email: ''
        }
      }
    },
    userinfoEdit() {
      updateUserInfo(this.userinfoForm).then(res => {
        console.log(res)
        this.isEdit = false
        store.dispatch('user/getInfo')
        this.$notify({
          message: res.message,
          type: 'success'
        })
      }).catch(err => {
        console.error(err)
      })
    },
    // 用户头像------------------------------
    /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    /**
			 * upload success
			 *
			 * [param] jsonData  server api return data, already json encode
			 * [param] field
			 */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
      store.dispatch('user/getInfo')
      this.$notify({
        message: jsonData.message,
        type: 'success'
      })
    },
    /**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }
}
</script>
<style lang="scss">
.userinfo-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  .el-form {
    width: 300px;
  }
  .el-avatar--circle {
    width: 100px;
    height: 100px;
  }
}
</style>
