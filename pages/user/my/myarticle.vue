<template>
    <Panel title="我的文章" cname="panel">
      <!-- <template>
        
      </template> -->
      <List :artlist="myarticle"></List>
    </Panel>
</template>


<script>
import Panel from '~/components/Panel.vue'
import List from '~/components/List.vue'
export default {
  data(){
    return {
      myarticle:[]
    }
  },
  mounted(){
    this.getMyArticle()
  },
  methods:{
    async getMyArticle(){
      let {msg,code} = await this.$axios.$get('/api/art/list')
      if(code==0){
        this.myarticle=msg
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
.panel{
}
</style>