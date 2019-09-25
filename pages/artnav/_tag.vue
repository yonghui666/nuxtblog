<template>
  <section class="artlist">
    <div v-if="artlist">
      <nuxt-link  class="list_item" 
        :to="{name:'allpublic-artinfo',query:{id:item.id}}"
        v-for="item in artlist" :key="item.id"
      >
        <h2>标题：{{item.title}}  <el-tag type="success">{{item.tag}}</el-tag></h2>
        <p class="zhaiyao">{{item.zhaiyao}}</p>
        <p class="time">发表时间：{{item.time}}</p>
        <hr>
      </nuxt-link>

      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :total="pagenum">
      </el-pagination>
    </div>
    <div v-else class="isnullbox">
      <h2>未找到相关结果哦。。。</h2>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      // artlist:[]
      pagenum:1000,
      pagesize:6
    }
  },
  async asyncData({$axios,params}){
    try {
      let {code,msg,pagenum} = await $axios.$get('/api/art/search',{params:{
        tag:params.tag,
        pagecurrent:1,
        pagesize:6
      }})
      return { artlist: msg,pagenum}
    } catch (error) {
      console.log(error);
    }
  },
  // created(){
  //   this.getArtlist()
  // },
  methods:{
    // async getArtlist(){
    //   let {code, msg} = await this.$axios.$get('/api/art/search',{
    //     tag:this.$route.params.tag,
    //     pagecurrent:1, pagesize:3
    //   })
    //   this.artlist=msg
    // },
    async handleCurrentChange(val){
      let {code,msg,pagenum} = await this.$axios.$get('/api/art/search',{params:{
        tag:this.$route.params.tag,
        pagecurrent:val,
        pagesize:this.pagesize
      }})
      this.artlist=msg
      this.pagenum=pagenum
    }
  }
}
</script>

<style lang="scss" scoped>
.list_item{
  display: block;
  padding: 20px;
  box-sizing: border-box;
  &:hover{background-color: #eee;}
  >h2{
    font-size: 24px; font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
  .zhaiyao , .time{
    color: gray;
  }
  .zhaiyao{
    margin: 10px 0; text-indent: 2em;
    // 文本超过父容器自动换行
    width: 100%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
  }
  .time{font-size: small; padding: 0 0 20px 0;}
  hr{
    background-color: #eee;
  }
}

.isnullbox{
  >h2{
    font-size: 20px;

  }

}
</style>