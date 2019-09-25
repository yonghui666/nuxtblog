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
  }
};
</script>
<style lang="scss" scoped>

</style>

