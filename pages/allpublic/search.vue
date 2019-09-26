<template>
  <div class="search">
    <Artlist :artlist="artlist" v-if="isnull">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :total="pagenum">
      </el-pagination>
    </Artlist>
    <div v-else>
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
      if(code==0){
        this.isnull=1
        this.$message.success('搜索成功')
        this.artlist = artlist
        this.pagenum=pagenum
      }else{
        this.$message('抱歉没有找到结果哦')
      }
    },
    async handleCurrentChange(val){
      let {code,artlist,pagenum} = await this.$axios.$get('/api/art/search',{params:{
        name:this.$route.query.name,
        pagecurrent:val,
        pagesize:this.pagesize
      }})
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
  min-height: 777px;
}
</style>