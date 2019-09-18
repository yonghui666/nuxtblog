<template>
  <div class="login">
    <el-input
      placeholder="请输入用户名"
      v-model="name"
      clearable>
    </el-input>
    <el-input placeholder="请输入密码" v-model="pass" ></el-input>
    <nuxt-link to="/user/register">没有账号？点我立即注册</nuxt-link>
    <div class="btn">
      <el-button type="primary" @click="login">登录</el-button>
      <nuxt-link to="/"><el-button type="primary">首页</el-button></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  data(){
    return{
      name:'',
      pass:''
    }
  },
  mounted(){
    let loginUser = JSON.parse(localStorage.getItem('loginUser'));
    if(loginUser){
      this.name=loginUser.name
      this.pass=loginUser.pass
    }
    // this.login()
  },
  methods:{
    async login(){
      if(this.name==''||this.pass==''){
        this.$message.error('请填写账号或密码');
        return 
      }
      let {code} = await this.$axios.$post('/api/user/login',{
        name:this.name.trim(),
        pass:this.pass.trim()  
      })
      if(code==0){
        localStorage.setItem('loginUser',JSON.stringify({name:this.name,pass:this.pass}) )
        const loading = this.$loading({
          lock: true,
          text: '登录中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 500);
        this.$message('登录成功');
        this.$router.push('/')
      }else{
        this.$message('登录失败！请重试');
      }
    },
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