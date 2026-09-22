import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'

/**
 * 路由配置
 * 使用 Layout 作为父路由，功能页面渲染在其 <router-view /> 中
 * 动态功能页统一指向 FunctionPage 组件，通过 meta.title 展示菜单名
 */
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页', affix: true } // affix: 固定标签，不可关闭
      },
      // 动态功能页：所有菜单路由复用同一个组件，按 meta 区分内容
      {
        path: ':pathMatch(.*)*',
        name: 'FunctionPage',
        component: () => import('@/views/function/FunctionPage.vue'),
        meta: { dynamic: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
