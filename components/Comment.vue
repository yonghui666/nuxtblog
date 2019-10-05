<template>
  <div class="comment">
    <textarea name="" id=""  rows="3" placeholder="想对作者说点啥,最多200字。"
       maxlength="200" v-model="content"
      ></textarea>
    <br>
    <el-button type="primary" size="small" round @click="addcmt">发表评论</el-button>
    <div class="cmt-list">
      <div class="list-item" v-for="(item,i) in cmtlist" :key="item.id">
        <p class="head">
          <nuxt-link :to="'/allpublic/userhomepage?name='+item.user_name"><img :src="item.headimg" class="headimg"></nuxt-link>
          <span class="spaner">{{item.user_name}}</span>
          <span class="time">{{item.time}}</span>
          #{{i+1}}楼
        </p>
        <p class="content">{{item.content}}</p>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              回复<i class="header-icon el-icon-chat-dot-square"></i>
            </template>
            <div>
              <textarea rows="3" placeholder="回复..." maxlength="200" v-model="reply"></textarea>
            </div>
            <div>
              <el-button type="primary" size="mini" round @click="cmtReply(item.id)">发布</el-button>
              <!-- <el-button type="info" size="mini" round>取消</el-button> -->
            </div>
          </el-collapse-item>
          <el-collapse-item title="查看回复" @click.native="getReply(item.id)" v-if="item.isreply">
            <div class="reply" v-for="reply in replylist" :key="reply.id">
              <div class="head">
                <img :src="reply.headimg" alt="">
                <p>@{{reply.user_name}} 回复 #{{item.user_name}}</p>
              </div>
              <p class="replycontent">{{reply.content}}</p>
            </div>
          </el-collapse-item>
        </el-collapse>
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
      content:'',
      reply:'',
      replylist:[],
      repeatclick:1
    }
  },
  mounted(){

  },
  methods:{
    async addcmt(){
      if(!this.content)return this.$message('请输入内容')
      if(this.repeatclick==0) return this.$message.error('操作太频繁，稍后再试');
      this.repeatclick=0;
      setTimeout(() => {
        this.repeatclick=1
      }, 5000);
      let {code} = await this.$axios.$post('/api/cmt/addcmt',{
        content:this.content,
        artid:this.artid
      })
      if(code==0){
        this.content=''
        this.$message.success('发表成功')
        this.$parent.getComment();    //调用父组件父方法，刷新评论
      }else{
        this.$message.error('发表失败')
      }
    },
    async cmtReply(cmtid){
      if(!this.reply)return this.$message('请输入内容')
      let {code} = await this.$axios.$post('/api/cmt/addreply',{
        content:this.reply,
        cmtid
      })
      if(code==0){
        this.reply=''
        this.$message.success('回复成功')
      }else{
        this.$message.error('回复失败')
      }
    },
    async getReply(cmtid){
      console.log(cmtid);
      let {code,msg} = await this.$axios.$get('/api/cmt/replylist',{params:{cmtid}})
      if(code==0){
        this.replylist=msg
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment{
  textarea{
    width: 99.8%;
    margin-bottom: 5px;
  }
  .cmt-list{
    .list-item{
      padding: 10px;
      // border-bottom: 1px dashed #ccc;
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

      .reply{
        padding-left: 20px;
        .head{
          display: flex;
          >img{width: 20px;border-radius: 50%;}
        }
        .replycontent{
          text-indent: 2em;
        }
      }
    }
  }
}
</style>
<style>
.el-collapse{
  border:none;
}
</style>