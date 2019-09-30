<template>
  <div class="header">
    <nuxt-link to="/" class="logo">
      <img src="~/assets/images/logo2.png" alt="">
      <h2 class="hidden-xs-only">创作吧</h2>
    </nuxt-link>
    <div class="search">
      <el-input placeholder="搜索一下" v-model="key" @keyup.enter.native="search" class="input-with-select">
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
            <nuxt-link to="/article/write">开始创作</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            退出登录
          </el-dropdown-item>
          <el-dropdown-item>
            <nuxt-link to="/user/my/myinfo">待增功能</nuxt-link>
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
    },
    async logout(){
      if(! (localStorage.getItem('loginUser') )) return this.$message('请先登录');
      let {code} = await this.$axios.$get('/api/logout')
      if(code==0){
        this.$message.success('退出成功')
        localStorage.removeItem('loginUser')
        this.$router.replace('/user/login')
      }
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

@media screen and (max-width: 700px){
  .search{
    width: 50%;
  }
  .rbox{
    width: 20%;
  }
}

</style>