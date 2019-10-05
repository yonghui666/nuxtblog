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
      editartinfo:{},
      uploadData: {key:'',token:''},
    }
  },
  beforeMount(){
    this.getQiniuToken()
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
    },
    getQiniuToken(){
      this.$axios.$post('/api/art/niuqitoken',{})
      .then(res=>{
        this.uploadData.token = res.uploadToken
      })
    },
  },
  mounted(){
    if (process.browser) {
      let E = require('wangeditor')
      let editor = new E(this.$refs.editorbox)
      editor.customConfig.pasteFilterStyle = true
      // 忽略粘贴内容中的图片
      editor.customConfig.pasteIgnoreImg = false
      // 上传图片到服务器
      editor.customConfig.uploadImgServer = 'http://up-z2.qiniu.com'; //设置上传文件的服务器路径
      editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
      editor.customConfig.customUploadImg =  (files, insert)=> {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法
          var formData = new FormData(); 
          formData.append('file', files[0]);
          formData.append('key', `editor/${new Date().getTime()}`);
          formData.append('token',this.uploadData.token)
          var config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        // 上传代码返回结果之后，将图片插入到编辑器中
        this.$axios.$post('http://up-z2.qiniu.com',formData,config)
        .then(res=>{
          insert(`http://image.xyfight.com/${res.key}`)
        })
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