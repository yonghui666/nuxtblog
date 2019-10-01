<template>
    <Panel title="我的文章" cname="panel">
      <List :artlist="myarticle">
        <el-pagination
          background
          layout="prev, pager, next"
          :pager-count="5"
          :page-size="pagesize"
          :hide-on-single-page="pagenum<=pagesize"
          @current-change="handleCurrentChange"
          :total="pagenum">
        </el-pagination>
      </List>
      <nuxt-link v-if="isnull" to="/article/write">
        <el-button type="primary">还没有文章哦，点我去创作！</el-button>
      </nuxt-link>
    </Panel>
</template>

<script>
import Panel from '~/components/Panel.vue'
import List from '~/components/List.vue'
export default {
  data(){
    return {
      myarticle:[],
      isnull:0,
      pagenum:100,
      pagesize:6
    }
  },
  mounted(){
    this.getMyArticle()
  },
  methods:{
    async getMyArticle(){
      let {myarticle,code,pagenum} = await this.$axios.$get('/api/art/list',{params:{
        pagecurrent:1,
        pagesize:6
      }})
      if(code==0){
        if(myarticle.length==0){
          this.isnull=1
        }
        this.myarticle=myarticle
        this.pagenum=pagenum
      }else{
        this.$message('获取文章失败')
      }
    },
    async handleCurrentChange(val){
      let {code,myarticle,pagenum} = await this.$axios.$get('/api/art/list',{params:{
        pagecurrent:val,
        pagesize:this.pagesize
      }})
      scrollTo(0,0);
      this.myarticle=myarticle
      this.pagenum=pagenum
    }
  },
  components:{
    Panel,List
  }
}
</script>

<style lang="scss" scoped>

</style>