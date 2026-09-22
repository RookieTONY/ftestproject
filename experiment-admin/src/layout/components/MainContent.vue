<script setup>
// 右侧主工作区：历史标签页 + 页面内容区
import { ref } from 'vue'
import HistoryTabs from './HistoryTabs.vue'

// 刷新 key：变化时强制重新渲染当前页面组件
const refreshKey = ref(0)
function refreshPage() {
  refreshKey.value++
}
</script>

<template>
  <div class="main-content">
    <!-- 顶部历史标签页：白色背景 -->
    <HistoryTabs />
    <!-- 页面内容区：浅灰背景，承载路由页面 -->
    <div class="page-container">
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.fullPath + '-' + refreshKey" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
/* 主工作区：占据剩余宽度，纵向 Flex */
.main-content {
  flex: 1;
  min-width: 0; /* 关键：允许在 flex 布局中收缩 */
  display: flex;
  flex-direction: column;
  background: var(--color-bg-page);
}

/* 页面内容区：自适应剩余高度，内部滚动 */
.page-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
}
</style>
