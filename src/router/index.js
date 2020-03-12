import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'index'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/front/Index.vue')
      },
      {
        path: '/donate',
        name: 'donate',
        component: () => import('@/views/front/Donate.vue')
      },
      {
        path: '/signin',
        name: 'signin',
        component: () => import('@/views/front/SignIn.vue')
      },
      {
        path: '/carts',
        name: 'carts',
        component: () => import('@/views/front/Carts.vue')
      },
      {
        path: '/checkout_1',
        name: 'checkout_1',
        component: () => import('@/views/front/Checkout_1.vue')
      },
      {
        path: '/checkout_2',
        name: 'checkout_2',
        component: () => import('@/views/front/Checkout_2.vue')
      },
      {
        path: '/checkout_3',
        name: 'checkout_3',
        component: () => import('@/views/front/Checkout_3.vue')
      },
      {
        path: '/checkout_4/:orderId',
        name: 'checkout_4',
        component: () => import('@/views/front/Checkout_4.vue')
      },
      {
        path: '/checkout_finish',
        name: 'checkoutFinish',
        component: () => import('@/views/front/CheckoutFinish.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard_product',
        name: 'dashboardProduct',
        component: () => import('@/views/back/DashboardProduct.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/simulate_cus_order',
        name: 'simulateCusOrder',
        component: () => import('@/views/back/SimulateCusOrder.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/dashboard_coupons',
        name: 'dashboardCoupons',
        component: () => import('@/views/back/DashboardCoupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/dashboard_order',
        name: 'dashboardOrder',
        component: () => import('@/views/back/DashboardOrder.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/simulate_cus_checkout/:orderId',
        name: 'simulateCusCheckout',
        component: () => import('@/views/back/SimulateCusCheckout.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
