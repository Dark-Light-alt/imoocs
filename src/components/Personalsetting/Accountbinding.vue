<template>
  <div>
    <div class="main">
      <div style="padding:20px">
        <div class="top">
          <span style="font-size: 19px;font-weight: bold">账号绑定</span>
        </div>

        <div class="content">
          <div style="float: left;">
            <div class="labelClass">
              <i class="el-icon-message"></i>
              <span>邮箱</span>
            </div>
            <div class="fontColor">可用邮箱加密码登录慕课网，可用邮箱找回密码</div>
          </div>
          <el-button type="primary" round>立即绑定</el-button>
        </div>

        <div class="content">
          <div style="float: left;">
            <div class="labelClass">
              <i class="el-icon-mobile-phone"></i>
              <span>手机</span>
            </div>
            <div class="fontColor">用户保护账号信息和登录安全</div>
          </div>
          <el-button type="primary" @click="outerVisible = true" round>操作</el-button>
        </div>

        <div class="content">
          <div style="float: left;">
            <div class="labelClass">
              <i class="el-icon-lock"></i>
              <span>密码</span>
            </div>
            <div class="fontColor">用于保护账号信息和登录安全</div>
          </div>
          <el-button type="primary" round @click="updateDialogVisible = true">修改</el-button>
        </div>

        <div class="content">
          <div style="float: left;">
            <div class="labelClass">
              <i class="el-icon-set-up"></i>
              <span>社交账号</span>
            </div>
            <div class="fontColor">绑定第三方账号，可以直接登录，还可以将内容同步到以下平台，与更多好友分享</div>
          </div>
        </div>
      </div>

      <el-dialog title="修改密码" :visible.sync="updateDialogVisible" width="50%">
        <el-form :model="resetForm" status-icon label-width="100px">
          <el-form-item label="原密码 :">
            <el-input v-model="resetForm.customerPassword" show-password placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码 :">
            <el-input v-model="resetForm.newPassword" show-password placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :">
            <el-input v-model="resetForm.checkPassword" show-password placeholder="请确认新密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialogVisible = false">取消</el-button>
          <el-button @click="changePassword()">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="当前绑定手机号：" :visible.sync="outerVisible">
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = true">解绑手机号</el-button>
          <el-button type="primary" @click="innerVisible = true">更换手机号</el-button>
        </div>
      </el-dialog>

      <el-dialog
        width="30%"
        title="验证当前绑定手机号"
        :visible.sync="innerVisible"
        append-to-body class="dialog-footer">
      </el-dialog>
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
  .main{
    width: 100%;
    height: 500px;
    background-color: rgb(255,255,255);
  }

  .content{
    border-top:1px solid rgb(208,214,217);
    width: 96%;
    height: 50px;
    padding: 18px;
  }

  .labelClass{
    margin-bottom: 5px;
  }

  .el-button{
    float: right;
  }

  .fontColor{
    color: #93999f;
  }

  .top {
    width: 100%;
    font-size: 18px;
    padding-bottom: 20px;
  }
</style>
