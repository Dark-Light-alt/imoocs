<template>
<div class="accountbinding">
  <div class="top">

    <span>账号绑定</span>

  </div>
  <hr>


  <div class="emailName">
      <i class="el-icon-message"></i>
    <span>邮箱</span>
    <br>
    <span style="color: #93999f">可用邮箱加密码登录慕课网，可用邮箱找回密码</span>
    <el-button round class="bindnow">立即绑定</el-button>
  </div>
  <hr>

  <div class="phoneName">
    <i class="el-icon-mobile-phone"></i>
    <span>手机</span>
    <br>
    <span style="color: #93999f">用户保护账号信息和登录安全</span>
    <template>
      <el-button @click="outerVisible = true" round class="operate">操作</el-button>
      <el-dialog title="当前绑定手机号：" :visible.sync="outerVisible">
        <el-dialog
          width="30%"
          title="验证当前绑定手机号"
          :visible.sync="innerVisible"
          append-to-body>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = true">解绑手机号</el-button>
          <el-button type="primary" @click="innerVisible = true">更换手机号</el-button>
        </div>
      </el-dialog>
    </template>

  </div>
  <hr>

  <div class="passwordName">
  <el-form>
    <i class="el-icon-lock"></i>
    <span>密码</span>
    <br>
    <span style="color: #93999f">用于保护账号信息和登录安全</span>
      <el-button round @click="updateDialogVisible = true" class="update">修改</el-button>
  </el-form>

  <el-dialog title="修改密码" :visible.sync="updateDialogVisible" width="50%">
    <el-form :model="resetForm" status-icon label-width="100px">
      <el-form-item label="原密码 :">
        <el-input v-model="resetForm.customerPassword" show-password placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码 :">
        <el-input v-model="resetForm.newPassword" auto-complete="off" show-password placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码 :">
        <el-input v-model="resetForm.checkPassword" auto-complete="off" show-password placeholder="请确认新密码"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialogVisible = false">取消</el-button>
          <el-button @click="changePassword()">确定</el-button>
      </span>
  </el-dialog>
  </div>
  <hr>


  <div class="el-footer">
    <i class="el-icon-set-up"></i>
    <span>社交账号</span>
    <br>
    <span style="color: #93999f">绑定第三方账号，可以直接登录，还可以将内容同步到以下平台，与更多好友分享</span>
  </div>

</div>
</template>

<script>
    export default {
      name: 'Accountbinding',
      data:function () {
          return{
            outerVisible: false,
            innerVisible: false,
            resetForm: {
              customerId: null,
              customerPassword: null,
              newPassword: null,
              checkPassword: null
            },
            updateDialogVisible:false
          }

      },
      methods:{
        changePassword: async function () {
          this.resetForm.customerId =JSON.parse(sessionStorage.getItem("customer")).customerId
          const {data: res} = await this.$http.post('CustomerController/changePassword', this.resetForm)
          if (!res.meta.access) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          this.$router.push({name: 'Home'})
        },

      }
    }
</script>

<style scoped>
  .top {
    width: 100%;
    height: 100px;
    font-size: 18px;
  }
  .emailName{
    width: 100%;
    height: 100px;

  }
  .phoneName{
    width: 100%;
    height: 100px;
  }
  .passwordName{
    width: 100%;
    height: 100px;
  }
  .el-footer{
    width: 100%;
    text-align: left;
    height: 100px;
  }
  .update{
    margin-left: 900px;
  }
  .operate{
    margin-left: 900px;
  }
  .bindnow{
    margin-left: 900px;
  }
</style>
