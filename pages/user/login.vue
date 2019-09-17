<template>
  <div class="login">
    <el-input
      placeholder="请输入用户名"
      v-model="input"
      clearable>
    </el-input>
    <el-input placeholder="请输入密码" ></el-input>
    <nuxt-link to="/user/register">没有账号？点我立即注册</nuxt-link>
    <div class="btn">
      <el-button type="primary">登录</el-button>
      <nuxt-link to="/"><el-button type="primary">首页</el-button></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  data(){
    return{
      input:''
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/base.scss';
.login{
  min-width: 400px;
  max-width: 666px;
  min-height: 300px;
  background-color: rgb(171, 235, 203);
  box-shadow: 0 0 8px green;
  position:absolute;
  left:50%;    /* 定位父级的50% */
  top:50%;
  transform: translate(-50%,-50%); 
  padding: 45px; 
  box-sizing: border-box;
  @include flex(column);
  justify-content: space-around;
  
}
</style>