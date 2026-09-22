# 实验性管理平台前端 Demo

基于 **Vue 3 + Vite + Vue Router + Pinia + Element Plus** 的实验性管理平台界面 Demo。

## 目录结构

```
experiment-admin/
├── index.html                          # HTML 入口
├── package.json                        # 依赖与脚本
├── vite.config.js                      # Vite 配置（@ 别名）
└── src/
    ├── main.js                         # 应用入口（注册 Pinia/Router/Element Plus）
    ├── App.vue                         # 根组件
    ├── api/
    │   └── mockApi.js                  # Mock API（用户/菜单/待办/公告/快捷栏）
    ├── router/
    │   └── index.js                    # 路由配置（Layout 父路由 + 动态功能页）
    ├── stores/
    │   ├── user.js                     # 用户信息
    │   ├── menu.js                     # 菜单树与激活状态
    │   ├── tabs.js                     # 历史标签页
    │   └── customBar.js                # 顶部二级自定义快捷栏
    ├── layout/
    │   ├── Layout.vue                  # 整体布局（四区域骨架）
    │   └── components/
    │       ├── AppHeader.vue           # 顶部一级导航栏
    │       ├── CustomBar.vue           # 顶部二级自定义功能栏
    │       ├── AppSidebar.vue          # 左侧边栏
    │       ├── SidebarItem.vue         # 递归菜单组件（支持无限层级）
    │       ├── HistoryTabs.vue         # 历史标签页
    │       └── MainContent.vue         # 右侧主工作区
    ├── views/
    │   ├── home/Home.vue               # 首页（我的待办 + 公告）
    │   └── function/FunctionPage.vue   # 通用功能页（动态路由复用）
    └── styles/
        └── index.css                   # 全局样式与主题变量
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 构建生产包
npm run build
```

## 核心特性

1. **四区域布局**：顶部一级导航 + 二级自定义功能栏 + 左侧边栏 + 右侧主工作区，整体高度 `100vh`，各区域内部独立滚动。
2. **五级嵌套菜单**：`SidebarItem.vue` 递归组件渲染菜单树，Mock 数据包含完整五层结构（系统管理 > 事件管理 > 事件配置 > 规则设置 > 高级参数）。
3. **侧边栏固定宽度**：固定 230px（折叠 64px），`flex-shrink: 0` 保证不受窗口拉伸影响，内容超出时内部纵向滚动。
4. **历史标签页**：点击菜单自动新增/激活标签，支持关闭与切换，首页为固定标签不可关闭。
5. **自定义快捷栏**：点击 `+` 可将当前激活菜单加入顶部快捷栏，快捷项支持点击跳转与移除，支持横向滚动。
6. **Pinia 状态管理**：用户信息、菜单、标签页、快捷栏分别独立 store 管理。
7. **Mock API 预留**：`src/api/mockApi.js` 提供 `getUserInfo / getMenuList / getTodoList / getAnnouncementList / getCustomBarList` 五个接口样例，可直接替换为 axios 真实请求。
