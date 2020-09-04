<template>
  <div class="freeCourseLearn">
    <div class="course-infos"
         :style="{backgroundImage: 'linear-gradient(to right, rgba(0,0,0,.8), rgba(0,0,0,.4)),url(' + course.cover + ')'}">
      <div class="course-info">
        <div class="course-name">
          <h2>{{course.courseName}}</h2>
        </div>
        <div class="course-details">
          <div class="teacher-info">
            <router-link :to="{name: 'Home'}">
              <el-image :src="course.employeeInfo.photo"></el-image>
            </router-link>
            <span class="teacher-name">{{course.employeeInfo.employeeName}}</span>
            <span>{{course.employeeInfo.position.positionName}}</span>
          </div>
          <div class="details">
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
          <i class="el-icon-star-off">加入收藏</i>
        </div>
      </div>
    </div>
    <div class="course-main">
      <div class="left">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程章节" name="课程章节">
            <el-card>
              简介：{{course.courseAbout}}
            </el-card>
            <el-card v-for="chapter in course.chapterList" :key="chapter.chapterId">
              <h4>{{chapter.chapterName}}</h4>
              <div class="chapter-description">
                {{chapter.chapterAbout}}
              </div>
              <ul class="video">
                <li v-for="video in chapter.videoList" :key="video.videoId">
                  <router-link :to="{name: 'Home'}">
                    <i class="el-icon-video-play"></i>
                    {{video.videoName}}
                    <span style="margin-left: 15px">{{showTime(video.duration)}}</span>
                  </router-link>
                </li>
              </ul>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="问答评论" name="问答评论">问答评论</el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <el-card v-if="course.datasList.length !== 0">
          <h4>资料下载</h4>
          <ul class="downlist">
            <li v-for="data in course.datasList" :key="data.dataId">
              <a
                @click="downloadData('https://imoocs.oss-cn-shanghai.aliyuncs.com/data/a4e58f94-336f-4c26-9911-5b4d2ee064de.txt')">
                <i class="el-icon-folder"></i>
                {{data.dataName}}
                <span>下载</span>
              </a>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FreeCourseLearn',
    data: function () {
      return {
        activeName: '课程章节',
        courseId: this.$route.query.courseId,
        course: {}
      }
    },
    methods: {
      findCourse: async function () {
        const { data: res } = await this.$http.get(`CourseController/previewCourse/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.course = res.data.course
      },
      showTime (time) {
        if (time < 60) {
          return '00:' + time
        }
        let min = Math.floor(time / 60)
        let sec = Math.floor(time % 60)
        if (min < 60) {
          let m
          let s
          if (min < 10) {
            m = '0' + min
          } else {
            m = min
          }
          if (sec < 10) {
            s = '0' + sec
          } else {
            s = sec
          }
          return '(' + m + ':' + s + ')'
        }
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
      downloadData: function (url) {
        this.$http({
          method: 'post',
          data: { url: url },
          url: 'DatasController/download',
          responseType: 'blob'
        }).then(response => {
          this.download(response)
        })
          // .catch(response => {
          //   this.$message.error('文件下载失败')
          // })
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
  a {
    text-decoration: none;
  }

  .course-infos {
    width: 100%;
    height: 200px;
    background-size: cover;
    color: white;

    .course-info {
      height: 200px;
      max-width: 1152px;
      margin: 0 auto;

      .course-name {
        h2 {
          margin: 0;
          padding-top: 35px;
        }
      }

      .course-details {
        overflow: hidden;
        line-height: 116px;

        i {
          margin-left: 250px;
          color: rgba(255, 255, 255, .4);
        }

        i:hover {
          color: white;
        }

        .teacher-info {
          float: left;
          margin-top: 25px;
          line-height: 12px;
          font-size: 12px;
          overflow: hidden;

          .el-image {
            float: left;
            width: 48px;
            height: 48px;
            border-radius: 100%;
          }

          .teacher-name {
            display: inline-block;
            margin-top: 3px;
            font-weight: 700;
            font-size: 14px;
          }

          span {
            padding-top: 25px;
            padding-left: 15px;
          }
        }

        .details {
          float: left;
          margin-left: 50px;

          span {
            margin-left: 10px;
            font-size: 12px;
          }
        }
      }
    }
  }

  .course-main {
    max-width: 1152px;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 25px;

    .left {
      float: left;
      width: 800px;

      .el-card {
        margin-top: 10px;

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
        }

        .video {
          padding-top: 16px;

          a {
            display: inline-block;
            padding-left: 12px;
            height: 48px;
            line-height: 48px;
            color: #1c1f21;
            width: 100%;
          }

          a:hover {
            border-radius: 5px;
            color: rgb(242, 13, 13);
            background-color: rgb(254, 243, 243);
          }
        }
      }
    }

    .right {
      float: right;
      margin-top: 40px;
      width: 320px;

      .el-card {
        h4 {
          margin: 0;
        }

        .downlist {
          line-height: 24px;

          li {
            padding: 12px 0;
            border-bottom: 1px solid #d9dde1;

            a {
              display: block;
              margin-right: 35px;
              font-size: 12px;
              color: #4d555d;

              span {
                float: right;
                color: #00b33b;
                width: 40px;
                text-align: center;
              }

              span:hover {
                color: white;
                background-color: #00b33b;
              }
            }

            a:hover {
              color: #07111b;
            }
          }
        }
      }
    }
  }
</style>
