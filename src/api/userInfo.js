import request from '@/utils/request'

// 获取用户信息
export function getInfo() {
  return request({
    url: '/my/userinfo',
    method: 'get'
  })
}

// 重置密码
export function updatePassword(data) {
  return request({
    url: '/my/updatepwd',
    method: 'post',
    data: data
  })
}

// 更新用户信息
export function updateUserInfo(data) {
  return request({
    url: '/my/userinfo',
    method: 'post',
    data: data
  })
}
