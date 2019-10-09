<template>
  <div>
    <el-header style="padding:0 8%"><Head /></el-header>
    <nuxt />
    <el-footer>
      <p>
        <a href="http://www.beian.miit.gov.cn" target="_blank">备案号：豫ICP备19008483号</a>
      </p>
    </el-footer>
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
.el-header{margin-bottom: 20px;}
</style>

