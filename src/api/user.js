import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 查询用户列表
export function getUsers(params) {
  return request({
    url: '/api/usersList',
    method: 'get',
    params: params
  })
}

// 用户注册
export function reguser(data) {
  return request({
    url: '/api/reguser',
    method: 'post',
    data: data
  })
}
