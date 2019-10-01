<template>
  <div class="userhomepage">
    <div class="homepage">
      <div class="userinfo">
        <img :src="userinfo.headimg" alt="">
        <p>作者：{{userinfo.name}}</p>
        <p>签名：{{userinfo.qianming}}</p>
      </div>
      <div ref="scrolltop" id="toper" ></div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="文章" name="article">
          <Artlist :artlist="artlist">
            <el-pagination
              background
              layout="prev, pager, next"
              :pager-count="5"
              :page-size="pagesize"
              :hide-on-single-page="pagenum<=pagesize"
              @current-change="handleCurrentChange"
              :total="pagenum">
            </el-pagination>
          </Artlist>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">评论</el-tab-pane>
        <el-tab-pane label="简介" name="third">TA暂无简介哦</el-tab-pane>
        <el-tab-pane label="待开发" name="fourth">待开发</el-tab-pane>
      </el-tabs>
    </div>
    <div class="rightbox hidden-sm-and-down">
      待开发模块
    </div>
  </div>
</template>

<script>
import Artlist from '~/components/Artlist'

export default {
  async asyncData({$axios,query}){
    let {userinfo} = await $axios.$get('/api/user/home',{params:{
      name:query.name
    }})
    let {code,msg,pagenum,artlist} = await $axios.$get('/api/art/search',{params:{
        name:query.name,
        pagecurrent:1,
        pagesize:6
      }})
    return {userinfo,artlist,pagenum}
  },
  data(){
    return{
      activeName: 'article',
      pagenum:100,
      pagesize:6,
    }
  },
  methods:{
    async handleCurrentChange(val){
      
      let {code,artlist,pagenum} = await this.$axios.$get('/api/art/search',{params:{
        name:this.$route.query.name,
        pagecurrent:val,
        pagesize:this.pagesize
      }})
      scrollTo(0,this.$refs.scrolltop.offsetTop);
      this.artlist=artlist
      this.pagenum=pagenum
      
    }
  },
  components:{Artlist}
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/base.scss';
  .userhomepage{
    margin: 0 8%;
    display: flex;
    .homepage{
      flex: 1;
      @extend .box;
      min-height: 666px;
      .userinfo{
        text-align: center;
        >img{
          width: 150px;
          border-radius: 50%;
        }
        p{
          line-height: 30px;
        }
      }
    }

    .rightbox{
      width: 300px;
      margin-left: 20px;  
      @extend .box;
    }
  }
</style>
<style>
  .el-tabs__item{font-size: 20px} 
</style>