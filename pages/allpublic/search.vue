<template>
  <div class="search">
    <Artlist :artlist="artlist" >
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :total="pagenum">
      </el-pagination>
    </Artlist>
    <div v-if="isnull">
      <h2>抱歉没有找到结果哦！</h2>
    </div>
  </div>
</template>

<script>
import Artlist from '~/components/Artlist'

export default {
  data(){
    return{
      key: this.$route.query.key,
      artlist:[],
      pagenum:100,
      pagesize:6,
      isnull:0
    }
  },
  created(){
    if (process.browser) {
      this.search()
    }
  },
  methods:{
    async search(){
      let {code,artlist,pagenum} = await this.$axios.$get('/api/art/search',{params:{
        key:this.key,
        pagecurrent:1,
        pagesize:this.pagesize
      }})
      const loading = this.$loading({
          lock: true,
          text: '搜索中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      if(code==0){
        loading.close();
        this.$message.success('搜索成功')
        this.artlist = artlist
        this.pagenum=pagenum
      }else{
        this.isnull=1
        this.$message('抱歉没有找到结果哦')
      }
    },
    async handleCurrentChange(val){
      let {code,artlist,pagenum} = await this.$axios.$get('/api/art/search',{params:{
        name:this.$route.query.name,
        pagecurrent:val,
        pagesize:this.pagesize
      }})
      scrollTo(0,0);
      this.artlist=artlist
      this.pagenum=pagenum
    }
  },
  components:{Artlist}

}
</script>

<style lang="scss" scoped>
@import '~/assets/css/base.scss';

.search{
  margin: 0 8%;
  @extend .box;
  min-height: calc(100vh - 140px);
}
</style>