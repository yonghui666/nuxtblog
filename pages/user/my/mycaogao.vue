<template>
    <Panel title="我的草稿">
      <nuxt-link v-if="isnull" to="/user/my/myarticle">
        <el-button type="primary">还没有草稿哦，点我去创作！</el-button>
      </nuxt-link>
      <List :artlist="mycaogao" v-else></List>
    </Panel>

</template>


<script>
import Panel from '~/components/Panel.vue'
import List from '~/components/List.vue'

export default {
  data(){
    return {
      mycaogao:[],
      isnull:0
    }
  },
  mounted(){
    this.getMycaogao()
  },
  methods:{
    async getMycaogao(){
      let {msg,code} = await this.$axios.$get('/api/art/list?caogao=1')
      if(code==0){
        if(msg.length==0){
          this.isnull=1
        }
        this.mycaogao=msg
      }else{
        this.$message('获取文章失败')
      }
    }
  },
 
  components:{
    Panel,List
  }
}
</script>

<style lang="scss" scoped>

</style>