<template>
  <div class="confirmOrder">
    <div class="header">
      <div class="header-content">
        <h1>确认订单</h1>
      </div>
    </div>
    <div class="content">
      <el-card class="top">
        <p>商品信息</p>
        <div class="course-info">
          <el-image :src="course.cover"></el-image>
          <div class="course-name">{{course.courseName}}</div>
          <div class="course-price">￥{{course.price}}</div>
        </div>
        <div class="button">
          <p>应付：<span class="price">￥{{course.price}}</span></p>
          <el-button>提交订单</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConfirmOrder',
    data: function () {
      return {
        courseId: this.$route.query.courseId,
        course: {}
      }
    },
    methods: {
      findCourse: async function () {
        const { data: res } = await this.$http.get(`CourseController/findById/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.course = res.data.course
      }
    },
    created: function () {
      this.findCourse()
    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 160px;
    background-color: #e3e6e9;
    background: url('../assets/img/shoppingCart-background.jpg') repeat-x left bottom;

    .header-content {
      width: 1104px;
      height: 120px;
      line-height: 120px;
      margin-left: auto;
      margin-right: auto;
      font-size: 14px;

      h1 {
        margin: 0;
        font-size: 32px;
        line-height: 115px;
        margin-right: 25px;
        color: #07111b;
        font-weight: 200;
      }
    }
  }

  .content {
    .top {
      width: 1152px;
      padding: 0 36px 32px;
      background-color: #fff;
      margin-top: -40px;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 0 8px 16px 0 rgba(7, 17, 27, .1);
      border-radius: 8px;
      box-sizing: border-box;

      .course-info {
        padding: 24px;
        box-sizing: border-box;
        background: #f3f5f7;
        overflow: hidden;

        .el-image {
          height: 155px;
          width: 260px;
          float: left;
          margin-right: 24px;
        }

        .course-name {
          float: left;
          padding-top: 60px;
        }

        .course-price {
          float: right;
          padding-right: 150px;
          padding-top: 60px;
          font-size: 19px;
          color: #f01414;
        }
      }

      .button {
        margin-top: 25px;
        overflow: hidden;

        p {
          float: left;

          .price {
            color: #f01414;
            font-size: 24px;
            font-weight: 700;
          }
        }

        .el-button {
          float: right;
          background: #f01414;
          border-radius: 24px;
          font-size: 16px;
          color: #fff;
          letter-spacing: 0;
          line-height: 24px;
          padding: 12px 48px;
          border: 0;
        }
      }
    }
  }
</style>
