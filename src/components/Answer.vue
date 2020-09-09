<template>
  <div class="answer">
    <div class="container">
      <div class="header">
        <span class="name">
          <el-image :src="question.customer.customerPhoto"></el-image>
          <span>{{question.customer.customerNickname}}</span>
        </span>
        <div class="header-right">
          <span class="report" v-if="question.publisher !== customerId"
                @click="report(2,question.publisher,question.questionId)">举报</span>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{question.title}}</h1>
        <p>{{question.content}}</p>
        <div class="info">
          <span class="create-time">{{question.createTime}}</span>
          <span class="view-num">{{question.pageviews}} 浏览</span>
          <span class="total-comment">{{question.answer}} 回答</span>
        </div>
      </div>
      <div class="comments">
        <div class="comment" v-for="answer in answerList" :key="answer.answerId">
          <div class="comment-content">
            <div class="comment-author">
              <span>
                <el-image :src="answer.customer.customerPhoto"></el-image>
                <span>{{answer.customer.customerNickname}}</span>
              </span>
            </div>
            <div class="comment-inner">
              <p>{{answer.content}}</p>
              <div class="comment-info">
                <span class="create-time">{{answer.createTime}}</span>
                <span class="report" v-if="answer.publisher !== customerId"
                      @click="report(3,answer.publisher,answer.answerId)">举报</span>
                <span class="like el-icon-thumb" @click="like(answer.answerId)"> {{answer.likes}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="input">
          <el-input type="textarea" v-model="answerContent" :rows="6" maxlength="300" show-word-limit
                    placeholder="快来帮助他吧"></el-input>
          <br/>
          <br/>
          <el-button @click="append">回 答</el-button>
        </div>
      </div>
    </div>
    <Report :is-show="reportDialog.isShow" :reportType="reportDialog.reportType"
            :personBeReport="reportDialog.personBeReport" :resourceBeReport="reportDialog.resourceBeReport"
            @dialog-cancel="reportDialog.isShow = false"></Report>
  </div>
</template>

<script>
  import Report from '@/components/Report'

  export default {
    name: 'Answer',
    components: { Report },
    data: function () {
      return {
        questionId: this.$route.query.questionId,
        question: {},
        answerList: [],
        customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
        answerContent: null,
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
      findQuestion: async function () {
        const { data: res } = await this.$http.get(`QuestionController/findById/${this.questionId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.question = res.data.question
      },
      findAnswer: async function () {
        const { data: res } = await this.$http.get(`AnswerController/findByQuestion/${this.questionId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.answerList = res.data.answerList
      },
      append: async function () {
        let answer = {
          content: this.answerContent,
          publisher: this.customerId,
          questionId: this.questionId
        }
        const { data: res } = await this.$http.put('AnswerController/append', answer)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.answerContent = null
        this.findQuestion()
        this.findAnswer()
      },
      like: async function (answerId) {
        const { data: res } = await this.$http.get(`AnswerController/like/${answerId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.findAnswer()
      },
      report: function (reportType, personBeReport, resourceBeReport) {
        this.reportDialog.isShow = true
        this.reportDialog.reportType = reportType
        this.reportDialog.personBeReport = personBeReport
        this.reportDialog.resourceBeReport = resourceBeReport
      }
    },
    created: function () {
      this.findQuestion()
      this.findAnswer()
    }
  }
</script>

<style lang="less" scoped>
  .answer {
    margin-bottom: 25px;
  }

  .container {
    background-color: white;
    width: 840px;
    margin: 0px auto;
    padding: 20px;
    overflow: hidden;

    .header {
      height: 40px;

      .name {
        .el-image {
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          margin-right: 7px;
          height: 40px;
          width: 40px;
        }
      }

      .header-right {
        float: right;

        .report {
          margin-top: 13px;
          display: block;
          font-size: 12px;
          color: #d0d6d9;
        }

        .report:hover {
          color: #4d555d;
        }
      }
    }

    .content {
      padding: 15px 0;
      border-bottom: 1px solid #d0d6d9;

      .title {
        word-break: break-all;
        overflow: hidden;
        font-weight: bolder;
        font-size: 16px;
        line-height: 32px;
      }

      .info {
        padding-top: 15px;
        font-size: 12px;
        color: #d0d6d9;

        .view-num, .total-comment {
          float: right;
        }

        .view-num {
          margin-left: 15px;
        }
      }
    }

    .comments {
      .comment {
        position: relative;
        min-height: 80px;
        border-bottom: 1px solid #d0d6d9;

        .comment-content {
          padding: 10px 0;
          overflow: hidden;

          .comment-author {
            float: left;
            line-height: 1em;
            width: 90px;
            padding-top: 10px;
            text-align: center;

            span {
              color: #787d82;
              font-size: 12px;

              .el-image {
                width: 40px;
                border-radius: 50%;
              }

              span {
                display: block;
                line-height: 1.2em;
                height: 18px;
                margin: 3px 10px auto;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

          .comment-inner {
            position: relative;
            margin-left: 90px;
            padding: 10px 0 10px 20px;

            .comment-info {
              font-size: 12px;
              color: #d0d6d9;

              .report, .like {
                float: right;
              }

              .like {
                margin-top: 2px;
                margin-right: 25px;
              }

              .report:hover {
                color: #4d555d;
              }

              .like:hover {
                color: #f20d0d;
              }
            }
          }
        }
      }
    }

    .input {
      margin-top: 20px;

      .el-button {
        float: right;
        color: #fff;
        background-color: #1ca048;
        border-color: #1ca048;
      }
    }
  }
</style>
