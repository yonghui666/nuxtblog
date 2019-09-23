<template>
  <div class="user">
    <section class="nav_left">
      <div class="headimg"></div>
      <div class="nav_list" v-for="item in navlist" :key="item.id">
        <nuxt-link :to="item.to" class="list" >{{item.msg}}</nuxt-link>
      </div>
    </section>
    <div class="user_info">
      <nuxt-child/> 
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      navlist:[
        {id:0,msg:'个人资料',to:'/user/my/myinfo'},
        {id:1,msg:'我的文章',to:'/user/my/myarticle'},
        {id:2,msg:'我的草稿',to:'/user/my/mycaogao' },
        {id:3,msg:'我的评论',to:'/user/my/mycmt'},  
        {id:4,msg:'开始创作',to:'/article/write'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/base.scss';
.user{
  margin: 0 8%;
  @include flex();
  .nav_left{
    .nav_list{
      max-width: 300px;
      box-sizing: border-box;
      padding: 20px;
      &:hover{
        background-color: rgb(157, 204, 192);
      }
    }
  }
  .user_info{
    flex: 1;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 4px #fff;
  }
}
</style>