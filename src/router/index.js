import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import { supabase } from '../lib/supabaseClient'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layouts/authLayout.vue'),
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/Login.vue'),
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('../pages/auth/Register.vue'),
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../layouts/adminLayout.vue'),
    children: [
      {
        name: 'dash',
        path: '',
        component: () => import('../pages/admin/Home.vue'),
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {

  if (to.fullPath.startsWith('/admin')) {
    const { data, error } = await supabase.auth.getSession();
    console.table(data,error)
    if (!data.session) {
      return { name: 'login' }
    }
  }
})

export default router;
