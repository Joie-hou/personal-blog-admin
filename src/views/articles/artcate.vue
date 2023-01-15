<template>
  <div class="artcate-container">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="Id"
        label="分类Id"
        width="100"
        align="center"
      />
      <el-table-column
        prop="name"
        label="分类名称"
        min-width="150"
        align="center"
      />
      <el-table-column
        prop="alias"
        label="分类别名"
        min-width="150"
        align="center"
      />
      <el-table-column
        prop="is_delete"
        label="状态"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag class="ml-2" :type="scope.row.is_delete?'danger':'success'">{{ scope.row.is_delete?'冻结':'解冻' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        align="right"
      >
        <template #header>
          <el-button type="success" @click="artcateDialogVisible = true; artcateType = 'create'">新增分类</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="middle"
            :type="scope.row.is_delete?'success':'danger'"
            @click="artcateStatus(scope.row)"
          >{{ scope.row.is_delete?'解冻':'冻结' }}</el-button>
          <el-button
            size="middle"
            type="primary"
            @click="artcateEdit(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="artcateType === 'create' ? '新增分类' : '更改分类'"
      :visible.sync="artcateDialogVisible"
      width="30%"
      center
    >
      <el-form label-position="right" label-width="80px" :model="artcateForm">
        <el-form-item label="分类名称">
          <el-input v-model="artcateForm.name" />
        </el-form-item>
        <el-form-item label="分类别名">
          <el-input v-model="artcateForm.alias" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="error" @click="artcateDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addArtcate(artcateForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getArtcateList, addArtcate, updateArtcate, statusArtcate } from '@/api/artcate'
export default {
  data() {
    return {
      artcateQuery: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      artcateType: 'create',
      artcateDialogVisible: false,
      artcateForm: {
        name: '',
        alias: ''
      }
    }
  },
  created() {
    this.getArtcate(this.artcateQuery)
  },
  methods: {
    // 获取文章分类
    getArtcate(query) {
      getArtcateList(query).then(res => {
        this.tableData = res.data.artcateList
      }).catch(err => {
        console.error(err)
      })
    },

    // 新增文章分类
    addArtcate(body) {
      if (this.artcateType === 'create') {
        addArtcate(body).then(res => {
          console.log(res)
          this.artcateDialogVisible = false
          this.getArtcate(this.artcateQuery)
        }).catch(err => {
          console.error(err)
        })
      } else {
        updateArtcate(body).then(res => {
          console.log(res)
          this.artcateDialogVisible = false
          this.getArtcate(this.artcateQuery)
        }).catch(err => {
          console.error(err)
        })
      }
    },

    // 编辑文章分类
    artcateEdit(row) {
      this.artcateType = 'edit'
      this.artcateForm = {
        id: row.Id,
        name: row.name,
        alias: row.alias
      }
      this.artcateDialogVisible = true
    },

    // 更改文章分类状态
    artcateStatus(row) {
      statusArtcate(row.Id, { status: row.is_delete === 0 ? 1 : 0 }).then(res => {
        console.log(res)
        this.getArtcate(this.artcateQuery)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
<style lang="scss">
.artcate-container {
    width: 100%;
    height: 100%;
    padding: 20px;
}
</style>
