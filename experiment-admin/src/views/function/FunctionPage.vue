<script setup>
// 通用功能页：所有动态菜单路由复用此组件，按当前路由展示对应标题
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'

const route = useRoute()
const menuStore = useMenuStore()

/** 当前页面对应的菜单标题（含层级链路） */
const menuChain = computed(() => {
  const chain = menuStore.findMenuChain(route.path)
  return chain ? chain.map((m) => m.title) : []
})
</script>

<template>
  <div class="function-page">
    <div class="page-card">
      <div class="page-header">
        <span class="page-title">{{ menuChain.at(-1) || '功能页面' }}</span>
        <el-tag size="small" type="info">Demo 页面</el-tag>
      </div>

      <!-- 面包屑：展示五级菜单层级链路 -->
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item v-for="(title, i) in menuChain" :key="i">
          {{ title }}
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-divider />

      <!-- 占位内容：实际项目中替换为各功能模块的具体实现 -->
      <el-empty description="此处为功能页面占位区，可按需扩展具体业务内容" />
    </div>
  </div>
</template>

<style scoped>
.function-page {
  width: 100%;
}

.page-card {
  background: var(--color-bg-white);
  border-radius: 4px;
  padding: 20px;
  min-height: calc(100vh - 180px);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.page-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
}

.page-breadcrumb {
  margin-bottom: 8px;
}
</style>
