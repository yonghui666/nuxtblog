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
              <textarea rows="3" placeholder="回复..." maxlength="200" v-model="item.replytxt"></textarea>
            </div>
            <div>
              <el-button type="primary" size="mini" round @click="cmtReply(item.id,item.replytxt)">发布</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="查看回复" v-if="item.isreply">
            <div class="reply" v-for="reply in item.cmt_replydata" :key="reply.id">
              <div class="head">
                <img :src="reply.headimg">
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
    },
    pagecurrent:{
      type:Number
    }
  },
  data(){
    return{
      content:'',
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
        this.$parent.handleCurrentChange(this.pagecurrent);    //调用父组件父方法，刷新评论;并保持当前页码不变
      }else{
        this.$message.error('发表失败')
      }
    },
    async cmtReply(cmtid,replytxt){
      if(!replytxt)return this.$message('请输入内容')
      let {code} = await this.$axios.$post('/api/cmt/addreply',{
        content:replytxt,
        cmtid
      })
      if(code==0){
        this.reply=''
        this.$message.success('回复成功')
        this.$parent.handleCurrentChange(this.pagecurrent);    //调用父组件父方法，刷新评论
      }else{
        this.$message.error('回复失败')
      }
    },
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
          width: 30px; height: 30px;
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
          >img{width: 20px;height: 20px; border-radius: 50%;}
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