<script setup>
// 历史标签页：记录打开过的功能页，支持快速切换与关闭
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const menuStore = useMenuStore()

// 路由变化时同步标签：首页固定，功能页取菜单标题
watch(
  () => route.path,
  (path) => {
    if (path === '/home') {
      tabsStore.addTab({ path, title: '首页', affix: true })
      return
    }
    const menu = menuStore.findMenuByPath(path)
    tabsStore.addTab({ path, title: menu?.title || '未知页面' })
  },
  { immediate: true }
)

/** 切换标签 */
const handleTabClick = (tab) => router.push(tab.path)

/** 关闭标签：若关闭激活标签则跳转相邻标签 */
const handleClose = async (path) => {
  const nextPath = tabsStore.removeTab(path)
  if (nextPath && nextPath !== route.path) {
    await router.push(nextPath)
  }
}
</script>

<template>
  <div class="history-tabs">
    <div class="tabs-scroll">
      <div
        v-for="tab in tabsStore.tabList"
        :key="tab.path"
        class="tab-item"
        :class="{ active: tab.active }"
        @click="handleTabClick(tab)"
      >
        <span>{{ tab.title }}</span>
        <!-- 关闭按钮：affix 标签不显示 -->
        <el-icon
          v-if="!tab.affix"
          class="tab-close"
          @click.stop="handleClose(tab.path)"
        >
          <Close />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 标签栏：白色背景，位于工作区最上方 */
.history-tabs {
  flex-shrink: 0;
  background: var(--color-bg-white);
  border-bottom: 1px solid #e4e7ed;
  padding: 6px 12px 0;
}

.tabs-scroll {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;
}

/* 单个标签 */
.tab-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  background: #f5f7fa;
  color: #606266;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s;
  user-select: none;
}
.tab-item:hover {
  color: var(--color-menu-active);
}
.tab-item.active {
  background: #fff;
  color: var(--color-menu-active);
  font-weight: 600;
  border-color: #e4e7ed;
  position: relative;
}
/* 激活标签底部的蓝色指示条 */
.tab-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--color-menu-active);
}

.tab-close {
  font-size: 12px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tab-close:hover {
  background: #d0d3da;
  color: #fff;
}
</style>
