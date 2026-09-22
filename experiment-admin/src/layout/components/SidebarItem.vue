<script setup>
/**
 * 递归菜单组件：实现菜单树的无限极渲染（Demo 数据最深五层）
 * - 有 children 时渲染 el-sub-menu，并递归渲染自身
 * - 无 children 时渲染 el-menu-item 并跳转路由
 */
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  /** 当前菜单节点：{ id, title, path, icon, children } */
  menu: { type: Object, required: true }
})

const router = useRouter()

/** 是否有子菜单 */
const hasChildren = computed(() => !!props.menu.children?.length)

/** 图标名对应的组件（全局注册的 Element Plus 图标） */
const iconComp = computed(() => props.menu.icon)

/** 点击叶子菜单跳转 */
const handleNavigate = () => {
  if (props.menu.path) router.push(props.menu.path)
}
</script>

<template>
  <!-- 分支节点：渲染子菜单并递归 -->
  <el-sub-menu v-if="hasChildren" :index="String(menu.id)">
    <template #title>
      <el-icon v-if="menu.icon"><component :is="iconComp" /></el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <SidebarItem
      v-for="child in menu.children"
      :key="child.id"
      :menu="child"
    />
  </el-sub-menu>

  <!-- 叶子节点：可跳转的菜单项 -->
  <el-menu-item v-else :index="menu.path || String(menu.id)" @click="handleNavigate">
    <el-icon v-if="menu.icon"><component :is="iconComp" /></el-icon>
    <template #title>
      <span>{{ menu.title }}</span>
    </template>
  </el-menu-item>
</template>
