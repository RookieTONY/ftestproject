<script setup>
// 顶部二级自定义功能栏：用户常用功能的快捷访问区
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useCustomBarStore } from '@/stores/customBar'
import { useMenuStore } from '@/stores/menu'

const router = useRouter()
const customBarStore = useCustomBarStore()
const menuStore = useMenuStore()

/** 点击快捷项跳转 */
const handleItemClick = (item) => router.push(item.path)

/** 从快捷栏移除 */
const handleRemove = (item) => {
  customBarStore.removeBarItem(item.path)
  ElMessage.success(`已从快捷栏移除「${item.title}」`)
}

/** 将当前激活菜单加入快捷栏 */
const handleAddCurrent = () => {
  const path = menuStore.activeMenu
  if (!path || path === '/home') {
    ElMessage.warning('请先在侧边栏选择一个功能菜单')
    return
  }
  const menu = menuStore.findMenuByPath(path)
  if (menu) {
    customBarStore.addBarItem({ title: menu.title, path: menu.path })
    ElMessage.success(`已将「${menu.title}」加入快捷栏`)
  }
}
</script>

<template>
  <div class="custom-bar">
    <div class="bar-label">
      <el-icon><Star /></el-icon>
      <span>常用</span>
    </div>

    <!-- 快捷功能标签：横向滚动 -->
    <div class="bar-scroll">
      <div
        v-for="item in customBarStore.barList"
        :key="item.id"
        class="bar-tag"
        :class="{ active: menuStore.activeMenu === item.path }"
        @click="handleItemClick(item)"
      >
        <span>{{ item.title }}</span>
        <el-icon class="tag-close" @click.stop="handleRemove(item)"><Close /></el-icon>
      </div>
      <div v-if="!customBarStore.barList.length" class="bar-empty">
        暂无常用功能，点击右侧 + 添加
      </div>
    </div>

    <!-- 添加按钮：将当前激活菜单加入快捷栏 -->
    <el-tooltip content="将当前菜单加入快捷栏" placement="bottom">
      <el-icon class="bar-add" @click="handleAddCurrent"><CirclePlus /></el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped>
/* 二级功能栏：比 Header 更深的背景色 */
.custom-bar {
  display: flex;
  align-items: center;
  height: var(--custom-bar-height);
  padding: 0 12px;
  background: var(--color-header-bg-deep);
  color: var(--color-text-sub);
  flex-shrink: 0;
  gap: 8px;
}

.bar-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  flex-shrink: 0;
  padding-right: 4px;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  margin-right: 4px;
}

/* 横向滚动容器 */
.bar-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 4px 0;
}

/* 快捷标签 */
.bar-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.bar-tag:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.bar-tag.active {
  background: var(--color-menu-active);
  color: #fff;
}

.tag-close {
  font-size: 12px;
  border-radius: 50%;
}
.tag-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.bar-empty {
  font-size: 12px;
  opacity: 0.6;
}

.bar-add {
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 4px;
}
.bar-add:hover {
  color: #fff;
}
</style>
