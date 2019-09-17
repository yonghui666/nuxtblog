<template>
  <div class="header">
    <div  class="logo">
      <img src="~/assets/images/logo2.png" alt="">
      <h2>创作吧</h2>
    </div>
    <div class="search hidden-xs-only">
      <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="rbox">
      <nuxt-link to="/user/login">
        <el-button type="primary">登录</el-button>
      </nuxt-link>
      <nuxt-link to="/user/register">
        <el-button type="primary">注册</el-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name:'Head',
  data(){
    return{
      search:''
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes logo{
  from{transform: rotate(0)}
  to{transform: rotate(360deg)}
}
.header{
  display: flex;
  justify-content: space-between;
  .logo{
    display: flex;
    img{
      width: 50px; margin-right: 5px;
      // animation: logo 3s linear infinite;
    }
    h2{
      font-weight: 888;
      font-size: 24px;
    }
  }
}
</style>