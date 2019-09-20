<template>
  <div class="blog">
    <el-container style="margin:0 8%">
      <el-aside width="200px">Aside</el-aside>
      <el-container >
        <el-main>
          文章列表
          <p>分页</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  components: {
  }
};
</script>

<style>
 
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 770px;
  }
</style>
