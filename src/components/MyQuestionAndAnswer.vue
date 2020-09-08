<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的问题" name="1">
        <el-card class="question" v-for="(question,index) in questionList" :key="index">
          <div class="answerNum" @click="showDetials(question.questionId)">
            {{question.answer}}<br>
            <span>回答</span>
          </div>
          <div style="float:left;margin-left: 20px">
            <span class="title" @click="showDetials(question.questionId)">{{question.title}}</span><br>
            <div>
              <i class="el-icon-video-camera" style="background-color: rgb(232,247,237);margin-right: 6px;"></i>
              <span class="video">{{question.video.videoName}}</span>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="我的回答" name="2">
        <el-card class="answer" v-for="(answer,index) in answerList" :key="index">
          <div class="video">
            来自:
            <span>{{answer.video.videoName}}</span>
          </div>
          <div style="font-size: 23px;font-weight: bold;margin-bottom: 20px">{{answer.question.title}}</div>
          <div style="font-size: 17px;font-weight: bold">我的回答:</div>
          <div class="content" @click="showDetials(answer.question.questionId)">{{answer.content}}</div>
          <span style="font-size: 13px;color: rgb(145,153,161);">{{answer.createTime}}</span>
        </el-card>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
    export default {
      name: "MyQuestionAndAnswer",
      data:function () {
        return {
          questionList:[],
          activeName:'1',
          customer:{},
          answerList:[]
        }
      },
      methods:{
        handleClick:function(tab,event){
          this.activeName=tab.name;
          this.findQuestionByCustomer();
        },
        findQuestionByCustomer:async function(){
          const {data: res} = await this.$http.get(`QuestionController/findByCustomer/${this.customer.customerId}`);
          if(!res.meta.access){
            this.$message.error(res.meta.msg);
          }
          this.questionList = res.data.questionList;
        },
        findAnswerByCustomer:async function(){
          const {data:res} = await this.$http.get(`AnswerController/findByCustomer/${this.customer.customerId}`);
          if(!res.meta.access){
            this.$message.error(res.meta.msg);
          }
          this.answerList=res.data.answerList;
        },
        showDetials:function(questionId){
          this.$router.push({name:"Answer",query:{questionId:questionId}});
        }
      },
      created:function(){
        this.customer = JSON.parse(sessionStorage.getItem("customer"));
        this.findQuestionByCustomer();
        this.findAnswerByCustomer();
      }
    }
</script>

<style scoped>
  .question{
    margin-bottom: 20px;
    height: 100px;
  }

  .answerNum{
    float: left;
    color: rgb(31,173,152);
    width: 35px;
    font-weight: bold;
    text-align: center;
  }

  .title{
    font-size: 17px;
    font-weight: bold;
  }

  .title:hover{
    color: rgb(31,173,152);
  }

  .video{
    font-size: 13px;
    color: rgb(145,153,161);
  }

  .video:hover{
    color: red;
  }

  .answer{
    margin-bottom: 20px;
  }

  .content{
    font-family: 微软雅黑;
  }

  .content:hover{
    color: red;
  }


</style>
