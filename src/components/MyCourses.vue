<template>
  <div class="myCourses">
    <div class="header">
      <div class="user-info">
        <div class="user-pic">
          <el-image :src="photo"></el-image>
        </div>
        <div class="user-info-right">
          <h3 class="user-name">
            <span>{{name}}</span>
          </h3>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="slider">
        <el-menu router>
          <el-menu-item index="1-1" route="Test">
            <i class="el-icon-menu"></i>
            <span slot="title">我的课程</span>
          </el-menu-item>
          <el-menu-item index="1-2" route="Test">
            <i class="el-icon-menu"></i>
            <span slot="title">收藏</span>
          </el-menu-item>
          <el-menu-item index="1-2" route="Test">
            <i class="el-icon-menu"></i>
            <span slot="title">笔记</span>
          </el-menu-item>
          <el-menu-item index="1-3" route="Test">
            <i class="el-icon-menu"></i>
            <span slot="title">专栏</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyCourses',
    data: function () {
      return {
        photo: 'https://img3.sycdn.imooc.com/5b8ce4920001e61c02000190-140-140.jpg',
        name: '爱慕课'
      }
    }
  }
</script>

<style lang="less" scoped>
  .myCourses {
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
          background: #fff;
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
    margin: 40px auto 0 auto;

    .slider {
      width: 172px;
      float: left;

      .el-menu {
        background-color: rgb(243, 245, 246);
        border: 0;
      }

      .el-menu-item {
        background-color: rgb(243, 245, 246);
        font-size: 16px;
        line-height: 48px;
        color: #787d82;
      }

      .el-menu-item.is-active {
        color: #fff;
        background: rgba(240, 20, 20, .8);
        border-radius: 8px;
      }
    }

    .content {
      padding-left: 200px;
    }
  }
</style>
