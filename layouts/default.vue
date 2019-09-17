<template>
  <div>
    <el-header style="padding:0 8%"><Head /></el-header>
    <nuxt />
    <el-footer>@2019素材来源于网络，侵权即删</el-footer>
  </div>
</template>

<script>
import Head from '~/components/Head'
export default {
  components:{
    Head
  }
}
</script>

<style lang="scss">
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
</style>

