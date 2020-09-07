<template>
  <div class="myLearn">
    <div class="header">
      <div class="user-info">
        <div class="user-pic">
          <el-image :src="customer.customerPhoto"></el-image>
        </div>
        <div class="user-info-right">
          <h3 class="user-name">
            <span>{{customer.customerNickname}}</span>
          </h3>
        </div>
      </div>
    </div>
    <div class="main">
      <el-container>
        <el-aside width="172px">
          <el-menu default-active="1" router>
            <el-menu-item index="1" :route="{name: 'MyCourse'}"><i class="el-icon-reading"></i>我的课程</el-menu-item>
            <el-menu-item index="2" :route="{name: 'MyFavorite'}"><i class="el-icon-collection"></i>我的收藏</el-menu-item>
            <el-menu-item index="3" :route="{name: 'MyMonograph'}"><i class="el-icon-notebook-2"></i>我的专栏</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyLearn',
    data: function () {
      return {
        customer: {}
      }
    },
    methods: {
      getCustomerInfo: function () {
        this.customer = JSON.parse(sessionStorage.getItem('customer'))
      }
    },
    created: function () {
      this.getCustomerInfo()
    }
  }
</script>

<style lang="less" scoped>
  .myLearn {
    min-height: 750px;
  }

  .header {
    height: 148px;
    background: url('../assets/img/user-info-header-background.png') no-repeat center top #000;
    background-size: cover;

    .user-info {
      position: relative;
      width: 1152px;
      margin: 0 auto;

      .user-pic {
        float: left;
        width: 148px;
        height: 148px;

        .el-image {
          border: 4px solid #fff;
          box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
          width: 140px;
          height: 140px;
          position: relative;
          border-radius: 50%;
          top: 24px;
        }
      }

      .user-info-right {
        float: right;
        width: 980px;

        .user-name {
          font-weight: 600;
          text-align: left;
          font-size: 24px;
          color: #fff;
          line-height: 28px;
          margin-top: 60px;

          span {
            float: left;
          }
        }
      }
    }
  }

  .main {
    width: 1200px;
    margin: 40px auto;

    .el-aside {
      background-color: rgb(243, 245, 246);
      min-height: 600px;

      .el-menu {
        background-color: rgb(243, 245, 246);
        border: 0px;

        .el-menu-item {
          color: rgb(120, 125, 130);
          border-radius: 8px;
        }

        .el-menu-item:hover {
          background-color: rgb(243, 245, 246);
          color: rgb(20, 25, 30);
        }

        .el-menu-item.is-active {
          background: rgba(240, 20, 20, .8);
          border-radius: 8px;
          color: #fff !important;
        }
      }
    }

    .el-main {
      background-color: rgb(243, 245, 246);
      min-height: 600px;
      padding-top: 0px;
    }
  }
</style>
