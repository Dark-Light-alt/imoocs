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
                  <div class="article" @click="findArticle(article.articleId)">
                    <div v-if="article.articleId!=null">
                      0{{x+1}}&nbsp;{{article.articleName}}
                      <span v-if="article.tryReading==1 && hasMonograph==0" style="float: right;font-size: 13px;color: rgb(51,119,255);font-weight: bold;margin-right: 15px">试读</span>
                      <span style="float: right;margin-right: 15px">
                        <i class="el-icon-lock" v-if="article.tryReading==0 && hasMonograph==0"></i>
                      </span>
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
                <div class="price">
                  ￥ {{monograph.price}}
                  <div style="float: right;" v-if="hasMonograph==0">
                    <el-button type="primary" round @click="subscribeNow()">立即订阅</el-button>
                  </div>
                </div>
              </div>
            </div>

            <v-md-editor :value="fileContent" mode="preview"></v-md-editor>
          </el-card>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog :visible.sync="showDialogVisible" width="20%" height="350px" center>
      <div style="text-align: center">
        <el-image :src="monograph.cover" style="height: 180px;width: 150px"></el-image>
      </div>
      <h3>{{monograph.monographName}}</h3>
      <div style="font-size: 22px;color: rgb(64,158,255);padding: 5px 0 5px 0;font-weight: bold;text-align: center">价格:￥ {{monograph.price}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subscribeNow()">立即订阅</el-button>
        <el-button @click="showDialogVisible = false">暂不订阅</el-button>
      </span>
    </el-dialog>

    <LoginAndRegister :isShow="isShow" name="login"
                      @dialog-cancel="isShow = false"></LoginAndRegister>
  </div>
</template>

<script>
  import LoginAndRegister from '@/components/LoginAndRegister'

    export default {
      name: "Article",
      data: function () {
        return {
          fileContent: '',
          article: {},
          monographList:[],
          hasMonograph:null,
          showDialogVisible:false,
          monograph:{},
          isShow:false
        }
      },
      methods:{
        isBuyMonograph:async function(){
          //判断用户是否购买了专刊
          //获取用户
          let customer = JSON.parse(sessionStorage.getItem("customer"));
          //登陆了
          if(null!==customer && null!=this.monograph){
            const {data: res}=await this.$http.post("MyMonographController/isBuyMonograph",{
              customerId: customer.customerId,
              monographId:this.monograph.monographId
            });

            if(!res.meta.access){
              this.$message.error(res.meta.msg);
            }
            this.hasMonograph = res.data.hasMonograph;
          }else
          {
            //没登陆
            this.hasMonograph=0;
          }
        },
        findArticle: async function(articleId){
          //根据文章id查询文章对象
          const {data:res} = await this.$http.get(`ArticleController/findById/${articleId}`);
          if(!res.meta.access){
            this.$message.error(res.meta.msg);
          }
          //文章对象
          this.article = res.data.articleInfo;

          //当前用户购买了付费文章
          if(this.article.tryReading == 0 && this.hasMonograph == 1){
            this.readArticle(articleId);
          }else if(this.article.tryReading == 0 && this.hasMonograph == 0)
          {
            //没有购买付费文章 弹窗是否订阅
            this.showDialogVisible=true;
          }
          //试读文章直接读取
          if(this.article.tryReading == 1){
            this.readArticle(articleId);
          }
        },
        readArticle:async function(articleId){
          //读取文章
          const {data: res} = await this.$http.get(`ArticleController/readFile/${articleId}`)
          if(!res.meta.access){
            this.$message.error(res.meta.msg)
          }
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
          console.log(this.monograph);
          sessionStorage.setItem("monograph",JSON.stringify(this.monograph));
          //跳转到专刊详情页面
          this.$router.push({name:"MonographDetials"});
        },subscribeNow: function(){
          //判断用户是否登陆
          let customer = JSON.parse(sessionStorage.getItem("customer"));
          if(null==customer){
            //没登陆先登陆
            this.isShow = true
          }else
          {
            //登陆了跳转到订单中心
            this.$router.push({name:"OrderCenter",query:{monograph:this.monograph}});
          }
        }
      },
      created:function(){
        //获取参数
        let articleId = this.$route.query.articleId;
        this.monograph = JSON.parse(sessionStorage.getItem("monograph"));
        //用户是否购买了专刊
        this.isBuyMonograph();
        //查询文章
        this.findArticle(articleId);
        //查询章节目录
        this.findChapter(articleId);
      },
      components: {
          LoginAndRegister
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
    height: 1100px;
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

  .price {
    font-weight: bold;
    font-size: 25px;
    color: rgb(51, 119, 255);
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
