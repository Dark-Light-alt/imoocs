<template>
  <div class="accountSetting">
    <div class="page-setting">
      <div class="common-title">账号绑定</div>
      <div class="setting">
        <div class="line"></div>
        <div class="item-box">
          <div class="left"><i class="el-icon-s-promotion"></i></div>
          <div class="center">
            <p class="font-1"><span>邮箱</span></p>
            <p class="font-2">可用邮箱加密码登录慕课网</p>
          </div>
          <div class="right">
            <el-button @click="bindEmailInfo.dialogVisible = true" v-if="customer.customerEmail === null">立即绑定
            </el-button>
            <el-button v-if="customer.customerEmail !== null" @click="updateEmailInfo.dialogVisible = true">更换
            </el-button>
          </div>
        </div>
        <div class="line"></div>
        <div class="item-box">
          <div class="left"><i class="el-icon-phone"></i></div>
          <div class="center">
            <p class="font-1"><span>手机</span></p>
            <p class="font-2">可用手机号加密码登录慕课网</p>
          </div>
          <div class="right">
            <el-button @click="updatePhoneInfo.dialogVisible = true">更换</el-button>
          </div>
        </div>
        <div class="line"></div>
        <div class="item-box">
          <div class="left"><i class="el-icon-s-custom"></i></div>
          <div class="center">
            <p class="font-1"><span>密码</span></p>
            <p class="font-2">用于保护账号信息和登录安全</p>
          </div>
          <div class="right">
            <el-button @click="updatePasswordInfo.dialogVisible = true">修改</el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="绑定邮箱" :visible.sync="bindEmailInfo.dialogVisible" width="30%"
               @close="dialogClose('bindEmailForm')"
               :close-on-click-modal="false">
      <el-form v-model="bindEmailInfo" ref="bindEmailForm">
        <div style="text-align: center" v-if="bindEmailInfo.flag">
          <p style="size: 16px">填写邮箱验证码完成绑定</p>
          <p>邮箱验证码已发送至 {{bindEmailInfo.email}}</p>
        </div>
        <el-form-item prop="email" v-if="bindEmailInfo.flag == false">
          <el-input v-model="bindEmailInfo.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="emailCode" v-if="bindEmailInfo.flag">
          <el-input v-model="bindEmailInfo.emailCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" v-if="bindEmailInfo.flag == false" @click="sendBindEmail">下一步</el-button>
          <el-button class="button" v-if="bindEmailInfo.flag" @click="bindEmail">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="更改邮箱" :visible.sync="updateEmailInfo.dialogVisible" width="30%"
               @close="dialogClose('updateEmailForm')"
               :close-on-click-modal="false">
      <el-form v-model="updateEmailInfo" ref="updateEmailForm">
        <el-form-item prop="password" v-if="updateEmailInfo.flag === 0">
          <el-input v-model="updateEmailInfo.password" placeholder="请填写密码" show-password></el-input>
        </el-form-item>
        <div style="text-align: center" v-if="updateEmailInfo.flag === 2">
          <p style="size: 16px">填写邮箱验证码完成绑定</p>
          <p>邮箱验证码已发送至 {{updateEmailInfo.email}}</p>
        </div>
        <el-form-item prop="email" v-if="updateEmailInfo.flag === 1">
          <el-input v-model="updateEmailInfo.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="emailCode" v-if="updateEmailInfo.flag === 2">
          <el-input v-model="updateEmailInfo.emailCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" v-if="updateEmailInfo.flag === 0" @click="verifyPassword">验证密码</el-button>
          <el-button class="button" v-if="updateEmailInfo.flag === 1" @click="sendUpdateEmail">下一步</el-button>
          <el-button class="button" v-if="updateEmailInfo.flag === 2" @click="updateEmail">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="绑定新手机号" :visible.sync="updatePhoneInfo.dialogVisible" width="30%"
               @close="dialogClose('updatePhoneForm')"
               :close-on-click-modal="false">
      <el-form label-position="right" v-model="updatePhoneInfo" ref="updatePhoneForm">
        <el-form-item prop="nowPhone" v-if="updatePhoneInfo.flag === 0">
          <el-input v-model="updatePhoneInfo.nowPhone" placeholder="请填写当前手机号"></el-input>
        </el-form-item>
        <div style="text-align: center" v-if="updatePhoneInfo.flag === 2">
          <p style="size: 16px">填写手机验证码完成绑定</p>
          <p>手机验证码已发送至 {{updatePhoneInfo.newPhone}}</p>
        </div>
        <el-form-item prop="email" v-if="updatePhoneInfo.flag === 1">
          <el-input v-model="updatePhoneInfo.newPhone" placeholder="请填写新的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="emailCode" v-if="updatePhoneInfo.flag === 2">
          <el-input v-model="updatePhoneInfo.phoneCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" v-if="updatePhoneInfo.flag === 0" @click="verifyPhone">验证当前手机号</el-button>
          <el-button class="button" v-if="updatePhoneInfo.flag === 1" @click="sendPhoneCode">下一步</el-button>
          <el-button class="button" v-if="updatePhoneInfo.flag === 2" @click="updatePhone">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="更换密码" :visible.sync="updatePasswordInfo.dialogVisible" width="30%"
               @close="dialogClose('updatePasswordForm')"
               :close-on-click-modal="false">
      <el-form label-position="right" v-model="updatePasswordInfo" ref="updatePasswordForm">
        <el-form-item prop="nowPassword">
          <el-input v-model="updatePasswordInfo.nowPassword" show-password placeholder="请填写当前密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input v-model="updatePasswordInfo.newPassword" show-password placeholder="请填写新密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input v-model="updatePasswordInfo.checkPassword" show-password placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="updatePassword">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'AccountSetting',
    data: function () {
      return {
        customer: JSON.parse(sessionStorage.getItem('customer')),
        bindEmailInfo: {
          dialogVisible: false,
          customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
          email: null,
          emailCode: null,
          flag: false,
          code: null
        },
        updateEmailInfo: {
          dialogVisible: false,
          customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
          password: null,
          email: null,
          emailCode: null,
          flag: 0,// 0 验证密码 1 填写邮箱 2 填写验证码
          code: null
        },
        updatePhoneInfo: {
          dialogVisible: false,
          customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
          nowPhone: null,
          newPhone: null,
          phoneCode: null,
          flag: 0, // 0 验证现在的手机号 1 填写新手机号 2 填写验证码
          code: null
        },
        updatePasswordInfo: {
          dialogVisible: false,
          customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
          nowPassword: null,
          newPassword: null,
          checkPassword: null
        }
      }
    },
    methods: {
      sendBindEmail: async function () {
        const { data: res } = await this.$http.post('CustomerController/sendEmailCode', { 'email': this.bindEmailInfo.email })
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        sessionStorage.setItem('emailCode', res.data.code)
        this.bindEmailInfo.flag = true
      },
      bindEmail: async function () {
        this.bindEmailInfo.code = sessionStorage.getItem('emailCode')

        const { data: res } = await this.$http.post('CustomerController/bindEmail', this.bindEmailInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
        this.bindEmailInfo.dialogVisible = false
      },
      verifyPassword: async function () {
        const { data: res } = await this.$http.post('CustomerController/verifyPassword', {
          'customerId': this.updateEmailInfo.customerId,
          'password': this.updateEmailInfo.password
        })
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.updateEmailInfo.flag = 1
      },
      sendUpdateEmail: async function () {
        const { data: res } = await this.$http.post('CustomerController/sendEmailCode', { 'email': this.updateEmailInfo.email })
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        sessionStorage.setItem('emailCode', res.data.code)
        this.updateEmailInfo.flag = 2
      },
      updateEmail: async function () {
        this.updateEmailInfo.code = sessionStorage.getItem('emailCode')

        const { data: res } = await this.$http.post('CustomerController/bindEmail', this.updateEmailInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
        this.updateEmailInfo.dialogVisible = false
      },
      verifyPhone: async function () {
        const { data: res } = await this.$http.post('CustomerController/verifyPhone', {
          'customerId': this.updatePhoneInfo.customerId,
          'phone': this.updatePhoneInfo.nowPhone
        })
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.updatePhoneInfo.flag = 1
      },
      sendPhoneCode: async function () {
        const { data: res } = await this.$http.post('CustomerController/sendPhoneCode', {
          'phone': this.updatePhoneInfo.newPhone
        })
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        sessionStorage.setItem('phoneCode', res.data.code)
        this.updatePhoneInfo.flag = 2
      },
      updatePhone: async function () {
        this.updatePhoneInfo.code = sessionStorage.getItem('phoneCode')

        const { data: res } = await this.$http.post('CustomerController/updatePhone', this.updatePhoneInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
        this.updatePhoneInfo.dialogVisible = false
      },
      updatePassword: async function () {
        const { data: res } = await this.$http.post('CustomerController/updatePassword', this.updatePasswordInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
        this.updatePasswordInfo.dialogVisible = false
      },
      dialogClose: function (formRef) {
        this.$refs[formRef].resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>

  .line {
    height: 1px;
    border-top: 1px solid #d9dde1;
  }

  .page-setting {
    .common-title {
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
    }

    .setting {
      .item-box:first-child {
        margin-top: 15px;
      }

      .item-box {
        height: 88px;
        overflow: hidden;
        margin: auto;
        padding-bottom: 25px;

        .left {
          width: 60px;
          float: left;
          font-size: 36px;
          color: #d9dde1;
          line-height: 98px;
          padding-left: 24px;
        }

        .center {
          padding-top: 22px;
          width: 510px;
          float: left;

          .font-1 {
            font-size: 12px;

            span {
              color: #2b333b;
              font-size: 16px;
              font-weight: 700;
            }
          }

          .font-2 {
            color: #93999f;
            font-size: 14px;
          }
        }

        .right {
          float: right;
          padding-right: 12px;
          margin-top: 28px;

          .el-button {
            border-radius: 50px;
          }
        }
      }
    }
  }

  .button {
    float: right;
  }
</style>
