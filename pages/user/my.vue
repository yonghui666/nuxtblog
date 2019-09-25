<template>
  <div class="user">
    <section class="nav_left">
      <div class="headimg"></div>
      <div :class="{nav_list:true,isclick:index==isclick}" v-for="(item,index) in navlist" :key="item.id" @click="flag(index)">
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
      ],
      isclick:-1
    }
  },
  methods:{
    flag(index){
      this.isclick=index
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
      >a{display: block;}
      min-width: 150px;
      line-height: 55px;
      text-align: center;
      margin-bottom: 10px;
      &:hover{
        transition: all .5s;
        background-color:#ddd;
      }
    }
    .isclick{
      background-color: #ddd;
    }
  }
  .user_info{
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 8px #ddd;
    min-height: 666px;
  }
}
</style>