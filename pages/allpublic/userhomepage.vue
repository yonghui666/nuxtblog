<template>
  <div class="userhomepage">
    <div class="homepage">
      <div class="userinfo">
        <img :src="userinfo.headimg" alt="">
        <p>作者：{{userinfo.name}}</p>
        <p>签名：{{userinfo.qianming}}</p>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
    <div class="rightbox hidden-xs-only">
      待开发模块
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios,query}){
    let {userinfo,artinfo} = await $axios.$get('/api/user/home',{params:{
      name:query.name
    }})
    return {userinfo,artinfo}
  },
  data(){
    return{
      activeName: 'second',
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>