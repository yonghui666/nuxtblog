<template>
  <div>
    <el-upload
      style='position: relative;top: 10px;height: 120px;'
      :file-list='fileList'
      class="avatar-uploader"
      :limit='1'
      :action="uploadUrl"
      accept="image/jpeg,image/gif,image/png,image/bmp"
      list-type="picture-card"
      :data='uploadData'
      :on-success="handleAvatarSuccess"
      :on-error="uploadError"
      :before-upload="beforeAvatarUpload"
      :on-preview="doLookImg"
      :on-remove="doDeleteImg">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          uploadUrl: 'http://up-z2.qiniu.com',
          uploadData: {key:'',token:''},
          formAdd: { brandLogo: '' }
      }
    },
    mounted() {
      this.getQiniuToken()
  },
    methods: {
      getQiniuToken(){
        this.$axios.$post('/api/art/niuqitoken',{})
        .then(res=>{
          this.uploadData.token = res.data.uploadToken
        })
      },
      doDeleteImg(file, fileList) {
        console.log('删除成功',file, fileList)
        let logoAry;
        let key;
        if (this.editState) {
          logoAry = this.mainInfo.brandLogo.split('/');
        } else {
          logoAry = this.formAdd.brandLogo.split('/');
        }
        key = logoAry[logoAry.length - 1];
        deleteQiniuImg({key}).then(res=> {
          if (res.code === '0') {
            if (this.editState) {
              this.mainInfo.brandLogo = '';
            } else {
              this.formAdd.brandLogo = '';
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      doLookImg() {
        this.uploadDialogVisible = true;
        this.uploadDialogImg = this.editState ? this.mainInfo.brandLogo : this.formAdd.brandLogo;
      },
      handleAvatarSuccess(res, file, fileList) {
        console.log('上传成功', res,file, fileList)
        let hash = res.hash;
        let key = res.key;
        if (this.editState) {
          this.mainInfo.brandLogo = qiniuConfig.qiniuPath + '/' + key;
        } else {
          this.formAdd.brandLogo = qiniuConfig.qiniuPath + '/' + key;
        }
      },
      beforeAvatarUpload(file) {
        console.log(file, 'beforeAvatarUpload')
        const isPNG = file.type === "image/png";
        const isJPEG = file.type === "image/jpeg";
        const isJPG = file.type === "image/jpg";
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isPNG && !isJPEG && !isJPG) {
          this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
          return false;
        }
        if (!isLt5M) {
          this.$message.error("上传头像图片大小不能超过 5MB!");
          return false;
        }
        this.uploadData.key = `upload_pic_${new Date().getTime()}_${file.name}`;
      },
      uploadError(err, file, fileList) {
        this.$message({
          message: "上传出错，请重试！",
          type: "error",
          center: true
        });
      },
    }
}
</script>

<style>

</style>