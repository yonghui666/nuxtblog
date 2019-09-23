<template>
  <div class="edit">
    <h2>修改文章</h2>
    <el-button type="primary" @click="postArt">发布文章</el-button>
    <el-button type="primary" @click="postArt(1)">存为草稿</el-button>
    <hr>
    <!-- <Editor ref="editor" :artinfo="artinfo2"></Editor> -->
    <Editor ref="editor" :isedit="1" ></Editor>
  </div>
</template>

<script>
import Editor from '~/components/Editor'
export default {
  components:{Editor},
  data(){
    return{
      artinfo:this.$route.params.artinfo,
    }
  },
  watch:{

  },
  methods:{
    async postArt(iscaogao){
      if(! (this.$refs.editor.title.trim())){
        return this.$message.error('请输入文章标题')
      }else if(this.$refs.editor.tag==''){
        return this.$message.error('请选择文章标签')
      }else{
        let {code,msg} = await this.$axios.$post('/api/art/edit',{
          id:this.$refs.editor.editartinfo.id,
          title: this.$refs.editor.title.trim(),
          tag: this.$refs.editor.tag,
          content: this.$refs.editor.editorContent,
          zhaiyao: this.$refs.editor.editor.txt.text().substring(0,100),
          caogao: iscaogao
        })
        if(code==0){
          this.$message.success('发表成功！')
          this.$router.push('/user/my/myarticle')
        }else{
          this.$message.error('发表失败！')
        }
        console.log(this.$refs.editor.editorContent);
      }
    },
    
  },
  created(){
    if (process.browser) {
      //路由params中的参数，一刷新就没了，所以参数为空时，就不保存到本地了，
      if(this.artinfo){   
        localStorage.setItem('editartinfo', JSON.stringify(this.artinfo))
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .edit{
    margin: 0 8%;
    h2{font-size: 36px; font-weight: 666; padding: 10px 0;}
    hr{margin: 10px 0;}
  }
</style>