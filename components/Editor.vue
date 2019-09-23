<template>
  <section class="editor">
    <el-input placeholder="请输入标题" 
      autofocus v-model="title" class="input-with-select"
      >
      <el-select v-model="tag" slot="prepend" placeholder="请选择标签">
        <el-option  value="html"></el-option>
        <el-option  value="css"></el-option>
        <el-option  value="js"></el-option>
        <el-option  value="vue"></el-option>
        <el-option  value="node"></el-option>
        <el-option  value="其他"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-delete" @click="clearbox">清空</el-button>
    </el-input>
    
    <div ref="editorbox" class="editorbox"></div>

  </section>
</template>

<script>
export default {
  name:'Editor',
  props:{
    // artinfo:{
    //   default:{title:'',tag:'',content:''},
    //   type:Object,
    // },
    isedit:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      editor:null,
      editorContent:'',
      title:'' ,
      tag:'' ,
      editartinfo:{}
    }
  },
  beforeMount(){
    
  },
  methods:{
    clearbox(){
      this.editor.txt.clear()
    },
    saveEditinfo(){
      if(this.isedit){
        this.editartinfo = JSON.parse(localStorage.getItem('editartinfo')) || {}
        this.title = this.editartinfo.title || ''
        this.tag = this.editartinfo.tag || ''
        this.editor.txt.html(this.editartinfo.content ||'<p>开始你的创作！</p>')
        this.editorContent = this.editartinfo.content 
      }
    }
  },
  mounted(){
    if (process.browser) {
      let E = require('wangeditor')
      let editor = new E(this.$refs.editorbox)
      editor.customConfig.pasteFilterStyle = true
      // 忽略粘贴内容中的图片
      editor.customConfig.pasteIgnoreImg = false
// 上传图片到服务器
      editor.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
      editor.customConfig.uploadImgServer = 'http://localhost:3333/uploadR/image?10'; //设置上传文件的服务器路径
      editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
//自定义上传图片事件
      editor.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
              console.log("上传成功");
          },
          fail: function(xhr, editor, result) {
              console.log("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
              console.log("上传出错");
          },
          timeout: function(xhr, editor) {
              console.log("上传超时");
          }
      }

      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.zIndex = 100
      editor.customConfig.menus = [
        'head',
        'bold',
        'italic',
        'fontSize',
        'underline','foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'code',  // 插入代码
        'table',  // 表格
        'redo'  // 重复
      ]
      editor.create()
      this.editor=editor
      this.saveEditinfo()
      // editor.txt.html(this.editartinfo.content ||'<p>开始你的创作！</p>')
    }
  }
  
  
}
</script>

<style lang="scss" scoped>
  .editor{
    .el-select{ min-width: 120px;}
    .el-input{margin-bottom: 10px}
  }
</style>
<style >
.w-e-toolbar{
  overflow: auto;
}
.w-e-text-container{
  min-height: 555px;
}
</style>