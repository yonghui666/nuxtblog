<template>
  <section :class="[listClass,cname]" v-show="artlist.length">
    <nuxt-link  class="list_item" 
      v-for="item in artlist" :key="item.id"
      :to="{name: to,query:{id:item.id}}"
    >
      <h2>标题：{{item.title}}  <el-tag type="success">{{item.tag}}</el-tag></h2>
      <p class="zhaiyao">{{item.zhaiyao}}</p>
      <p class="time">发表时间：{{item.time}}</p>
      <hr>
    </nuxt-link>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name:'Artlist',
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
      default:'allpublic-artinfo'
    },
  },
  data(){
    return{
      listClass:'artlist',
    }
  },
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
    .time{font-size: small; padding: 0 0 20px 0;}
    hr{
      background-color: #eee;
    }
  }
}
</style>