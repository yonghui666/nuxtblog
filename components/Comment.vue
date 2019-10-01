<template>
  <div class="comment">
    <textarea name="" id=""  rows="3" placeholder="想对作者说点啥,最多200字。"
       maxlength="200" v-model="content"
      ></textarea>
    <br>
    <el-button type="primary" @click="addcmt">发表评论</el-button>
    <div class="cmt-list">
      <div class="list-item" v-for="(item,i) in cmtlist" :key="item.id">
        <p class="head">
          <nuxt-link :to="'/allpublic/userhomepage?name='+item.user_name"><img :src="item.headimg" class="headimg"></nuxt-link>
          <span class="spaner">{{item.user_name}}</span>
          <span class="time">{{item.time}}</span>
          #{{i+1}}楼
        </p>
        <p class="content">{{item.content}}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'Comment',
  props:{
    cmtlist:{
      type: Array,
      default:[]
    },
    artid:{
      type:Number,
    }
  },
  data(){
    return{
      content:''
    }
  },
  mounted(){},
  methods:{
    async addcmt(){
      if(!this.content)return this.$message('请输入内容')
      let {code} = await this.$axios.$post('/api/cmt/addcmt',{
        content:this.content,
        artid:this.artid
      })
      if(code==0){
        this.content=''
        this.$message.success('发表成功')
      }else{
        this.$message.error('发表失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment{
  textarea{
    width: 100%;
  }
  .cmt-list{
    .list-item{
      padding: 10px;
      border-bottom: 1px dashed #ccc;
      .head{
        font-size: small;
        padding-bottom: 10px;
        .headimg{
          width: 30px;
          border-radius: 50%;
        }
        .spaner{
          font-size: 16px;
        }
        .time{
          padding: 0 10px;
        }
      }
      .content{
        padding-left: 20px;
        text-indent: 2em;
      }
    }
  }
}
</style>