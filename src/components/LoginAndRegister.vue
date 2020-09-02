<template>
  <el-dialog :visible.sync="isShow" width="350px" custom-class="class"
             :before-close="cancel" @close="dialogClose" center :close-on-click-modal="false">
    <el-tabs v-model="name">
      <el-tab-pane label="登录" name="login">
        <el-form label-position="right" ref="loginForm" v-model="loginInfo">
          <el-form-item prop="username">
            <el-input v-model="loginInfo.username" placeholder="请输入登录手机号/邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginInfo.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="rememberMe">
            <el-checkbox v-model="loginInfo.rememberMe">7天内自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="sub2" round @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form label-position="right" v-model="registerInfo" ref="registerForm">
          <el-form-item prop="phone" v-if="registerInfo.flag == false">
            <el-input v-model="registerInfo.phone" placeholder="请输入注册手机号"></el-input>
          </el-form-item>
          <el-form-item prop="imageCode" v-if="registerInfo.flag == false">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="registerInfo.imageCode" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="10">
                <img :src="image" @click="generateImageCaptcha">
              </el-col>
            </el-row>
          </el-form-item>
          <div style="text-align: center" v-if="registerInfo.flag">
            <p style="size: 16px">填写短信验证码密码完成注册</p>
            <p>短信验证码已发送至 {{registerInfo.phone}}</p>
          </div>
          <el-form-item prop="phoneCode" v-if="registerInfo.flag">
            <el-input v-model="registerInfo.phoneCode" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item prop="password" v-if="registerInfo.flag">
            <el-input v-model="registerInfo.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="rememberMe">
            <el-checkbox v-model="registerInfo.rememberMe">7天内自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="sub2" round v-if="registerInfo.flag == false" @click="verifyImageCaptcha">注册
            </el-button>
            <el-button type="danger" class="sub2" round v-if="registerInfo.flag" @click="goRegister">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
  export default {
    name: 'LoginAndRegister',
    props: {
      isShow: {
        type: Boolean
      },
      name: {
        type: String,
        default: 'login'
      }
    },
    data: function () {
      return {
        registerInfo: {
          phone: null,
          password: null,
          imageCode: null,
          phoneCode: null,
          rememberMe: true,
          code: null,
          flag: false
        },
        image: null,
        loginInfo: {
          username: null,
          password: null,
          rememberMe: true
        }
      }
    },
    methods: {
      // 生成图片验证码
      generateImageCaptcha: async function () {
        const { data: res } = await this.$http.get('CustomerController/generateImageCaptcha')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.image = res.data.imageCaptcha.image
        sessionStorage.setItem('imageCode', JSON.stringify(res.data.imageCaptcha.imageCode))
      },
      // 验证图片验证码
      verifyImageCaptcha: async function () {
        this.registerInfo.code = JSON.parse(sessionStorage.getItem('imageCode'))
        const { data: res } = await this.$http.post('CustomerController/verifyImageCaptcha', this.registerInfo)
        if (!res.meta.access) {
          this.generateImageCaptcha()
          return this.$message.error(res.meta.msg)
        }
        sessionStorage.setItem('phoneCode', JSON.stringify(res.data.phoneCode))
        this.registerInfo.flag = true
      },
      // 进行注册信息提交
      goRegister: async function () {
        this.registerInfo.code = JSON.parse(sessionStorage.getItem('phoneCode'))
        const { data: res } = await this.$http.post('CustomerController/register', this.registerInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        sessionStorage.setItem('customer', JSON.stringify(res.data.customer))
        this.refresh()
      },
      login: async function () {
        const { data: res } = await this.$http.post('CustomerController/login', this.loginInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        sessionStorage.setItem('customer', JSON.stringify(res.data.customer))
        this.refresh()
      },
      cancel: function () {
        this.$emit('dialog-cancel')
      },
      dialogClose: function () {
        this.$refs.loginForm.resetFields()
        this.$refs.registerForm.resetFields()
      },
      refresh: function () {
        this.$router.push({
          path: '/refresh',
          query: { path: this.$route.fullPath }
        })
      }
    },
    created: function () {
      this.generateImageCaptcha()
    }
  }
</script>

<style lang="less">
  .sub2 {
    width: 100%;
  }

  .class {
    border-radius: 20px;
  }
</style>
