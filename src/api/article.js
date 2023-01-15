import request from '@/utils/request'

// 查询文章列表
export function getArticleList(params) {
  return request({
    url: '/my/article/articleList',
    method: 'get',
    params: params
  })
}

// 新增文章
export function addArticle(data) {
  return request({
    url: '/my/article/addArticle',
    method: 'post',
    data: data
  })
}

// 上传文件
export function uploadFile(data) {
  return request({
    url: '/my/article/upload',
    method: 'post',
    data: data
  })
}
// 上传文件
export function uploadArticleFile(data) {
  return request({
    url: '/my/article/article/upload',
    method: 'post',
    data: data
  })
}

// 获取文章内容
export function getArticleById(id) {
  return request({
    url: `/my/article/articleContent/${id}`,
    method: 'get'
  })
}

// 更新文章内容
export function updateArticleById(data) {
  return request({
    url: `/my/article/updateArticle`,
    method: 'post',
    data: data
  })
}
