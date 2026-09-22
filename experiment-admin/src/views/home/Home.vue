<script setup>
// 首页面板：左侧“我的待办” + 右侧“公告”
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getTodoList, getAnnouncementList } from '@/api/mockApi'

const loading = ref(false)
const todoList = ref([])
const announcementList = ref([])
const announcementLoading = ref(false)

// 拉取待办数据
async function fetchTodoList() {
  loading.value = true
  try {
    const res = await getTodoList()
    todoList.value = res.data
  } finally {
    loading.value = false
  }
}

// 拉取公告数据
async function fetchAnnouncements() {
  announcementLoading.value = true
  try {
    const res = await getAnnouncementList()
    announcementList.value = res.data
  } finally {
    announcementLoading.value = false
  }
}

/** 刷新待办 */
const handleRefreshTodo = async () => {
  await fetchTodoList()
  ElMessage.success('待办已刷新')
}

/** 刷新公告 */
const handleRefreshNotice = () => {
  fetchAnnouncements()
  ElMessage.success('公告已刷新')
}

/** 查看更多公告 */
const handleMoreNotice = () => ElMessage.info('更多公告（Demo 占位）')

/** 查看公告详情 */
const viewNotice = () => ElMessage.info('查看公告详情（Demo 占位）')

onMounted(() => {
  fetchTodoList()
  fetchAnnouncements()
})
</script>

<template>
  <div class="home-panel">
    <!-- 左侧面板：我的待办（约 60%） -->
    <div class="panel todo-panel">
      <div class="panel-header">
        <span class="panel-title">我的待办</span>
        <div class="panel-actions">
          <el-tooltip content="刷新" placement="top">
            <el-icon class="action-icon" @click="handleRefreshTodo"><Refresh /></el-icon>
          </el-tooltip>
        </div>
      </div>

      <!-- 待办表格：表头为“待接管”、“待处理” -->
      <el-table :data="todoList" v-loading="loading" size="default">
        <el-table-column label="待接管" min-width="200">
          <template #default="{ row }">
            <div class="todo-cell">
              <!-- 蓝色小图标 + 事项文字 -->
              <span class="blue-dot"></span>
              <span class="todo-name">{{ row.name }}</span>
              <!-- 数字：0 绿色，>0 橙色 -->
              <span :class="['count-num', row.takeover > 0 ? 'orange' : 'green']">
                {{ row.takeover }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="待处理" min-width="160">
          <template #default="{ row }">
            <span :class="['count-num', row.handle > 0 ? 'orange' : 'green']">
              {{ row.handle }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 右侧面板：公告（约 40%） -->
    <div class="panel notice-panel">
      <div class="panel-header">
        <span class="panel-title">公告</span>
        <div class="panel-actions">
          <el-tooltip content="刷新" placement="top">
            <el-icon class="action-icon" @click="handleRefreshNotice"><Refresh /></el-icon>
          </el-tooltip>
          <el-tooltip content="更多" placement="top">
            <el-icon class="action-icon" @click="handleMoreNotice"><More /></el-icon>
          </el-tooltip>
        </div>
      </div>

      <!-- 公告列表 -->
      <div v-if="announcementList.length" v-loading="announcementLoading" class="notice-list">
        <div
          v-for="item in announcementList"
          :key="item.id"
          class="notice-item"
          @click="viewNotice"
        >
          <div class="notice-title">{{ item.title }}</div>
          <div class="notice-date">{{ item.date }}</div>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty v-else description="暂无公告" :image-size="80" />
    </div>
  </div>
</template>

<style scoped>
/* 首页面板：横向 Flex，左右分栏 */
.home-panel {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

/* 通用面板样式：白色卡片 */
.panel {
  background: var(--color-bg-white);
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

/* 左右宽度约 60% / 40% */
.todo-panel {
  flex: 0 0 60%;
}
.notice-panel {
  flex: 1;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-icon {
  font-size: 16px;
  color: #909399;
  cursor: pointer;
}
.action-icon:hover {
  color: var(--color-menu-active);
}

/* 待办单元格：蓝色小图标 + 文字 + 数字 */
.todo-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.blue-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--color-menu-active);
  flex-shrink: 0;
}
.todo-name {
  flex: 1;
}

/* 数字颜色：0 绿色，>0 橙色 */
.count-num {
  font-weight: 600;
}
.count-num.green {
  color: #67c23a;
}
.count-num.orange {
  color: #e6a23c;
}

/* 公告列表 */
.notice-list {
  display: flex;
  flex-direction: column;
}
.notice-item {
  padding: 10px 4px;
  border-bottom: 1px dashed #ebeef5;
  cursor: pointer;
}
.notice-item:hover .notice-title {
  color: var(--color-menu-active);
}
.notice-title {
  font-size: 14px;
  color: #303133;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.notice-date {
  font-size: 12px;
  color: #909399;
}
</style>
