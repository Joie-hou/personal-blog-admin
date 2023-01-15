<template>
  <div class="article-container">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="Id"
        label="文章Id"
        width="100"
        align="center"
      />
      <el-table-column
        prop="pub_date"
        label="发布时间"
        min-width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ dayjs(scope.row.pub_date).format('YYYY-MM-DD HH:mm:ss') }}</span>

        </template>
      </el-table-column>
      <el-table-column
        prop="author_id"
        label="作者"
        min-width="150"
        align="center"
      />
      <el-table-column
        prop="state"
        label="状态"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag class="ml-2" :type="scope.row.state==='草稿'?'warning':'success'">{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="300"
        align="center"
      />
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.Id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="articleQuery.page"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="articleQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { getArticleList } from '@/api/article'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      dayjs,
      articleQuery: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    this.getArticle(this.articleQuery)
  },
  methods: {
    // 获取文章列表
    getArticle(query) {
      getArticleList(query).then(res => {
        this.tableData = res.data.articlesList
        this.total = res.data.total
      }).catch(err => {
        console.error(err)
      })
    },

    // 分页
    handleSizeChange(value) {
      this.pageSize.pageSize = value
      this.getArticle(this.articleQuery)
    },
    handleCurrentChange(value) {
      this.articleQuery.page = value
      this.getArticle(this.articleQuery)
    }
  }
}
</script>
<style lang="scss">
.article-container {
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
