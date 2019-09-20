<template>
  <section :class="[cname,panelClass]">
    <h2>{{title}}</h2>
    <hr>
    <slot></slot>
    <slot name="footer"></slot>
  </section>
</template>

<script>
export default {
  name:'Panel',
  props:{
    cname:{
      default:'',
      type:String
    },
    title:{
      type:String,
    }
  },
  data(){
    return{
      panelClass:'panel'
    }
  }
}
</script>

<style lang="scss" scoped>
  .panel{
    >h2{
      font-size: 24px; font-weight: 666;
    }
    hr{margin: 20px 0}
  }
</style>