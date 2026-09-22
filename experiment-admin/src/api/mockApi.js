/**
 * Mock API 样例
 * 实际项目中可替换为 axios 请求，这里使用 Promise + setTimeout 模拟网络延迟
 * 统一返回格式：{ code: 200, message: 'success', data: ... }
 */

/** 模拟网络延迟 */
const delay = (data, ms = 300) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ code: 200, message: 'success', data }), ms)
  )

/**
 * 获取当前用户信息（部门 + 姓名）
 */
export function getUserInfo() {
  return delay({
    department: 'A部门',
    name: 'CCB',
    avatar: '' // 头像为空时前端显示姓名首字符
  })
}

/**
 * 获取侧边栏菜单树（包含五级嵌套结构）
 * 层级示例：系统管理(1) > 事件管理(2) > 事件配置(3) > 规则设置(4) > 高级参数(5)
 */
export function getMenuList() {
  return delay([
    {
      id: 1,
      title: '首页',
      path: '/home',
      icon: 'HomeFilled'
    },
    {
      id: 100,
      title: '系统管理',
      icon: 'Setting',
      children: [
        {
          id: 110,
          title: '事件管理',
          icon: 'Bell',
          children: [
            {
              id: 111,
              title: '事件配置',
              icon: 'Document',
              children: [
                {
                  id: 1111,
                  title: '规则设置',
                  icon: 'SetUp',
                  children: [
                    { id: 11111, title: '基础规则', path: '/system/event/config/rule/base' },
                    { id: 11112, title: '高级参数', path: '/system/event/config/rule/advanced' }
                  ]
                },
                { id: 1112, title: '阈值管理', path: '/system/event/config/threshold' }
              ]
            },
            {
              id: 112,
              title: '事件查询',
              path: '/system/event/query'
            }
          ]
        },
        {
          id: 120,
          title: '设备管理',
          icon: 'Monitor',
          children: [
            { id: 121, title: '设备列表', path: '/system/device/list' },
            { id: 122, title: '设备分组', path: '/system/device/group' },
            {
              id: 123,
              title: '固件升级',
              icon: 'Upload',
              children: [
                { id: 1231, title: '升级任务', path: '/system/device/firmware/task' },
                { id: 1232, title: '升级记录', path: '/system/device/firmware/log' }
              ]
            }
          ]
        },
        {
          id: 130,
          title: '用户管理',
          icon: 'User',
          children: [
            { id: 131, title: '账号管理', path: '/system/user/account' },
            { id: 132, title: '角色管理', path: '/system/user/role' },
            { id: 133, title: '权限分配', path: '/system/user/permission' }
          ]
        }
      ]
    },
    {
      id: 200,
      title: '运营中心',
      icon: 'DataAnalysis',
      children: [
        {
          id: 210,
          title: '数据看板',
          icon: 'Odometer',
          children: [
            { id: 211, title: '实时监控', path: '/operation/board/realtime' },
            { id: 212, title: '统计分析', path: '/operation/board/statistics' }
          ]
        },
        {
          id: 220,
          title: '公告管理',
          icon: 'Notification',
          children: [
            { id: 221, title: '公告发布', path: '/operation/notice/publish' },
            { id: 222, title: '公告列表', path: '/operation/notice/list' }
          ]
        }
      ]
    },
    {
      id: 300,
      title: '日志审计',
      icon: 'Notebook',
      children: [
        { id: 310, title: '操作日志', path: '/audit/operation' },
        { id: 320, title: '登录日志', path: '/audit/login' }
      ]
    }
  ])
}

/**
 * 获取“我的待办”表格数据
 * name: 事项名称；takeover: 待接管数量；handle: 待处理数量
 * 数量为 0 时显示绿色，大于 0 时显示橙色
 */
export function getTodoList() {
  return delay([
    { id: 1, name: '待处理的', takeover: 0, handle: 1 },
    { id: 2, name: '待接管的', takeover: 1, handle: 0 },
    { id: 3, name: '待确认的', takeover: 0, handle: 0 },
    { id: 4, name: '待审批的', takeover: 2, handle: 3 }
  ])
}

/**
 * 获取公告列表
 */
export function getAnnouncementList() {
  return delay([
    { id: 1, title: '关于平台周末例行维护的通知', date: '2026-09-18' },
    { id: 2, title: '新版设备固件升级操作指引', date: '2026-09-15' },
    { id: 3, title: '九月份系统安全巡检结果公示', date: '2026-09-10' }
  ])
}

/**
 * 获取顶部二级自定义功能栏配置
 * userId 用于区分不同用户的快捷栏配置
 */
export function getCustomBarList(userId = 'default') {
  console.log('[mockApi] getCustomBarList, userId =', userId)
  return delay([
    { id: 1, title: '事件管理', path: '/system/event/query' },
    { id: 2, title: '设备管理', path: '/system/device/list' },
    { id: 3, title: '实时监控', path: '/operation/board/realtime' },
    { id: 4, title: '公告发布', path: '/operation/notice/publish' },
    { id: 5, title: '操作日志', path: '/audit/operation' }
  ])
}
