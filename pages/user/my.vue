<template>
  <div class="user">
    <section class="nav_left hidden-sm-and-up">
      <!-- 只在手机端显示的菜单导航 -->
      <el-drawer
        title="菜单栏"
        :visible.sync="drawer"
        :direction="direction"
        >
        <section >
          <div class="nav_list" v-for="item in navlist" :key="item.id" style="line-height:45px; text-align:center;">
            <nuxt-link :to="item.to" class="list" >{{item.msg}}</nuxt-link>
          </div>
        </section>
      </el-drawer>
    </section>

    <section class="nav_left hidden-xs-only">
      <div class="headimg"></div>
      <div :class="{nav_list:true,isclick:index==isclick}" v-for="(item,index) in navlist" :key="item.id" @click="flag(index)">
        <nuxt-link :to="item.to" class="list" >{{item.msg}}</nuxt-link>
      </div>
    </section>
    <div class="user_info">
      <el-button @click="drawer = true" type="primary" class="hidden-sm-and-up mymenu" icon="el-icon-more" circle size="mini"></el-button>
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
      isclick:-1,
      drawer: false,
      direction: 'ltr',
    }
  },
  methods:{
    flag(index){
      this.isclick=index
    },
  },
  mounted(){
    this.isclick = JSON.parse(localStorage.getItem('isclick'))
  },
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
    .mymenu{
      float: right;
    }
  }
}
</style>