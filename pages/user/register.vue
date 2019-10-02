<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name" >
        <el-input type="text" v-model="ruleForm.name" placeholder="只支持4-8位英文、数字"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" >
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="支持4-12位英文字母、数字、下划线"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verify">
        <div style="display:flex;">
          <el-input type="text" v-model="ruleForm.verify"></el-input>
          <div v-html="svgData" @click="getCaptcha"></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <nuxt-link to="/"><el-button>首页</el-button></nuxt-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    layout:'blog',
    data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if(! (/^[a-zA-Z0-9]{4,8}$/.test(value)) ){
            callback(new Error('请输入正确格式'));
          }else if(! (this.isRepeat()) ){
            callback(new Error('用户名已存在'))
          }else{
            callback()
          }
        }, 600); //验证加载中动画
      };
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (! (/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value)) ) {
            callback(new Error('请输入正确格式的邮箱'));
          } else {
              callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'));
        }else if(! (/^[a-zA-Z0-9_-]{4,12}$/.test(value)) ){
          callback(new Error('请输入正确格式'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateVerify = (rule, value, callback) => {
        if (value === '')return callback(new Error('请输入验证码'));
        this.$axios.$get('/api/isverify?verify='+this.ruleForm.verify)
        .then(res=>{
          if(res.code==1){
            callback(new Error('验证码错误!'));
          }
          callback();
        })
      };
      return {
        ruleForm: {
          name:'1111',
          pass: '1111',
          checkPass: '1111',
          email: '1111@qq.com',
          verify:''
        },
        rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          verify: [
            { validator: validateVerify, trigger: 'blur' }
          ],
        },
        svgData:''
      };
    },
    mounted() {
      this.getCaptcha()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
            loading.close();
          }, 500);
            this.$axios.$post('/api/user/register',{
              name: this.ruleForm.name,
              pass: this.ruleForm.pass,
              email: this.ruleForm.email
            })
            .then(res=>{
              if(res.code===0){
                this.$message({
                  message: '恭喜你，注册成功',
                  type: 'success'
                });
                this.$router.push('/user/login');
              }else{
                this.$message.error('注册失败');
              }
            })
          } else {
            this.$message.error('请填写正确格式的信息');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async isRepeat(){
        let {code} = await this.$axios.$get(`/api/user/isrepeat?name=${this.ruleForm.name}`)
        return code==0 ? true:false;
      },
      getCaptcha(){
        //获取验证码
        this.$axios.$post("/api/captcha", {}).then((resData)=> {
          this.svgData = resData.msg;
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
.register{
  min-width: 400px;
  max-width: 666px;
  background-color: rgb(171, 235, 203);
  position:fixed;
  left:50%;    /* 定位父级的50% */
  top:50%;
  transform: translate(-50%,-50%); 
  padding: 30px 30px 10px 0;
  box-sizing: border-box;
  box-shadow: 0 0 8px green;
}
</style>