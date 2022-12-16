const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    title: "管理后台",
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: "首页"
      }
    },
    {
      path: "/code",
      name: "code",
      component: () => import("@/views/code/index.vue"),
      meta: {
        title: "卡密生成"
      }
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/code/index.vue"),
      meta: {
        title: "用户中心"
      }
    }
  ]
} as RouteConfigsTable;
