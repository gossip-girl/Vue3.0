import mainIndex from "@/components/mainIndex.vue";
// 除菜单之外的路由
const moduleRouter = [];
const otherRouter = [
  {
    path: "/mainIndex",
    component: mainIndex,
    meta: {
      title: "卓朗科技设备巡检管理系统"
    },
    children: [
      {
        path: "/userManage",
        component: () => import("@/components/pages/userManage.vue"),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: "/roleManage",
        component: () => import("@/components/pages/roleManage.vue"),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: "/menuManage",
        component: () => import("@/components/pages/menuManage.vue"),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  {
    path: "/",
    component: mainIndex,
    meta: {
      title: "卓朗科技设备巡检管理系统"
    },
    redirect: "/mainIndex"
  },
];
var allModules = otherRouter.concat(moduleRouter).concat({
  path: '/:pathMatch(.*)*',
  name: 'mainIndex', component: mainIndex
});

export default allModules;
