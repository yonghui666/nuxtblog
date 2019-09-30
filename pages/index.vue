<template>
  <div class="blog">
    <artnav></artnav>
  </div>
</template>

<script>
import artnav from './artnav'
export default {
  components: { artnav },
  created(){

    this.$router.push('/artnav/recommend')
  },
  mounted(){
    localStorage.setItem('isclick',0)
  }
};
</script>
<style lang="scss" scoped>

</style>

