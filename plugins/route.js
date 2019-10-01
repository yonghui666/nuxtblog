export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
  let isClient = process.client
  if (isClient) {
    //用户信息界面保留选中标签的高亮样式
    switch (to.path) {
      case '/user/my/myinfo':
        localStorage.setItem('isclick',0)
        break;
      case '/user/my/myarticle':
        localStorage.setItem('isclick',1)
        break;
      case '/user/my/mycaogao':
        localStorage.setItem('isclick',2)
        break;
      case '/user/my/mycmt':
        localStorage.setItem('isclick',3)
        break;
      default:
        break;
    }
  }
  next()
  })
}