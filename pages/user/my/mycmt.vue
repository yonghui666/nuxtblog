<template>
    <Panel title="我的评论">
      <MyCmt :mycmt="mycmt">
        <el-pagination
          background
          layout="prev, pager, next"
          :pager-count="5"
          :hide-on-single-page="mycmtPagenum<11"
          @current-change="handleCurrentChangeCmt"
          :total="mycmtPagenum">
        </el-pagination>
      </MyCmt>
    </Panel>
</template>
<script>
import Panel from '~/components/Panel.vue'
import MyCmt from '~/components/MyCmt'

export default {
  data(){
    return {
      mycmtPagenum:100,
      mycmt:[]
    }
  },
  mounted(){
    this.getMyCmt()
  },
  methods:{
    async getMyCmt(){
      let {code,mycmt,mycmtPagenum}=await this.$axios.$get('/api/cmt/mycmt',{params:{
        pagecurrent:1
      }})
      this.mycmt=mycmt
      this.mycmtPagenum=mycmtPagenum
    },
    async handleCurrentChangeCmt(val){
      let {code,mycmt,mycmtPagenum}=await this.$axios.$get('/api/cmt/mycmt',{params:{
        pagecurrent:val
      }})
      scrollTo(0,0);
      this.mycmt=mycmt
      this.mycmtPagenum=mycmtPagenum
    }
  },
 
  components:{
    Panel,MyCmt
  }
}
</script>

<style lang="scss" scoped>

</style>