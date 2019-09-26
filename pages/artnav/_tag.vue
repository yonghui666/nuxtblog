<template>
  <section class="artlist">
    <div v-if="artlist">
      <Artlist :artlist="artlist">
        <el-pagination
          background
          layout="prev, pager, next"
          :pager-count="5"
          :page-size="pagesize"
          @current-change="handleCurrentChange"
          :total="pagenum">
        </el-pagination>
      </Artlist>
    </div>
    <div v-else class="isnullbox">
      <h2>未找到相关结果哦。。。</h2>
    </div>
  </section>
</template>

<script>
import Artlist from '~/components/Artlist'

export default {
  data(){
    return{
      pagenum:100,
      pagesize:6
    }
  },
  async asyncData({$axios,params}){
    try {
      let {code,artlist,pagenum} = await $axios.$get('/api/art/search',{params:{
        tag:params.tag,
        pagecurrent:1,
        pagesize:6
      }})
      return { artlist,pagenum}
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
    async handleCurrentChange(val){
      let {code,artlist,pagenum} = await this.$axios.$get('/api/art/search',{params:{
        tag:this.$route.params.tag,
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
.isnullbox{
  >h2{
    font-size: 20px;
  }
}
</style>