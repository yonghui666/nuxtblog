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
        }else if(! (/^[a-zA-Z0-9]{4,8}$/.test(value)) ){
          callback(new Error('请输入正确格式'));
        }else{
          callback()
        }
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
          callback(new Error('请输入密码'));
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
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name:'',
          pass: '',
          checkPass: '',
          email: ''
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
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
.register{
  min-width: 450px;
  background-color: rgb(171, 235, 203);
  position:absolute;
  left:50%;    /* 定位父级的50% */
  top:50%;
  transform: translate(-50%,-50%); 
  padding: 50px;
  box-shadow: 0 0 8px green;
}
</style>