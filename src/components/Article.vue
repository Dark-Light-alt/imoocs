<template>
  <div>
    <el-container>
      <el-header>
          <span class="monographName" @click="showMonographDetials()">{{monograph.monographName}}</span>/
        <span>{{article.articleName}}</span>
      </el-header>
      <el-container>
        <el-aside width="325px" class="el-aside">
          <div style="margin-left: 15px;overflow:auto;height:1100px">
            <div style="font-size:20px;margin: 10px 0 10px 0;font-family: 微软雅黑">目录</div>
            <div v-for="(monograph,i) in monographList" :key="i">
              <div v-for="(chapter,j) in monograph.chapterList" :key="j">
                <div class="chapter">第{{j+1}}章:&nbsp;{{chapter.chapterName}}</div>
                <div v-for="(article,x) in chapter.articleList" :key="x">
                  <div class="article" @click="readArticle(article.articleId)">
                    <div v-if="article.articleId!=null">
                      0{{x+1}}&nbsp;{{article.articleName}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <el-card>
            <div style="border-bottom:2px solid rgb(249,249,250);height: 150px;width: 855px">
              <div class="img">
                <el-image
                  style="width: 100px; height: 130px"
                  :src="monograph.cover"></el-image>
              </div>
              <div style="float: left;margin-left: 15px;text-align: left;height: 110px">
                <span style="font-size: 20px;font-weight: bold">{{monograph.monographName}}</span>
                <div class="hightlights">
                  {{monograph.highlights}}
                </div>
              </div>
            </div>
            <v-md-editor :value="fileContent" mode="preview"></v-md-editor>
          </el-card>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
    export default {
      name: "Article",
      data: function () {
        return {
          fileContent: '',
          article: {},
          monographList:[],
          showDialogVisible:false,
          monograph:{},
          isShow:false
        }
      },
      methods:{
        readArticle:async function(articleId){
          //读取文章
          const {data: res} = await this.$http.get(`ArticleController/readFile/${articleId}`)
          if(!res.meta.access){
            this.$message.error(res.meta.msg)
          }
          this.article = res.data.article;
          //文章内容
          this.fileContent = res.data.fileContent;
        },
        findChapter: async function(articleId){
          //根据文章id查询目录
          const {data: res} = await this.$http.get(`MonographController/listAllArticle/${articleId}`)
          if(!res.meta.access){
            this.$message.error(res.meta.msg)
          }
          this.monographList = res.data.monographList;
        },
        showMonographDetials: async function() {
          sessionStorage.setItem("monograph",JSON.stringify(this.monograph));
          //跳转到专刊详情页面
          this.$router.push({name:"MonographDetials"});
        }
      },
      created:function(){
        //获取参数
        let articleId = this.$route.query.articleId;
        this.monograph = JSON.parse(sessionStorage.getItem("monograph"));
        //查询章节目录
        this.findChapter(articleId);
        //读取文章
        this.readArticle(articleId);
      }
    }
</script>

<style scoped>
  .el-header{
    border-bottom:2px solid rgb(249,249,249);
    background-color: rgb(255,255,255);
    color: #333;
    text-align: center;
    line-height: 60px;
    padding-bottom: 20px;
  }

  .el-aside {
    background-color: rgb(255,255,255);
    color: #333;
    width: 300px;
    float: left;
  }

  .el-main {
    background-color: rgb(243,245,246);
    color: #333;
    text-align: center;
    height: 1000px;
    overflow: auto;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .monographName{
    font-size: 20px;
  }

  .monographName:hover{
    color: rgb(51, 119, 255);
  }

  .chapter{
    border-top: 2px solid rgb(249,249,249);
    border-bottom:2px solid rgb(249,249,249);
    padding: 20px 0 20px 0;
    width: 100%;
    font-size: 17px;
    font-weight:bold;
  }

  .article{
    border-top: 1px solid rgb(249,249,249);
    border-bottom:2px solid rgb(249,249,249);
    padding: 20px 0 20px 0;
    font-size: 15px;
    font-family: "微软雅黑";
  }

  .el-card{
    width: 900px;
    margin-left: 130px;
  }

  .img{
    float: left;
    margin-left: 40px;
  }

  .hightlights{
    font-size: 13px;
    font-family: 微软雅黑;
    color: gray;
    height: 30px;
    width: 500px;
    font-weight: bold;
    padding: 10px 0 20px 0;
  }


</style>
