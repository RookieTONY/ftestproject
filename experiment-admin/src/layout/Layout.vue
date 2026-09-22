<script setup>
// 整体布局：Header + 二级自定义功能栏 + (Sidebar + 主工作区)
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import CustomBar from './components/CustomBar.vue'
import AppSidebar from './components/AppSidebar.vue'
import MainContent from './components/MainContent.vue'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { useCustomBarStore } from '@/stores/customBar'

const userStore = useUserStore()
const menuStore = useMenuStore()
const customBarStore = useCustomBarStore()

// 初始化：拉取用户信息、菜单、快捷栏配置
onMounted(() => {
  userStore.fetchUserInfo()
  menuStore.fetchMenuList()
  customBarStore.fetchCustomBarList()
})
</script>

<template>
  <div class="app-layout">
    <!-- 顶部一级导航栏 -->
    <AppHeader />
    <!-- 顶部二级自定义功能栏 -->
    <CustomBar />
    <!-- 下方区域：侧边栏 + 主工作区 -->
    <div class="app-body">
      <AppSidebar />
      <MainContent />
    </div>
  </div>
</template>

<style scoped>
/* 整体布局：纵向 Flex，总高度 100vh */
.app-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 防止页面整体滚动，滚动交给内部区域 */
}

/* 下方区域：横向 Flex，占据 Header 与功能栏之外的剩余高度 */
.app-body {
  display: flex;
  flex: 1;
  min-height: 0; /* 关键：允许子元素正确收缩，内部滚动不撑破布局 */
}
</style>
