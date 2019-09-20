<template>
    <Panel title="我的文章" cname="panel">
      <template>
        
      </template>
    </Panel>

</template>


<script>
import Panel from '~/components/Panel.vue'
export default {
  data(){
    return {
      myarticle:[]
    }
  },
  created(){
    // this.getMyArticle()
  },
  methods:{
    async getMyArticle(){
      let {myarticle} = await this.$axios.$get('/api/user/myarticle')
      this.myarticle=myarticle
    }
  },
 
  components:{
    Panel
  }
}
</script>

<style lang="scss" scoped>
.panel{
}
</style>