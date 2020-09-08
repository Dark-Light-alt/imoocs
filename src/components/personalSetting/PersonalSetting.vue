<template>
  <div class="personalSetting">
    <el-container>
      <div class="setting-content">
        <div class="setting-left">
          <div class="avator-wapper">
            <div class="avator-mode">
              <el-image :src="customer.customerPhoto"></el-image>
            </div>
            <div class="des-mode">
              <p>{{customer.customerNickname}}</p>
            </div>
          </div>
          <div class="navigation">
            <h2>账户管理</h2>
            <div class="line"></div>
            <el-aside width="216px">
              <el-menu default-active="1" router>
                <el-menu-item index="1" :route="{name: 'AccountSetting'}">
                  账号绑定
                  <i class="el-icon-arrow-right"></i>
                </el-menu-item>
                <el-menu-item index="2" :route="{name: 'PersonalInfo'}">
                  个人信息
                  <i class="el-icon-arrow-right"></i>
                </el-menu-item>
                <el-menu-item index="3" :route="{name: 'RealNameSystem'}">
                  实名认证
                  <i class="el-icon-arrow-right"></i>
                </el-menu-item>
              </el-menu>
            </el-aside>
          </div>
        </div>
        <div class="setting-right">
          <el-main>
            <router-view></router-view>
          </el-main>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'PersonalSetting',
    data: function () {
      return {
        customer: JSON.parse(sessionStorage.getItem('customer'))
      }
    }
  }
</script>

<style lang="less" scoped>
  a {
    text-decoration: none;
  }

  .personalSetting {
    background-color: rgb(255, 255, 255);
    min-height: 750px;
  }

  .setting-content {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0;

    .setting-left {
      float: left;
      width: 216px;
      background-color: #f8fafc;
      height: 500px;

      .avator-wapper {
        padding: 32px 0 24px;

        .avator-mode {
          position: relative;
          width: 100px;
          height: 100px;
          box-sizing: border-box;
          border: 4px solid #d9dde1;
          border-radius: 50px;
          margin: 0 auto;
          text-align: center;
          overflow: hidden;
        }

        .des-mode {
          font-size: 16px;
          text-align: center;

          p {
            line-height: 24px;
            width: 160px;
            margin: 8px auto 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .navigation {
        overflow: hidden;

        h2 {
          font-size: 16px;
          line-height: 24px;
          margin: 12px 24px;
          font-weight: 700;
        }

        .line {
          height: 1px;
          background-color: #d9dde1;
          margin: 0 24px;
        }
      }
    }

    .setting-right {
      float: left;
      margin-left: 48px;
      width: 936px;
      box-sizing: border-box;
      background-color: #fff;
      height: 500px;
    }
  }

  .el-aside {
    margin-top: 10px;

    .el-menu {
      border: 0;
      background-color: #f8fafc !important;

      .el-menu-item {
        padding-left: 54px !important;

        i {
          margin-left: 50px;
        }
      }

      .el-menu-item:hover {
        background-color: rgb(243, 245, 247);
        color: #f20d0d !important;
      }

      .el-menu-item.is-active {
        color: #fff !important;
        background-color: #f01414;
      }
    }
  }
</style>
