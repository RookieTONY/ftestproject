import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/mockApi'

/**
 * 用户信息 store
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    department: '', // 部门
    name: '', // 姓名
    avatar: '' // 头像地址
  }),
  getters: {
    /** 展示文案：如 “A部门-CCB” */
    displayName: (state) =>
      state.department && state.name ? `${state.department}-${state.name}` : '未登录'
  },
  actions: {
    /** 拉取用户信息 */
    async fetchUserInfo() {
      const res = await getUserInfo()
      const { department, name, avatar } = res.data
      this.department = department
      this.name = name
      this.avatar = avatar
    }
  }
})
