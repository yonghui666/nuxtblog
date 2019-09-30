<template>
  <div class="home">
    <div class="pcnav hidden-xs-only">
      <div :class="{'pcnav-item':true,'isclick':index==isclick}"
         v-for="(item,index) in pcnav" :key="item.id"
         @click="flag(index)"
        >
        <nuxt-link :to="{name:'artnav-tag',params:{tag:item.to}}">{{item.navname}}</nuxt-link>
      </div>
    </div>
    <!-- 手机端才显示的滑动导航条 -->
    <div class="artlist">
      <div class="h5nav hidden-sm-and-up">
        <div style="width:200%">
          <div :class="{'h5nav-item':true,'isclick':index==isclick}"
            v-for="(item,index) in pcnav" :key="item.id"
            @click="flag(index)"
            >
            <nuxt-link :to="{name:'artnav-tag',params:{tag:item.to}}">{{item.navname}}</nuxt-link>
          </div>
        </div>
      </div>
      <nuxt-child/> 
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pcnav:[
        {navname:'推荐', id:1, to:'recommend'},
        {navname:'html', id:2, to:'html'},
        {navname:'css', id:3, to:'css'},
        {navname:'js',id:4, to:'js'},
        {navname:'node',id:5, to:'node'},
        {navname:'vue',id:6, to:'vue'},
        {navname:'es6',id:7, to:'es6'},
        {navname:'待开发',id:8, to:'nofinish'},
      ],
      isclick:-1
    }
  },
  methods:{
    flag(index){
      this.isclick=index
    }
  },
  mounted(){
    
    this.isclick = JSON.parse(localStorage.getItem('isclick'))
  },
  beforeRouteUpdate(to, from, next) {
    let tag = to.params.tag;
    //判断路由的参数，保留当前选中的标签；
    switch (tag) {
      case 'recommend':
        localStorage.setItem('isclick',0)
        break;
      case 'html':
        localStorage.setItem('isclick',1)
        break;
      case 'css':
        localStorage.setItem('isclick',2)
        break;
      case 'js':
        localStorage.setItem('isclick',3)
        break;
      case 'node':
        localStorage.setItem('isclick',4)
        break;
      case 'vue':
        localStorage.setItem('isclick',5)
        break;
      case 'nofinish':
        localStorage.setItem('isclick',6)
        break;
      default:
        break;
    }
    next();
  },
}
</script>

<style lang="scss" scoped>
  .home{
    display: flex;
    margin: 0 8%;

    min-height: 666px;
    .pcnav{
      min-width: 120px;
      background-color: #fff;
      box-shadow: 0 0 8px #ddd;
      margin-right: 20px;
      font-size: 18px;
      color: #333;
      text-align: center;
      line-height: 55px;
      .pcnav-item{
        >a{display: block;}
        margin-bottom: 10px;
        &:hover{
          transition: all .5s;
          background-color: #eee;
        }

      }
      .isclick{
        background-color: #eee;
      }
    }
    .h5nav{
      overflow-x: auto;
      line-height: 50px;
      padding-left: 30px;
      
      .h5nav-item{
        width: 80px;
        float: left;
      }
    }
    .artlist{
      flex: 1;
      background-color: #fff;
      box-shadow: 0 0 8px #ddd;
    }
  }
</style>