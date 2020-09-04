<template>
  <div class="practiceCourseBuy">
    <div class="course-infos-top">
      <div class="info">
        <div title="title-box">
          <h1>{{course.courseName}}</h1>
        </div>
      </div>
      <el-card>
        <div class="left">
          <div class="price">￥{{course.price}}</div>
          <div class="course-info">
            <span>难度</span>
            <span v-if="course.courseLevel == 0">入门</span>
            <span v-if="course.courseLevel == 1">初级</span>
            <span v-if="course.courseLevel == 2">中级</span>
            <span v-if="course.courseLevel == 3">高级</span>
            <span>·</span>
            <span>时长</span>
            <span>{{showTotalTime(course.chapterList)}}</span>
            <span>·</span>
            <span>学习人数</span>
            <span>{{course.numberOfStudents}}</span>
          </div>
        </div>
        <div class="right">
          <el-button class="buy" @click="buy">立即购买</el-button>
          <el-button class="shopping-cart" @click="addShoppingCart">加入购物车</el-button>
        </div>
      </el-card>
    </div>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程介绍" name="课程介绍">
          <el-card class="content">
            <div class="course-about">
              <h2>{{course.courseName}}</h2>
              <p>{{course.courseAbout}}</p>
            </div>
            <div class="teacher-info">
              <el-image :src="course.employeeInfo.photo"></el-image>
              <h3>{{course.employeeInfo.employeeName}}</h3>
              <p>{{course.employeeInfo.position.positionName}}</p>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="章节介绍" name="章节介绍">
          <el-card class="chapter" v-for="chapter in course.chapterList" :key="chapter.chapterId">
            <h4>{{chapter.chapterName}}</h4>
            <div class="chapter-description">{{chapter.chapterName}}</div>
            <ul class="video">
              <li v-for="video in chapter.videoList" :key="video.videoId">
                <i class="el-icon-video-play"></i>
                {{video.videoName}}
                <el-button v-if="video.tryAndSee === 0">试看</el-button>
              </li>
            </ul>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PracticeCourseBuy',
    data: function () {
      return {
        activeName: '课程介绍',
        courseId: this.$route.query.courseId,
        course: {}
      }
    },
    methods: {
      buy: function () {
        this.$router.push({
          name: 'ConfirmOrder',
          query: { courseId: this.courseId }
        })
      },
      addShoppingCart: async function () {
        let shoppingCartInfo = {
          courseId: this.courseId,
          customerId: JSON.parse(sessionStorage.getItem('customer')).customerId
        }
        const { data: res } = await this.$http.put('ShoppingCartController/append', shoppingCartInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
      },
      findCourse: async function () {
        const { data: res } = await this.$http.get(`CourseController/previewCourse/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.course = res.data.course
      },
      showTotalTime (chapterList) {
        let totalSec = 0
        for (let i = 0; i < chapterList.length; i++) {
          let videoList = chapterList[i].videoList
          for (let j = 0; j < videoList.length; j++) {
            let video = videoList[j]
            totalSec = totalSec + video.duration
          }
        }

        if (totalSec < 60) {
          if (totalSec < 10) {
            return '00: 0' + totalSec
          }
          return '00: ' + totalSec
        }

        let totalMin = Math.floor(totalSec / 60)
        if (totalMin < 60) {
          return totalMin + '分'
        }
        if (totalMin == 60) {
          return '1小时'
        }
        let totalHour = Math.floor(totalMin / 60)
        let min = Math.floor(totalMin % 60)
        return totalHour + '小时' + min + '分'
      },
      handleClick: function (tab, event) {

      }
    },
    created: function () {
      this.findCourse()
    }
  }
</script>

<style lang="less" scoped>
  .course-infos-top {
    width: 100%;
    position: relative;
    background-image: url("../assets/img/course.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .info {
      width: 1152px;
      margin: 0 auto;
      padding-top: 72px;
      padding-bottom: 136px;
      position: relative;

      h1 {
        text-align: center;
        font-size: 40px;
        color: #fff;
        line-height: 48px;
        text-shadow: 0 2px 4px rgba(28, 31, 33, .6);
      }
    }

    .el-card {
      width: 1152px;
      min-height: 128px;
      position: absolute;
      left: 50%;
      margin-left: -576px;
      bottom: -64px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      box-shadow: 0 8px 16px 0 rgba(28, 31, 33, .1);
      background-image: url('../assets/img/pay-background.png');
      border-radius: 18px;

      .left {
        float: left;
        padding-left: 50px;

        .price {
          font-size: 32px;
          color: #f01414;
          line-height: 32px;
          font-weight: 700;
        }

        .course-info {
          margin-top: 25px;

          span {
            margin-left: 10px;
            font-size: 12px;
          }
        }
      }

      .right {
        float: right;
        padding-right: 50px;

        .el-button {
          border: 0px;
        }

        .buy {
          margin-top: 15px;
          background: #f01414;
          border-radius: 24px;
          font-size: 16px;
          color: #fff;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 700;
          padding: 12px 48px;
        }

        .shopping-cart {
          background: rgba(240, 20, 20, .1);
          border-radius: 24px;
          font-size: 16px;
          color: #f20d0d;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: 700;
          padding: 12px 48px;
        }
      }
    }
  }

  .main {
    width: 1152px;
    margin: 80px auto 48px auto;

    .content {
      border-radius: 16px;
      background-size: cover;
      background-position: center;
      height: 448px;
      background-image: url("../assets/img/course.png");

      .course-about {
        height: 350px;
        width: 500px;
        padding: 64px 70px 0 64px;
        color: #fff;
        border-right: 2px solid rgb(203, 122, 102);
        float: left;

        p {
          font-size: 14px;
          line-height: 28px;
        }
      }

      .teacher-info {
        float: right;
        width: 400px;
        padding-top: 49px;
        color: white;
        text-align: center;

        .el-image {
          height: 132px;
          width: 132px;
          border-radius: 50%;
        }
      }
    }

    .chapter {
      padding: 0 150px 0px 50px;
      margin-bottom: 25px;

      h4 {
        margin: 0;
        color: #1c1f21;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
      }

      .chapter-description {
        margin-top: 2px;
        font-size: 12px;
        color: #545c63;
        line-height: 18px;
        margin-bottom: 10px;
      }

      .video li {
        padding: 12px 0;
        border-top: 1px solid rgba(28, 31, 33, .1);
        line-height: 24px;

        .el-button {
          margin-left: 350px;
          padding: 10px 20px;
          font-size: 12px;
          background: rgba(242, 13, 13, .1);
          border-radius: 12px;
          color: #f20d0d;
          font-weight: 700;
          border: 0;
        }
      }
    }
  }
</style>
