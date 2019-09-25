<template>
  <section :class="[listClass,cname]">
    <div  v-for="item in artlist" :key="item.id">
      <nuxt-link :to="{name:'article-id',params:{id:item.id}}" class="list_item">
        <h2>标题：{{item.title}}  <el-tag type="success">{{item.tag}}</el-tag></h2>
        <p class="zhaiyao">{{item.zhaiyao}}</p>
        <p class="time">发表时间：{{item.time}}</p>
        <hr>
      </nuxt-link>
    </div>
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
    }
  },
  data(){
    return{
      listClass:'artlist'
    }
  }
}
</script>

<style lang="scss" scoped>
.artlist{
  .list_item{
    padding: 10px 0 ;
    box-sizing: border-box;
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
      width: 100%;
      height: auto;
      word-wrap:break-word;
      word-break:break-all;
      overflow: hidden;
    }
    .time{font-size: small}
    hr{
      background-color: #eee;
      margin: 10px 0;
    }
  }
}
</style>