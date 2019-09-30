<template>
  <section :class="[listClass,cname]">
    <div  v-for="item in artlist" :key="item.id">
      <nuxt-link :to="{name: to,params:{id:item.id}}" class="list_item">
        <h2>标题：{{item.title}}  <el-tag type="success">{{item.tag}}</el-tag></h2>
        <p class="zhaiyao">{{item.zhaiyao}}</p>
      </nuxt-link>
      <p class="time">发表时间：{{item.time}} <el-button @click="del(item.id)"  type="danger" size="mini" icon="el-icon-delete" circle></el-button> </p>
      <hr>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name:'List',
  props:{
    artlist:{
      type:Array,
      default:[]
    },
    cname:{
      type:String,
      default:''
    },
    to:{
      type:String,
      default:'article-id'
    },
  },
  data(){
    return{
      listClass:'artlist',
    }
  },
  methods:{
    async del(id){
      if(confirm('是否要删除！')){
        let {code} = await this.$axios.$get('/api/art/del?id='+id)
        if(code==0){
          this.$message.success('删除成功')
          location.reload() //刷新当前页面
        }else{
          this.$message.error('删除失败')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.artlist{
  .list_item{
    display: block;
    padding: 20px;
    box-sizing: border-box;
    &:hover{background-color: #eee;}
    >h2{
      font-size: 24px; font-weight: 400;
      display: flex;
      justify-content: space-between;
    }
    .zhaiyao , .time{
      color: gray;
    }
    .zhaiyao{
      margin: 10px 0; text-indent: 2em;
      // 文本超过父容器自动换行
      width: 100%;
      height: auto;
      word-wrap:break-word;
      word-break:break-all;
      overflow: hidden;
    }
  }
  .time{
    font-size: small; padding: 0 20px;
    color: gray;
    display: flex;
    justify-content: space-between;
  }
  hr{
    background-color: #eee;
  }
}
</style>