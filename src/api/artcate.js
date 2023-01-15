import request from '@/utils/request'

// 查询文章分类列表
export function getArtcateList(params) {
  return request({
    url: '/my/article/cates',
    method: 'get',
    params: params
  })
}

// 新增文章分类
export function addArtcate(data) {
  return request({
    url: '/my/article/addcates',
    method: 'post',
    data: data
  })
}

// 更新文章分类
export function updateArtcate(data) {
  return request({
    url: '/my/article/updateCate',
    method: 'post',
    data: data
  })
}

// 更新文章分类
export function statusArtcate(path, params) {
  return request({
    url: `/my/article/deleteCate/${path}`,
    method: 'get',
    params: params
  })
}
