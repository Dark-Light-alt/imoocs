<template>
  <div class="monograph">
    <div class="header">
      <div class="inner">
        <el-image :src="require('@/assets/img/monograph-log.png')"></el-image>
        <p>
          共
          <span>{{monographList.length}}</span>
          个专刊
        </p>
      </div>
    </div>
    <div class="main">
      <el-card v-for="item in monographList" :key="item.id">
        <div class="content">
          <a>
            <el-image :src="require('@/assets/img/test.png')"></el-image>
          </a>
          <div class="info">
            <h3>{{item.name}}</h3>
            <h5>{{item.about}}</h5>
            <el-image :src="item.teacherPhoto"></el-image>
            <span class="name">{{item.teacherName}}</span> /
            <span>{{item.teacherPosition}}</span>
            <span class="price">￥ {{item.price}}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Monograph',
    data: function () {
      return {
        monographList: [
          {
            id: 1,
            name: '前端高手必学课—剖析 React 内部运行机制',
            about: '让你具备框架设计者思维与视野',
            price: 42.0,
            teacherPhoto: 'https://img3.sycdn.imooc.com/5b8ce4920001e61c02000190-140-140.jpg',
            teacherName: '上古鹏',
            teacherPosition: '资深前端工程师',
          },
          {
            id: 2,
            name: '前端高手必学课—剖析 React 内部运行机制',
            about: '让你具备框架设计者思维与视野',
            price: 42.0,
            teacherPhoto: 'https://img3.sycdn.imooc.com/5b8ce4920001e61c02000190-140-140.jpg',
            teacherName: '上古鹏',
            teacherPosition: '资深前端工程师',
          },
          {
            id: 3,
            name: '前端高手必学课—剖析 React 内部运行机制',
            about: '让你具备框架设计者思维与视野',
            price: 42.0,
            teacherPhoto: 'https://img3.sycdn.imooc.com/5b8ce4920001e61c02000190-140-140.jpg',
            teacherName: '上古鹏',
            teacherPosition: '资深前端工程师',
          },
          {
            id: 4,
            name: '前端高手必学课—剖析 React 内部运行机制',
            about: '让你具备框架设计者思维与视野',
            price: 42.0,
            teacherPhoto: 'https://img3.sycdn.imooc.com/5b8ce4920001e61c02000190-140-140.jpg',
            teacherName: '上古鹏',
            teacherPosition: '资深前端工程师',
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    background: #fff;
    width: 100%;
    padding: 4px 0;
    box-shadow: 0 2px 4px 0 rgba(28, 31, 33, .06);
    border-top: 1px solid #f3f5f6;
    box-sizing: border-box;

    .inner {
      width: 1152px;
      margin: 0 auto;
      padding-right: 296px;
      overflow: hidden;
      box-sizing: border-box;
      height: 60px;

      .el-image {
        float: left;
        height: 60px;
        width: 296px;
      }

      p {
        float: right;
        margin-left: 22px;
        font-size: 14px;
        color: #9199a1;
        line-height: 60px;

        span {
          font-size: 14px;
          color: #9199a1;
          line-height: 60px;
        }
      }
    }
  }

  .main {
    width: 1152px;
    margin: 0 auto;
    margin-top: 28px;
    position: relative;
    min-height: 750px;

    .el-card {
      margin-bottom: 15px;

      .content {
        width: 100%;
        box-sizing: border-box;

        a {
          .el-image {
            margin-left: 50px;
            width: 138px;
            height: 157px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            box-sizing: border-box;
            -webkit-transition: all .5s;
          }
        }

        .info {
          width: 598px;
          padding: 0 0 16px 0;
          float: right;
          margin-right: 25%;

          .el-image {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: top center;
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
          }

          h3:hover {
            color: rgb(51, 119, 255);
          }

          .name {
            font-weight: bold;
          }

          .price {
            float: right;
            font-weight: bold;
            font-size: 20px;
            color: rgb(51, 119, 255);
          }
        }
      }
    }
  }
</style>
