// export default function (ctx) {
  // console.log(ctx);
export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('--->>>---Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  // $axios.defaults.baseURL = 'http://localhost:3333'

  $axios.interceptors.response.use(function (response) {
    // 用户信息是否超时，重定向到登录页面 
    if (response.data.islogin == '请登录') {
      redirect('/user/login')
    }
    return response
  }, function (error) {
    // Do something with response error 
    return Promise.reject(error)
  })


  // $axios.interceptors.request.use(
  //   config => {
  //     // 获取token，配置请求头
  //     // const TOKEN = localStorage.getItem('Token')
  //     // 演示的token（注意配置请求头，需要后端做cros跨域处理，我这里自己前端配的跨域）
  //     const TOKEN = '1fd399bdd9774831baf555ae5979c66b'
  //     if(TOKEN){
  //       // 配置请求头 token
  //       config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  //       config.headers['Authorization'] = TOKEN;
  //   }
  //     return config;
  //   },
  //   error => {
  //     // 对请求错误做些什么，处理这个错误

  //     // 可以直接处理或者展示出去,toast show()
  //     console.warn(error);

  //     return Promise.reject(error);
  //   }
  // );

}