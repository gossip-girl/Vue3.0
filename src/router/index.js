
import { createWebHistory, createRouter } from 'vue-router'
import routes from "./routes.js";

const routerHistory = createWebHistory('base')
const router = createRouter({
  history: routerHistory,
  routes: routes
})


// export function resetRouter () {
//   const newRouter = createRouterNew();
//   router.matcher = newRouter.matcher; // reset router
//   router.replace("/login");
// }
// router.beforeEach((to, from, next) => {
//   let token = getToken();
//   if (to.meta.title) {
//     document.title = "卓朗科技设备巡检管理系统-" + to.meta.title;
//   } else {
//     document.title = "卓朗科技设备巡检管理系统";
//   }
//   // // 无token直接跳转登录页
//   if (!token && to.path != "/login") {
//     return next("/login");
//   }

//   // 路由验证权限
//   if (!judgeLink(to, next)) {
//     return;
//   }

//   next();
// });

// const routerPush = Router.prototype.push;
// Router.prototype.push = function push (location) {
//   return routerPush.call(this, location).catch((error) => error);
// };

export default router;
