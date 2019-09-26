<template>
  <div class="header">
    <nuxt-link to="/" class="logo">
      <img src="~/assets/images/logo2.png" alt="">
      <h2>创作吧</h2>
    </nuxt-link>
    <div class="search hidden-xs-only">
      <el-input placeholder="请输入内容" v-model="key" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="rbox" v-if="this.$store.state.islogin">
      <nuxt-link to="/user/login">
        <el-button type="primary">登录</el-button>
      </nuxt-link>
      <nuxt-link to="/user/register">
        <el-button type="primary">注册</el-button>
      </nuxt-link>
    </div>
    <div class="rbox" v-else>
      <el-dropdown trigger="click">
        <el-button type="primary">
          我的<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <nuxt-link to="/user/my/myinfo">个人资料</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <nuxt-link to="/user/my/myarticle">我的文章</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <nuxt-link to="/user/my/mycmt">我的评论</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <nuxt-link to="/user/my/myinfo">待做功能</nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name:'Head',
  data(){
    return{
      key:''
    }
  },
  mounted(){
    if(localStorage.getItem('loginUser')){
      this.$store.commit('login',0)
    }
  },
  methods:{
    search(){
      //点击搜索跳转到新的标签页
      let newpage = this.$router.resolve({
        path:'/allpublic/search',
        query:{
          key:this.key
        }
      })
      window.open(newpage.href, '_blank');
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
      color: #000;
    }
  }
}
</style>