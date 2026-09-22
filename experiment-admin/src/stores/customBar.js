import { defineStore } from 'pinia'
import { getCustomBarList } from '@/api/mockApi'

/**
 * 顶部二级自定义功能栏 store
 * 用户可将侧边栏常用功能添加到此栏快速访问
 */
export const useCustomBarStore = defineStore('customBar', {
  state: () => ({
    barList: [] // 快捷功能列表 [{ id, title, path }]
  }),
  actions: {
    /** 拉取快捷栏配置 */
    async fetchCustomBarList() {
      const res = await getCustomBarList()
      this.barList = res.data
    },
    /** 添加功能到快捷栏（去重） */
    addBarItem(item) {
      if (!item.path || this.barList.some((b) => b.path === item.path)) return
      this.barList.push({ id: Date.now(), title: item.title, path: item.path })
    },
    /** 从快捷栏移除 */
    removeBarItem(path) {
      this.barList = this.barList.filter((b) => b.path !== path)
    }
  }
})
