<template>
  <div class="users-container">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="用户Id"
        width="100"
        align="center"
      />
      <el-table-column
        prop="username"
        label="用户账号"
        min-width="300"
        align="center"
      />
      <el-table-column
        prop="nickname"
        label="用户昵称"
        min-width="300"
        align="center"
      />
      <el-table-column
        prop="user_pic"
        label="用户头像"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.user_pic"
            :preview-src-list="[scope.row.user_pic]"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="用户邮箱"
        min-width="300"
        align="center"
      />
      <el-table-column
        width="200"
        align="right"
      >
        <template #header>
          <el-button type="success" @click="userDialogVisible = true">新增用户</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="visiblePasswordDialog(scope.row)"
          >重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增用户"
      :visible.sync="userDialogVisible"
      width="30%"
      center
    >
      <el-form label-position="right" label-width="80px" :model="reguserForm">
        <el-form-item label="用户账号">
          <el-input v-model="reguserForm.username" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="reguserForm.password" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="error" @click="userDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addUser(reguserForm)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="重置密码"
      :visible.sync="passwordDialogVisible"
      width="30%"
      center
    >
      <el-form label-position="right" label-width="80px" :model="passwordForm">
        <el-form-item label="原密码">
          <el-input v-model="passwordForm.oldPwd" show-password />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordForm.newPwd" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="error" @click="passwordDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="resetPassword(passwordForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, reguser } from '@/api/user'
import { updatePassword } from '@/api/userInfo'
export default {
  data() {
    return {
      tableData: [],
      query: {
        page: 1,
        pageSize: 10
      },
      type: 'create',
      userDialogVisible: false,
      reguserForm: {
        username: '',
        password: ''
      },
      passwordDialogVisible: false,
      passwordForm: {
        id: '',
        oldPwd: '',
        newPwd: ''
      }
    }
  },
  created() {
    this.getUsersList(this.query)
  },
  methods: {
    // 获取用户列表数据
    getUsersList(query) {
      getUsers(query).then(res => {
        this.tableData = res.data.usersList
      }).catch(err => {
        console.error(err)
      })
    },
    // 新增用户
    addUser(body) {
      reguser(body).then(res => {
        console.log(res)
        this.userDialogVisible = false
        this.getUsersList(this.query)
      }).catch(err => {
        console.error(err)
      })
    },
    // 重置密码
    visiblePasswordDialog(row) {
      this.passwordForm.id = row.id
      this.passwordDialogVisible = true
    },
    resetPassword(body) {
      updatePassword(body).then(res => {
        console.log(res)
        this.passwordDialogVisible = false
        this.getUsersList(this.query)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="scss">
.users-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    .el-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    }
}
</style>
