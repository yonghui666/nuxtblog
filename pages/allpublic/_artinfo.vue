<template>
  <div class="info">
    <div class="sidebar hidden-sm-and-down">
      <div class="writerinfo">
        <h2>作者信息</h2>
        <hr>
        <div class="headimg"><img :src="artinfo.headimg || '' " alt=""></div>
        <p>作者：{{artinfo.user_name}}</p>
        <p>签名：{{artinfo.qianming}}</p>
        <nuxt-link :to="{path:'allpublic/userhomepage',query:{name:artinfo.user_name}}">-->点击访问TA的主页</nuxt-link>
      </div>
    </div>
    <section class="articleinfo">
      <h2>{{artinfo.title}}</h2>
      <el-tag>{{artinfo.tag}}</el-tag>
      <nuxt-link :to="{path:'allpublic/userhomepage',query:{name:artinfo.user_name}}">-->点击访问TA的主页</nuxt-link>
      <p class="time">发表时间：{{artinfo.time}}</p>
      <div v-html="artinfo.content" class="content" id="articlecontent" ></div>
      <hr style="margin:20px 0" ref="scrolltop">
      <Comment :cmtlist="cmtlist" :artid="artid">
        <el-pagination
          background
          layout="prev, pager, next"
          :hide-on-single-page="pagenum<11"
          :pager-count="5"
          @current-change="handleCurrentChange"
          :total="pagenum">
        </el-pagination>
      </Comment>
    </section>
  </div>
</template>

<script>
import Comment from '~/components/Comment'

export default {
  async asyncData({$axios,query}){
    let {code,msg} = await $axios.$get('/api/art/artinfo',{params:{id:query.id}})
    return { artinfo: msg}
  },
  components:{Comment},
  data(){
    return{
      cmtlist:[],
      artid:Number(this.$route.query.id),
      pagenum:100,
    }
  },
  mounted(){
    this.getComment()
  },
  methods:{
    async getComment(){
      let {code,cmtlist,pagenum} = await this.$axios.$get('/api/cmt/list',{params:{
        pagecurrent:1,
        artid:this.artid
      }});
      this.cmtlist=cmtlist
      this.pagenum=pagenum
    },
    async handleCurrentChange(val){
      let {code,cmtlist,pagenum} = await this.$axios.$get('/api/cmt/list',{params:{
        artid:this.artid,
        pagecurrent:val,
      }})
      scrollTo(0,this.$refs.scrolltop.offsetTop);
      this.cmtlist=cmtlist
      this.pagenum=pagenum
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/base.scss';
@import '~/assets/css/md.scss';

.info{
  margin: 0 8%;
  min-height: 800px;
  display: flex;
  a{color: blue}
  .sidebar{
    margin-right: 20px;
    .writerinfo{
      @extend .box;
      width: 300px;
      text-align: center;
      >h2{
        font-size: 18px;
        font-weight: 666px;
      }
      hr{margin: 15px 0;}
      p{margin: 10px 0;}
      
      .headimg{
        border-radius: 50%;
        margin: 0 auto;
        width: 200px;
        height: 200px;
        >img{
          width: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  .articleinfo{
    flex: 1;
    @extend .box;
    h2{
      text-align: center;
      font-size: 24px; font-weight: 444px;
    }
    .time{font-size: small; color: gray; margin: 10px 0;}
    .content{
      text-indent: 2em;
      min-height: 500px;
    }
  }
}

</style>