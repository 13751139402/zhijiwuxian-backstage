/*
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime : 2019-12-30 10:48:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\14374\Documents\GitHub\vue-admit-template\src\store\getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  server: state => state.app.server,
  account: state => state.user.account,
  name: state => state.user.name,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  token: state => state.user.token // 权限角色

}
export default getters
