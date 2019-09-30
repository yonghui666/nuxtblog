<template>
    <Panel title="个人资料" cname="panel">
      <template>
        <div class="headimg">
          <el-upload
            class="avatar-uploader"
            action="/api/user/uploadheadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="myinfo.headimg" :src="myinfo.headimg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <p>用户名：{{myinfo.name}}</p>
        <p>用户邮箱：{{myinfo.email}}</p>
        <p>个人签名：{{myinfo.qianming}}</p>

        <el-button type="primary" @click="dialogFormVisible = true">修改资料</el-button>
        <el-dialog title="修改资料" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="formname" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="formpass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="formemail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="签名" :label-width="formLabelWidth">
              <el-input v-model="formqianming" autocomplete="off" placeholder="最大30字"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editinfo">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </Panel>

</template>


<script>
import Panel from '~/components/Panel.vue'
export default {
  data(){
    return {
      myinfo:{},
      dialogFormVisible: false,
      form:{
      },
      formname:'',
      formpass:'',
      formemail:'',
      formqianming:'',
      formLabelWidth: '80px',
      headimg:'',
    }
  },
  mounted(){
    this.getMyInfo()
  },
  methods:{
    async getMyInfo(){
      try {
        let {msg ,code} = await this.$axios.$get('/api/user/myinfo')
        if(code==0){
          this.myinfo=msg;
          this.formname=msg.name;
          this.formpass=msg.pass;
          this.formemail=msg.email;
          this.formqianming=msg.qianming;
        }else{
          this.$router.push('/user/login')
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editinfo(){
      let regpass = /^[a-zA-Z0-9_-]{4,12}$/.test(this.formpass);
      let regemail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.formemail);
      if( ! (regpass && regemail) ){
        return this.$message.error('请填写正确格式的密码或邮箱');
      }
      let {msg ,code} = await this.$axios.$post('/api/user/editinfo',{
        name:this.formname,pass:this.formpass,
        email:this.formemail,qianming:this.formqianming
      });
      if(code==0){
        this.$message('修改成功');
        // this.myinfo=msg;
        this.getMyInfo()
      }else{
        this.$message('修改失败');
      }
      this.dialogFormVisible=false;
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
        // this.headimg = URL.createObjectURL(file.raw);
        // this.headimg = res.msg
        if(res.code==0){
          this.getMyInfo()
        }else{
          this.$message.error('上传失败');
        }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  },
 
  components:{
    Panel
  }
}
</script>

<style lang="scss" scoped>
.panel{
  p{
    line-height: 45px;
  }
  .headimg{
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  
}
</style>

<style>
.el-dialog{
  /* 手机端弹出层宽度问题适应 */
  min-width: 350px;
  max-width: 666px;
}
</style>