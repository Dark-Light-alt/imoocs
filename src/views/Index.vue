<template>
  <div class="index">
    <el-container>
      <el-header height="40px">
        <div class="header-left">
          <ul class="nav-item">
            <li>
              <router-link :to="{name: 'Home'}">慕课网首页</router-link>
            </li>
            <li>
              <router-link :to="{name: 'FreeCourse'}">免费课程</router-link>
            </li>
            <li>
              <router-link :to="{name: 'PracticeCourse'}">实战课程</router-link>
            </li>
            <li>
              <router-link :to="{name: 'Monograph'}">专栏</router-link>
            </li>
          </ul>
        </div>
        <div class="header-right">
          <ul class="nav-item" v-if="null === customer">
            <li>
              <a @click="showLoginDialog('login')">登录</a>
            </li>
            <li>
              <a @click="showLoginDialog('register')">注册</a>
            </li>
          </ul>
          <ul class="nav-item" v-if="null !== customer">
            <li>
              <router-link class="el-icon-shopping-cart-2" :to="{name: 'ShoppingCart'}"></router-link>
            </li>
            <li>
              <router-link class="el-icon-bell" to="inform"></router-link>
            </li>
            <li>
              <router-link class="mycourse" :to="{name: 'MyCourse'}">我的课程</router-link>
            </li>
            <li v-if="null !== customer">
              <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar :src="customer.customerPhoto"></el-avatar>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-s-management" command="MyCourse">我的课程</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-order" command="OrderCenter">订单中心</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-tools" command="AccountSetting">个人设置</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-switch-button" @click.native="logout" divided>安全退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer height="100px">
        <ul>
          <li>
            <router-link :to="{name: 'Home'}">网站首页</router-link>
          </li>
          <li>
            <a>联系我们</a>
          </li>
          <li>
            <a>讲师招募</a>
          </li>
          <li>
            <a>意见反馈</a>
          </li>
        </ul>
      </el-footer>
    </el-container>
    <LoginAndRegister :isShow="loginDialog.isShow" :name="loginDialog.name"
                      @dialog-cancel="loginDialog.isShow = false"></LoginAndRegister>
  </div>
</template>

<script>
  import LoginAndRegister from '@/components/LoginAndRegister.vue'

  export default {
    name: 'Index',
    data: function () {
      return {
        loginDialog: {
          isShow: false,
          name: null
        },
        customer: null
      }
    },
    methods: {
      showLoginDialog: function (name) {
        this.loginDialog.isShow = true
        this.loginDialog.name = name
      },
      logout: async function () {
        sessionStorage.clear()
        const { data: res } = await this.$http.get('CustomerController/logout')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.refresh()
      },
      autoLogin: async function () {
        if (sessionStorage.getItem('customer') != null) {
          return this.customer = JSON.parse(sessionStorage.getItem('customer'))
        }
        const { data: res } = await this.$http.get('CustomerController/autoLogin')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.customer = res.data.customer
        sessionStorage.setItem('customer', JSON.stringify(res.data.customer))
      },
      handleCommand: function (command) {
        this.$router.push({ name: command })
      },
      refresh: function () {
        this.customer = JSON.parse(sessionStorage.getItem('customer'))
        this.$router.push({ name: 'Home' })
      }
    },
    created: function () {
      this.autoLogin()
    },
    components: { LoginAndRegister }
  }
</script>

<style lang="less" scoped>
  a {
    text-decoration: none;
  }

  .el-header {
    padding: 0px 70px 0px 70px;
    background-color: rgb(7, 17, 27);

    .header-left {
      font-size: 14px;
    }

    .header-left .nav-item, li {
      float: left;
      list-style: none;
    }

    .header-left .nav-item li > a {
      display: block;
      height: 40px;
      line-height: 40px;
      color: #717a84;
      font-weight: bold;
      position: relative;
      padding: 0 18px;
    }

    .header-left .nav-item li > a {
      display: block;
      height: 40px;
      line-height: 40px;
      color: #717a84;
      font-weight: bold;
      position: relative;
      padding: 0 18px;
    }

    .nav-item li > a:hover {
      color: #fff;
    }

    .header-right {
      float: right;

      .nav-item > li {
        float: left;
        list-style: none;
        padding-left: 25px;
      }

      .el-avatar {
        height: 30px;
        width: 30px;
        position: sticky;
        top: 5px;
      }

      .nav-item li > a {
        line-height: 40px;
        color: #717a84;
      }

      .nav-item li > a:hover {
        color: #fff;
      }

      .mycourse {
        font-size: 12px;
      }
    }
  }

  .el-main {
    padding: 0px;
    background-color: rgb(243, 245, 246);
    min-height: 750px;
  }

  .el-footer {
    background-color: rgb(7, 17, 27);
    padding-left: 200px;

    ul li {
      line-height: 100px;
      float: left;
      list-style: none;
    }

    ul li {
      margin-right: 35px;
    }

    ul li > a {
      font-size: 12px;
      color: #717a84;
    }

    ul li > a:hover {
      color: #fff;
    }
  }
</style>
