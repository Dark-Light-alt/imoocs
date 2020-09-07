<template>
  <div class="courseLearn">
    <el-page-header @back="goback" :content="underwayVideo.videoName"></el-page-header>
    <div class="video-box">
      <div class="left">
        <div @click="drawer = true">
          <i class="el-icon-files"> 章节</i>
        </div>
        <div>
          <i class="el-icon-warning-outline" @click="report(0,null,underwayVideo.videoId)"> 举报</i>
        </div>
      </div>
      <video :src="underwayVideo.videoUrl" controls></video>
      <div class="right">
        <el-drawer :visible.sync="drawer" :with-header="false" size="400px">
          <div class="section-list">
            <ul v-for="chapter in chapterList" :key="chapter.chapterId">
              <li class="title">{{chapter.chapterName}}</li>
              <li class="li" v-for="video in chapter.videoList" :key="video.videoId"
                  @click="findVideo(video.videoId)">
                <i class="el-icon-video-play"></i>
                {{video.videoName}}
                <span>{{showTime(video.duration)}}</span>
                <span class="flag" v-if="underwayVideo.videoId === video.videoId">正在学</span>
              </li>
            </ul>
          </div>
        </el-drawer>
      </div>
    </div>
    <div class="main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="问答" name="问答">
          <el-button class="send-question" @click="questionVisible = true">我要发布</el-button>
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
          <div style="height: 50px"></div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="评论">
          <el-button class="send-comments" @click="commentVisible = true">我要发布</el-button>
          <el-card class="comments" v-for="comment in commentList" :key="comment.commentId">
            <el-image :src="comment.customer.customerPhoto"></el-image>
            <div class="content-box">
              <div class="info">
                <span class="name">{{comment.customer.customerNickname}}</span>
                <p class="content">{{comment.content}}</p>
                <div class="bottom">
                  <el-button icon="el-icon-thumb" @click="like(comment.commentId)">{{comment.likes}}</el-button>
                  <a class="report" v-if="comment.author !== customerId"
                     @click="report(1,comment.author,comment.commentId)">举报</a>
                  <span>{{comment.createTime}}</span>
                </div>
              </div>
            </div>
          </el-card>
          <div style="height: 50px"></div>
        </el-tab-pane>
        <el-tab-pane label="资料下载" name="资料下载">
          <el-card class="data" v-for="data in dataList" :key="data.dataId">
            <i class="el-icon-folder"></i>
            <span>{{data.dataName}}</span>
            <el-button @click="downloadData(data.dataUrl)">立即下载</el-button>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="我要评论" :visible.sync="commentVisible" width="30%" @close="commentContent = null">
      <el-input type="textarea" v-model="commentContent" :rows="4" maxlength="300" show-word-limit
                placeholder="扯淡、吐槽、表扬、鼓励......想说啥说啥！"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendComment">发表评论</el-button>
      </span>
    </el-dialog>
    <el-dialog title="我要提问" :visible.sync="questionVisible" width="50%">
      <el-input v-model="questionInfo.title" placeholder="请输入问题内容..."></el-input>
      <br/>
      <br/>
      <el-input type="textarea" v-model="questionInfo.content" :rows="6" maxlength="300" show-word-limit
                placeholder="请输入问题内容..."></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendQuestion">发布问题</el-button>
      </span>
    </el-dialog>

    <Report :is-show="reportDialog.isShow" :reportType="reportDialog.reportType"
            :personBeReport="reportDialog.personBeReport" :resourceBeReport="reportDialog.resourceBeReport"
            @dialog-cancel="reportDialog.isShow = false"></Report>

  </div>
</template>

<script>
  import Report from '@/components/Report'

  export default {
    name: 'CourseLearn',
    components: { Report },
    data: function () {
      return {
        courseId: this.$route.query.courseId,
        videoId: this.$route.query.videoId,
        customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
        underwayVideo: { videoId: null },
        chapterList: [],
        dataList: [],
        activeName: '问答',
        drawer: false,
        commentVisible: false,
        commentContent: null,
        commentList: [],
        questionVisible: false,
        questionInfo: {
          title: null,
          content: null,
          publisher: null,
          courseId: null,
          videoId: null
        },
        questionList: [],
        reportDialog: {
          // 显示与隐藏
          isShow: false,
          // 举报类型 0视频、1评论、2问题 3回答
          reportType: null,
          // 被举报人
          personBeReport: null,
          // 被举报源
          resourceBeReport: null
        }
      }
    },
    methods: {
      findVideo: async function (videoId) {
        const { data: res } = await this.$http.get(`VideoController/findById/${videoId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.underwayVideo = res.data.video
        this.findQuestion()
        this.findComment()
      },
      courseLearn: async function () {
        const { data: res } = await this.$http.get(`ChapterController/courseLearn/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.chapterList = res.data.chapterList
      },
      findData: async function () {
        const { data: res } = await this.$http.get(`DatasController/findAllByCourseId/${this.courseId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.dataList = res.data.dataList
      },
      findComment: async function () {
        const { data: res } = await this.$http.get(`CommentsController/findAll/${this.underwayVideo.videoId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.commentList = res.data.commentList
      },
      like: async function (commentId) {
        const { data: res } = await this.$http.get(`CommentsController/like/${commentId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.findComment()
      },
      sendComment: async function () {
        let comment = {
          content: this.commentContent,
          author: this.customerId,
          commentBeResource: this.underwayVideo.videoId
        }
        const { data: res } = await this.$http.put('CommentsController/append', comment)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.commentVisible = false
        this.findComment()
      },
      sendQuestion: async function () {
        this.questionInfo.videoId = this.underwayVideo.videoId
        this.questionInfo.courseId = this.courseId
        this.questionInfo.publisher = this.customerId

        const { data: res } = await this.$http.put('QuestionController/append', this.questionInfo)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.questionVisible = false
        this.findQuestion()
      },
      findQuestion: async function () {
        const { data: res } = await this.$http.get(`QuestionController/findByVideo/${this.underwayVideo.videoId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.questionList = res.data.questionList
      },
      answer: async function (questionId) {
        const { data: res } = await this.$http.get(`QuestionController/browse/${questionId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$router.push({
          name: 'Answer',
          query: { questionId: questionId }
        })
      },
      report: function (reportType, personBeReport, resourceBeReport) {
        this.reportDialog.isShow = true
        this.reportDialog.reportType = reportType
        this.reportDialog.personBeReport = personBeReport
        this.reportDialog.resourceBeReport = resourceBeReport
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
      goback: function () {
        this.$router.push({
          name: 'FreeCourseLearn',
          query: { courseId: this.courseId }
        })
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
      }
    },
    created: function () {
      this.findVideo(this.videoId)
      this.courseLearn()
      this.findData()
      this.findComment()
      this.findQuestion()
    }
  }
</script>

<style lang="less" scoped>

  .courseLearn {
    background: white;
  }

  .el-page-header {
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(28, 31, 33, .1);
    height: 60px;
    line-height: 60px;
    padding-left: 25px;
  }

  .video-box {
    overflow: hidden;

    .left {
      float: left;
      width: 5%;
      background: rgb(28, 31, 33);
      align-items: center;
      height: 600px;

      div {
        height: 72px;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        cursor: pointer;
        line-height: 72px;
        color: rgb(164, 165, 166);
      }

      div:hover {
        background: rgb(38, 41, 44);
        color: white;
      }
    }

    video {
      margin: 0 auto;
      height: 600px;
      width: 90%;
      background: rgb(0, 0, 0);
    }

    .right {
      float: right;
      width: 5%;
      background: rgb(28, 31, 33);
      align-items: center;
      height: 600px;

      .el-drawer {
        .section-list {
          width: 400px;
          background: #26292c;
          box-shadow: 0 8px 16px 0 #1c1f21;
          height: 100%;

          ul {
            .title {
              padding-top: 20px;
              padding-left: 15px;
              font-size: 14px;
              color: #fff;
              line-height: 22px;
              margin-bottom: 8px;
            }

            .li {
              padding-left: 25px;
              height: 30px;
              line-height: 30px;
              font-size: 13px;
              color: rgba(255, 255, 255, .6);

              .flag {
                margin-left: 80px;
                color: rgb(160, 24, 26);
              }
            }

            .li:hover {
              color: rgb(160, 24, 26);
            }
          }
        }
      }
    }
  }

  .main {
    width: 1152px;
    margin: 0 auto;
    min-height: 500px;

    .data {
      background: #fff;
      box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
      border-radius: 12px;
      box-sizing: border-box;
      margin-bottom: 8px;

      i {
        font-size: 25px;
      }

      span {
        margin-left: 10px;
      }

      .el-button {
        float: right;
        margin-bottom: 20px;
      }
    }

    .send-comments {
      margin-left: 1052px;
      margin-bottom: 15px;
    }

    .comments {
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

        .name {
          float: left;
          color: #787d82;
          font-size: 13px;
          font-weight: 600
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

          .report {
            margin-left: 50px;
          }

          .report:hover {
            color: rgb(77, 85, 93);
          }

          span {
            float: right;
          }
        }
      }
    }

    .send-question {
      margin-left: 1052px;
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
  }
</style>
