<template>
    <div class="personalInfo">
        <div class="page-setting">
          <div class="common-title">个人信息</div>
          <div class="setting">
            <div class="line"></div>
            <div class="item-box">
              <el-form label-position="right" label-width="100px" :model="customer">
                <el-form-item label="昵称" prop="nikeName">
                  <el-input v-model="customer.customerNickname"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="customerPhoto">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="upPhotoSuccess"
                    :on-remove="upPhotoRemove">
                    <img v-if="customer.customerPhoto" :src="customer.customerPhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <el-button size="small" type="primary" style="float: left;margin-top: 8px">点击更换</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="现居住地" prop="customerAddress">
                  <el-input v-model="customer.customerAddress"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="customerSex">
                  <el-radio-group v-model="customer.customerSex">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button class="button" @click="update()">修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PersonalInfo',
    data:function(){
      return {
        uploadUrl: 'http://localhost:8081/MonographController/upload',
        accept: 'image/jpg,image/jpeg,image/png',
        fileList:[],
        customer:{}
      }
    },
    methods:{
      showMessage:async function(){
        let customer = JSON.parse(sessionStorage.getItem("customer"));
        const {data:res} = await this.$http.get(`CustomerController/findById/${customer.customerId}`);
        if(!res.meta.access){
          return this.$message.error(res.meta.msg);
        }
        this.customer=res.data.customer;
      },
      update:async function(){
        const {data:res} = await this.$http.put("CustomerController/update",this.customer);

        if(!res.meta.access){
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);

        sessionStorage.setItem("customer",JSON.stringify(this.customer));
      },
      upPhotoSuccess : async function(res){
        this.customer.customerPhoto=res.data.url;
        console.log(res.data.url);
      },
      upPhotoRemove: async function(){
        this.customer.customerPhoto=null;
      },
    },
    created:function(){
      this.showMessage();
    }
  }
</script>

<style scoped>
  .line {
    height: 1px;
    border-top: 1px solid #d9dde1;
  }

  .common-title {
    line-height: 40px;
    font-size: 16px;
    font-weight: 700;
  }

  .item-box {
    overflow: hidden;
    padding-bottom: 25px;
    margin-top: 30px;
  }

  .button {
    float: right;
  }

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
</style>
