import { defineStore } from 'pinia'
import { getMenuList } from '@/api/mockApi'

/**
 * 侧边栏菜单 store：管理菜单树与当前激活菜单
 */
export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuList: [], // 完整菜单树（最深五层）
    activeMenu: '', // 当前激活菜单的 path
    sidebarCollapsed: false // 侧边栏是否折叠
  }),
  actions: {
    /** 拉取菜单树 */
    async fetchMenuList() {
      const res = await getMenuList()
      this.menuList = res.data
    },
    /** 设置当前激活菜单 */
    setActiveMenu(path) {
      this.activeMenu = path
    },
    /** 切换侧边栏折叠状态 */
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    /**
     * 根据 path 在菜单树中查找菜单节点（深度优先）
     * @returns {Object|null} 命中的节点，包含 title 等信息
     */
    findMenuByPath(path, list = this.menuList) {
      for (const item of list) {
        if (item.path === path) return item
        if (item.children?.length) {
          const found = this.findMenuByPath(path, item.children)
          if (found) return found
        }
      }
      return null
    },
    /**
     * 根据 path 查找完整的层级链路（用于自动展开父级菜单）
     * @returns {Array} 如 [系统管理, 事件管理, 事件配置]
     */
    findMenuChain(path, list = this.menuList, chain = []) {
      for (const item of list) {
        const current = [...chain, item]
        if (item.path === path) return current
        if (item.children?.length) {
          const found = this.findMenuChain(path, item.children, current)
          if (found) return found
        }
      }
      return null
    }
  }
})
