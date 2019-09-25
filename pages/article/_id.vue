<template>
  <section class="artinfo">
    <h2>{{artinfo.title}}</h2>
    <el-tag>{{artinfo.tag}}</el-tag>
    <p class="time">发表时间：{{artinfo.time}}</p>
    <nuxt-link :to="{name:'article-edit',params:{artinfo:artinfo}}"><el-button type="primary">修改文章</el-button></nuxt-link>
    <div v-html="artinfo.content" class="content"></div>
  </section>
</template>

<script>
export default {
  async asyncData({$axios,params}){
    let {code,msg} = await $axios.$get('/api/art/info',{params:{id:params.id}})
    return { artinfo: msg}
  },
  
}
</script>

<style lang="scss" scoped>
.artinfo{
  margin: 0 8%;
  background-color: #fff;
  box-shadow: 0 0 5px #fff;
  min-height: 800px;
  padding: 20px;
  h2{
    text-align: center;
    font-size: 24px; font-weight: 444px;
  }
  .time{font-size: small; color: gray; margin: 10px 0;}
  .content{
    text-indent: 2em;
  }
}
</style>