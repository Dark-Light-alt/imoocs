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
          <i class="el-icon-star-off" @click="favorite">加入收藏</i>
        </div>
      </div>
    </div>
    <div class="course-main">
      <div class="left">
        <el-tabs v-model="activeName">
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
                  <a @click="courseLearn(video.videoId)" v-if="video.videoIsenable == 0">
                    <i class="el-icon-video-play"></i>
                    {{video.videoName}}
                    <span style="margin-left: 15px">{{showTime(video.duration)}}</span>
                  </a>
                </li>
              </ul>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="问答评论" name="问答评论">
            <el-card class="question" v-for="question in questionList" :key="question.questionId">
              <el-image :src="question.customer.customerPhoto"></el-image>
              <div class="content-box">
                <div class="info">
                  <a class="title" @click="answer(question.questionId)">{{question.title}}</a>
                  <p class="content">{{question.content}}</p>
                  <div class="bottom">
                    <span>{{question.answer}} 回答</span>
                    <span>{{question.pageviews}} 预览</span>
                    <span class="create-time">{{question.createTime}}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="课程评价" name="课程评价">
            <el-card class="evaluate-info">
              <div class="title">综合<br/>评分</div>
              <div class="score">{{rateInfo}}</div>
              <el-rate v-model="rateInfo" disabled></el-rate>
            </el-card>
            <el-button class="send-evaluate" @click="showEvaluateVisible">我要评价</el-button>
            <el-card class="evaluate" v-for="evaluate in evaluateList" :key="evaluate.evaluateId">
              <el-image :src="evaluate.customer.customerPhoto"></el-image>
              <div class="content-box">
                <div class="info">
                  <a>{{evaluate.customer.customerNickname}}</a>
                  <el-rate v-model="evaluate.score" disabled></el-rate>
                  <p class="content">
                    {{evaluate.content}}
                  </p>
                  <div class="bottom">
                    <el-button icon="el-icon-thumb" @click="giveALike(evaluate.evaluateId)">
                      {{evaluate.likes}}
                    </el-button>
                    <span>时间：{{evaluate.createTime}}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <el-card v-if="course.datasList.length !== 0">
          <h4>资料下载</h4>
          <ul class="downlist">
            <li v-for="data in course.datasList" :key="data.dataId">
              <a
                @click="downloadData(data.dataUrl)">
                <i class="el-icon-folder"></i>
                {{data.dataName}}
                <span>下载</span>
              </a>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
    <el-dialog title="我要评价" :visible.sync="evaluateVisible" width="30%">
      <span>评价一下：</span>
      <el-rate style="display: inline-block" v-model="evaluate.score"></el-rate>
      <br/>
      <br/>
      <el-input type="textarea" v-model="evaluate.content" :rows="4" maxlength="300" show-word-limit
                placeholder="说点好听的"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendEvaluate">发表评价</el-button>
      </span>
    </el-dialog>
    <LoginAndRegister :isShow="loginDialog.isShow" :name="loginDialog.name"
                      @dialog-cancel="loginDialog.isShow = false"></LoginAndRegister>
  </div>
</template>

<script>
  import LoginAndRegister from '@/components/LoginAndRegister'

  export default {
    name: 'FreeCourseLearn',
    components: {
      LoginAndRegister
    },
    data: function () {
      return {
        loginDialog: {
          isShow: false,
          name: 'login'
        },
        activeName: '课程章节',
        courseId: this.$route.query.courseId,
        course: {},
        rateInfo: 0.0,
        evaluateVisible: false,
        evaluate: {
          content: null,
          score: 5,
          author: null,
          evaluateType: 0,
          evaluateBeResource: null,
        },
        evaluateList: [],
        questionList: []
      }
    },
    methods: {
      showEvaluateVisible: function () {
        this.isLoginShow()
        if (this.loginDialog.isShow === false) {
          this.evaluateVisible = true
        }
      },
      sendEvaluate: async function () {
        this.evaluate.author = JSON.parse(sessionStorage.getItem('customer')).customerId
        this.evaluate.evaluateBeResource = this.courseId
        const { data: res } = await this.$http.put('EvaluateController/append', this.evaluate)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.evaluate.content = null
        this.$message.success(res.meta.msg)
        this.evaluateVisible = false
        this.findEvaluate()
        this.rate()
      },
      giveALike: async function (evaluateId) {
        this.isLoginShow()
        if (this.loginDialog.isShow === false) {
          const { data: res } = await this.$http.get(`EvaluateController/giveALike/${evaluateId}`)
          if (!res.meta.access) {
            return this.$message.error(res.meta.msg)
          }
          this.findEvaluate()
        }
      },
      courseLearn: async function (videoId) {
        this.isLoginShow()
        if (this.loginDialog.isShow === false) {
          let params = {
            customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
            courseId: this.courseId
          }
          const { data: res } = await this.$http.put('MyCourseController/append', params)
          if (!res.meta.access) {
            return this.$message.error(res.meta.msg)
          }
          this.$router.push({
            name: 'CourseLearn',
            query: {
              courseId: this.courseId,
              videoId: videoId
            }
          })
        }
      },
      rate: async function () {
        const { data: res } = await this.$http.get(`EvaluateController/rate/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.rateInfo = res.data.rate
      },
      findEvaluate: async function () {
        const { data: res } = await this.$http.get(`EvaluateController/findAll/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.evaluateList = res.data.evaluateList
      },
      findQuestion: async function () {
        const { data: res } = await this.$http.get(`QuestionController/findByCourse/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.questionList = res.data.questionList
      },
      answer: async function (questionId) {
        this.isLoginShow()
        if (this.loginDialog.isShow === false) {
          const { data: res } = await this.$http.get(`QuestionController/browse/${questionId}`)
          if (!res.meta.access) {
            return this.$message.error(res.meta.msg)
          }
          this.$router.push({
            name: 'Answer',
            query: { questionId: questionId }
          })
        }
      },
      findCourse: async function () {
        const { data: res } = await this.$http.get(`CourseController/previewCourse/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.course = res.data.course
      },
      favorite: async function () {
        this.isLoginShow()
        if (this.loginDialog.isShow === false) {
          let params = {
            courseId: this.courseId,
            customerId: JSON.parse(sessionStorage.getItem('customer')).customerId
          }

          const { data: res } = await this.$http.put('FavoritesController/append', params)
          if (!res.meta.access) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
        }
      },
      showTime (time) {
        if (time < 60) {
          return '(00:' + time + ')'
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
      },
      isLoginShow: function () {
        let customer = JSON.parse(sessionStorage.getItem('customer'))
        if (undefined === customer || null === customer) {
          this.loginDialog.isShow = true
        }
      }
    },
    created: function () {
      this.findCourse()
      this.findQuestion()
      this.findEvaluate()
      this.rate()
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

  .el-card {
    margin-bottom: 8px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
    border-radius: 12px;
  }

  .evaluate-info {
    margin-bottom: 25px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
    border-radius: 12px;
    overflow: hidden;

    .title {
      float: left;
      color: #1c1f21;
      line-height: 16px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .score {
      float: left;
      padding-left: 16px;
      font-size: 32px;
      font-weight: 700;
      color: #4d555d;
      line-height: 32px;
    }

    .el-rate {
      padding-left: 150px;
      margin-top: 5px;
    }
  }

  .evaluate {
    .el-image {
      position: absolute;
      margin-top: 10px;
      width: 48px;
      height: 48px;
      border-radius: 50%
    }

    .content-box {
      position: relative;
      padding-left: 64px;

      a {
        float: left;
        color: #787d82;
        font-size: 13px;
        font-weight: 600
      }

      .el-rate {
        float: right;
      }

      .content {
        float: none;
        line-height: 28px;
        font-size: 14px;
        color: #14191e;
        text-align: left;
        padding-top: 25px;
        word-break: break-all;
      }

      .bottom {
        margin-top: 10px;
        color: #b5b9bc;
        font-size: 12px;
        line-height: 20px;

        .el-button {
          border-radius: 25px;
          color: #545c63;
        }

        span {
          float: right;
        }
      }
    }
  }

  .send-evaluate {
    margin-left: 700px;
    margin-bottom: 15px;
  }

  .question {
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
    border-radius: 12px;
    box-sizing: border-box;
    margin-bottom: 8px;

    .el-image {
      position: absolute;
      margin-top: 10px;
      width: 48px;
      height: 48px;
      border-radius: 50%
    }

    .content-box {
      position: relative;
      padding-left: 64px;

      .title {
        float: left;
        font-size: 14px;
        font-weight: 600
      }

      .title:hover {
        color: rgb(240, 20, 20);
      }

      .content {
        float: none;
        line-height: 28px;
        font-size: 14px;
        color: #14191e;
        text-align: left;
        padding-top: 25px;
        word-break: break-all;
      }

      .bottom {
        margin-top: 10px;
        color: #b5b9bc;
        font-size: 12px;
        line-height: 20px;

        span {
          margin-right: 25px;
        }

        .create-time {
          float: right;
        }
      }
    }
  }
</style>
