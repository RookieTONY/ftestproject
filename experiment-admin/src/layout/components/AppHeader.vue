<script setup>
// 顶部一级导航栏
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

/** 点击平台名称回到首页 */
const goHome = () => router.push('/home')

/** 访问历史 */
const showHistory = () => ElMessage.info('访问历史（Demo 占位）')

/** 通知中心 */
const showNotification = () => ElMessage.info('通知中心（Demo 占位）')

/** 帮助中心 */
const showHelp = () => ElMessage.info('帮助中心（Demo 占位）')

/** 个人下拉菜单命令 */
const handleUserCommand = (command) => {
  const actions = {
    profile: () => ElMessage.info('个人中心（Demo 占位）'),
    logout: () => ElMessage.info('退出登录（Demo 占位）')
  }
  actions[command]?.()
}
</script>

<template>
  <header class="app-header">
    <!-- 左侧：平台名称 + 折叠按钮 -->
    <div class="header-left">
      <el-icon class="collapse-btn" @click="menuStore.toggleSidebar()">
        <Fold v-if="!menuStore.sidebarCollapsed" />
        <Expand v-else />
      </el-icon>
      <span class="platform-title" @click="goHome">管理</span>
    </div>

    <!-- 右侧：功能项 -->
    <div class="header-right">
      <!-- 访问历史 -->
      <el-tooltip content="访问历史" placement="bottom">
        <el-icon class="header-icon" @click="showHistory"><Clock /></el-icon>
      </el-tooltip>

      <!-- 通知（带小红点） -->
      <el-tooltip content="通知" placement="bottom">
        <el-badge :value="3" :offset="[-2, 4]" class="notice-badge">
          <el-icon class="header-icon" @click="showNotification"><Bell /></el-icon>
        </el-badge>
      </el-tooltip>

      <!-- 帮助 -->
      <el-tooltip content="帮助" placement="bottom">
        <el-icon class="header-icon" @click="showHelp"><QuestionFilled /></el-icon>
      </el-tooltip>

      <!-- 个人展示区：部门-姓名 + 头像 -->
      <el-dropdown trigger="click" @command="handleUserCommand">
        <div class="user-area">
          <span class="user-name">{{ userStore.displayName }}</span>
          <el-avatar v-if="userStore.avatar" :src="userStore.avatar" :size="30" />
          <el-avatar v-else :size="30" class="user-avatar">
            {{ userStore.name.charAt(0) }}
          </el-avatar>
          <el-icon class="user-arrow"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style scoped>
/* 顶部栏：深色背景，固定高度 60px */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 20px;
  background: var(--color-header-bg);
  color: var(--color-text-main);
  flex-shrink: 0; /* 不随窗口拉伸压缩 */
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  color: var(--color-text-sub);
}
.collapse-btn:hover {
  color: #fff;
}

/* 平台名称：白色加粗 */
.platform-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  letter-spacing: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 22px;
}

.header-icon {
  font-size: 18px;
  color: var(--color-text-sub);
  cursor: pointer;
}
.header-icon:hover {
  color: #fff;
}

/* 个人展示区 */
.user-area {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--color-text-main);
}
.user-name {
  font-size: 14px;
}
.user-avatar {
  background: var(--color-menu-active);
  font-size: 14px;
  font-weight: 600;
}
.user-arrow {
  font-size: 12px;
  color: var(--color-text-sub);
}
</style>
