<template>
  <div class="monograph">
    <div class="header">
      <div class="inner" style="padding-top: 15px;">
        <el-image :src="monograph.cover" style="float: left;height: 200px;width: 150px; border-radius: 5px;"></el-image>
        <div style="margin-left: 180px;color: white;margin-top: 25px">
          <div style="font-size: 25px;padding: 5px 0 5px 0">{{monograph.monographName}}</div>
          <div style="padding: 5px 0 5px 0">
            {{monograph.highlights}}
            <span style="color: rgb(129,159,179);font-size: 15px">{{monograph.employeeInfo.employeeName}} / {{monograph.employeeInfo.position.positionName}}</span>
          </div>
          <div style="margin-top: 5px">
            <el-button round type="primary"
                       @click="readArticle(chapters.chapterList[0].articleList[0].articleId)">立即阅读
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <el-tabs tab-position="left" type="card">
        <el-tab-pane label="课程详情">
          <el-card>
            <div style="padding-bottom: 20px">
              <h3>课程亮点：</h3>
              {{monograph.highlights}}
            </div>
            <div class="mo">
              <h3>课程简介：</h3>
              {{monograph.monographAbout}}
            </div>
            <div class="mo">
              <h3>课程模块</h3>
              <span>本课程主要由 <b>{{chapters.chapterList.length}}</b> 个章节组成。</span>
              <div style="padding: 15px 0 15px 0;" v-for="(chapter,index) in chapters.chapterList" :key="index">
                <span style="font-weight: bold">第{{index+1}}章</span>{{chapter.chapterAbout}}
              </div>
            </div>
          </el-card>

        </el-tab-pane>
        <el-tab-pane label="课程目录">
          <el-card>
            <div>
              <h3>课程目录</h3>
              <div class="chapter" v-for="(chapter,index) in chapters.chapterList" :key="index">
                <span style="font-weight: bold">第{{index+1}}章: </span>{{chapter.chapterName}}
                <div class="article" v-for="(article,index) in chapter.articleList" :key="index">
                  <div @click="readArticle(article.articleId)" v-if="article.articleId!=null">
                    <span>0{{index+1}}&nbsp;{{article.articleName}}</span>
                    <div style="color: rgb(145,153,170);padding-top: 5px;font-size: 13px;">{{article.createTime}}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>

      <div class="wisdom">
        <div>———— 造烛求明，读书求理 ————</div>
      </div>
    </div>

    <LoginAndRegister :isShow="loginDialog.isShow" :name="loginDialog.name"
                      @dialog-cancel="loginDialog.isShow = false"></LoginAndRegister>
  </div>
</template>

<script>
  import LoginAndRegister from '@/components/LoginAndRegister.vue'

  export default {
    name: 'MonographDetials',
    data: function () {
      return {
        monograph: {},
        loginDialog:{
          isShow:false,
          name:'login'
        },
        chapters: {
          chapterList: []
        },
        myMonograph:{
          customerId:'',
          monographId:''
        }
      }
    },
    methods: {
      //查询专刊
      findChapter: async function () {
        const {data: res} = await this.$http.post('MonographController/previewMonograph', {
          monographId: this.monograph.monographId
        });
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.chapters = res.data.monograph;
      },
      readArticle:async function (articleId) {
        //判断是否登陆
        //未登录不能看文章
        let customer = JSON.parse(sessionStorage.getItem("customer"));
        //没登陆
        if(null==customer){
          this.loginDialog.isShow=true;
        }else
        {
          this.myMonograph.customerId=customer.customerId;
          this.myMonograph.monographId=this.monograph.monographId;
          const {data:res} = await this.$http.post("MyMonographController/append",this.myMonograph);

          if(!res.meta.access){
            this.$message.error(res.meta.msg);
          }
          sessionStorage.setItem("monograph", JSON.stringify(this.monograph));
          //跳转到文章页面
          this.$router.push({name: "Article", query: {articleId: articleId}});
        }
      }
    },
    created: function () {
      //获取参数
      this.monograph = JSON.parse(sessionStorage.getItem("monograph"));
      this.findChapter();
    },
    components: {
      LoginAndRegister
    }
  }
</script>

<style lang="less" scoped>
  .header {
    background-color: rgb(56, 61, 66);
    width: 100%;
    padding: 4px 0;
    box-shadow: 0 2px 4px 0 rgba(28, 31, 33, .06);
    box-sizing: border-box;
  }

  .inner {
    width: 1152px;
    margin: 0 auto;
    padding-right: 296px;
    overflow: hidden;
    box-sizing: border-box;
    height: 250px;
  }

  .main {
    width: 1152px;
    margin: 0 auto;
    margin-top: 28px;
    position: relative;
    min-height: 750px;
  }

  .el-card {
    width: 1000px;
  }

  .mo {
    border-top: 2px solid rgb(249, 249, 249);
    padding-bottom: 20px;
  }

  .chapter {
    padding-top: 20px;
  }

  .article {
    border-top: 2px solid rgb(249, 249, 249);
    border-bottom: 2px solid rgb(249, 249, 249);
    padding: 15px 0 10px 0;
  }

  .wisdom {
    color: rgb(145, 153, 161);
    font-size: 13px;
    text-align: center;
    height: 100px;
    line-height: 100px;
  }

</style>
