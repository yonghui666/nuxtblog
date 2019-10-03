<template>
  <div class="write">
    <h2>请开始你的表演！</h2>
    <el-button type="primary" @click="postArt">发布文章</el-button>
    <el-button type="primary" @click="postArt(1)">存为草稿</el-button>
    <hr>
    <Editor ref="editor" :artinfo="artinfo"></Editor>
  </div>
</template>

<script>
import Editor from '~/components/Editor'
export default {
  components:{Editor},
  data(){
    return{
      artinfo:this.$route.params.artinfo || {},
      repeatclick:1
    }
  },
  methods:{
    async postArt(iscaogao){
      //10s只能发布一次；
      if(this.repeatclick==0) return this.$message.error('操作太频繁，稍后再试');
      this.repeatclick=0;
      setTimeout(() => {
        this.repeatclick=1
      }, 10000);
      if(! (this.$refs.editor.title.trim())){
        return this.$message.error('请输入文章标题')
      }else if(this.$refs.editor.tag==''){
        return this.$message.error('请选择文章标签')
      }else{
        let zhaiyao = this.$refs.editor.editor.txt.text().replace(/&nbsp;/g,'').substring(0,60)
        let {code,msg} = await this.$axios.$post('/api/art/write',{
          title: this.$refs.editor.title.trim(),
          tag: this.$refs.editor.tag,
          content: this.$refs.editor.editorContent,
          zhaiyao: zhaiyao,
          caogao: iscaogao
        })
        if(code==0){
          this.$message.success('发表成功！')
          this.$router.push('/user/my/myarticle')
        }else{
          this.$message.error('发表失败！')
        }
      }
    },
    async islogin(){
      //验证登录是否过期，过期自动登录
      let {code} = await this.$axios.$get('/api/islogin');
      if(code!=0) return this.$router.replace('/user/login')
    }
    
  },
  mounted(){
    this.islogin()
  }
}
</script>

<style lang="scss" scoped>
  .write{
    margin: 0 8%;
    h2{font-size: 36px; font-weight: 666; padding: 10px 0;}
    hr{margin: 10px 0;}
  }
</style>