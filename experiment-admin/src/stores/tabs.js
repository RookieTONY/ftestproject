import { defineStore } from 'pinia'

/**
 * 历史标签页 store：管理顶部已打开的功能页标签
 */
export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabList: [] // 已打开标签列表 [{ path, title, affix }]
  }),
  getters: {
    /** 当前激活的标签 path */
    activeTab: (state) => state.tabList.find((t) => t.active)?.path || ''
  },
  actions: {
    /**
     * 添加标签（已存在则仅激活）
     * @param {Object} tab { path, title, affix } affix=true 时不可关闭
     */
    addTab(tab) {
      const exists = this.tabList.find((t) => t.path === tab.path)
      // 取消所有标签的激活态
      this.tabList.forEach((t) => (t.active = false))
      if (exists) {
        exists.active = true
      } else {
        this.tabList.push({ ...tab, active: true })
      }
    },
    /**
     * 关闭标签
     * @returns {string|null} 若关闭的是激活标签，返回需要跳转的相邻标签 path
     */
    removeTab(path) {
      const index = this.tabList.findIndex((t) => t.path === path)
      if (index === -1) return null
      const closed = this.tabList[index]
      if (closed.affix) return null // 固定标签不允许关闭

      const wasActive = closed.active
      this.tabList.splice(index, 1)

      // 若关闭的是当前激活标签，则激活相邻标签
      if (wasActive && this.tabList.length) {
        const next = this.tabList[Math.min(index, this.tabList.length - 1)]
        next.active = true
        return next.path
      }
      return null
    }
  }
})
