<script setup>
// 左侧边栏：承载递归菜单，固定宽度，内部纵向滚动
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()
const menuStore = useMenuStore()

// 当前展开的子菜单 id 集合（el-sub-menu 的 v-model）
const openedIds = ref([])

// 路由变化时：更新激活菜单 + 自动展开父级链路
watch(
  () => route.path,
  (path) => {
    menuStore.setActiveMenu(path)
    const chain = menuStore.findMenuChain(path)
    if (chain) {
      // 链路中除最后一层外的父级节点需要展开
      openedIds.value = chain.slice(0, -1).map((item) => item.id)
    }
  },
  { immediate: true }
)
</script>

<template>
  <aside
    class="app-sidebar"
    :class="{ collapsed: menuStore.sidebarCollapsed }"
  >
    <!-- 菜单区：内部纵向滚动 -->
    <div class="menu-scroll">
      <el-menu
        :default-active="menuStore.activeMenu"
        :collapse="menuStore.sidebarCollapsed"
        :collapse-transition="false"
        :unique-opened="true"
        v-model:openeds="openedIds"
        background-color="#1f2d3d"
        text-color="#a3b1c2"
        active-text-color="#ffffff"
      >
        <!-- 递归渲染菜单树（最深五层） -->
        <SidebarItem
          v-for="menu in menuStore.menuList"
          :key="menu.id"
          :menu="menu"
        />
      </el-menu>
    </div>
  </aside>
</template>

<style scoped>
/* 侧边栏：固定宽度，不受页面拉伸影响；高度自适应剩余空间 */
.app-sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0; /* 关键：固定宽度，不被横向拉伸 */
  background: var(--color-sidebar-bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.25s;
}

.app-sidebar.collapsed {
  width: var(--sidebar-collapse-width);
}

/* 菜单滚动容器：内容超出时仅在这里纵向滚动 */
.menu-scroll {
  flex: 1;
  min-height: 0; /* 关键：允许在 flex 容器内正确收缩出滚动 */
  overflow-y: auto;
  overflow-x: hidden;
}

/* 折叠态下隐藏滚动容器左右溢出（el-menu 弹出层除外） */
.app-sidebar.collapsed .menu-scroll {
  overflow: visible;
}

/* 覆写 Element Plus 菜单样式：选中项亮蓝高亮 */
:deep(.el-menu) {
  border-right: none;
}
:deep(.el-menu-item.is-active) {
  background: var(--color-menu-active) !important;
  color: #fff !important;
}
:deep(.el-menu-item:hover) {
  background: var(--color-menu-hover) !important;
}
:deep(.el-sub-menu__title:hover) {
  background: var(--color-menu-hover) !important;
}
</style>
