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
          <div style="font-size: 22px;color: white;padding: 5px 0 5px 0">￥ {{monograph.price}}</div>
          <div style="margin-top: 5px">
            <el-button type="primary" v-if="hasMonograph==0" round @click="subscribeNow()">立即订阅</el-button>
            <el-button round style="color: rgb(51,119,255);font-weight: bold"
                       @click="readArticle(chapters.chapterList[0].articleList[0].articleId)"
                       v-if="hasMonograph==0">试读
            </el-button>
            <el-button round type="primary" v-if="hasMonograph==1"
                       @click="readArticle(chapters.chapterList[0].articleList[0].articleId)"
            >立即阅读
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
                  <div @click="isSub(article)" v-if="article.articleId!=null">
                    <span>0{{index+1}}&nbsp;{{article.articleName}}</span>
                    <el-button round style="float: right;color: rgb(51,119,255);font-weight: bold"
                               v-if="article.tryReading==1 && hasMonograph==0">试读
                    </el-button>
                    <span style="float: right;margin-right: 25px">
                      <i class="el-icon-lock" v-if="article.tryReading==0 && hasMonograph==0"></i>
                    </span>
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

    <el-dialog :visible.sync="showDialogVisible" width="20%" height="350px" center>
      <div style="text-align: center">
        <el-image :src="monograph.cover" style="height: 180px;width: 150px"></el-image>
      </div>
      <h3>{{monograph.monographName}}</h3>
      <div style="font-size: 22px;color: rgb(64,158,255);padding: 5px 0 5px 0;font-weight: bold;text-align: center">价格:￥
        {{monograph.price}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subscribeNow()">立即订阅</el-button>
        <el-button @click="showDialogVisible = false">暂不订阅</el-button>
      </span>
    </el-dialog>

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
        chapters: {
          chapterList: []
        },
        hasMonograph: null,
        customer: {},
        showDialogVisible: false,
        loginDialog: {
          isShow: false,
          name: 'login'
        },
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
      isSub: function (article) {
        //当前用户购买了付费文章
        if (article.tryReading == 0 && this.hasMonograph == 1) {
          this.readArticle(article.articleId);
        } else if (article.tryReading == 0 && this.hasMonograph == 0) {
          //没有购买付费文章 弹窗是否订阅
          this.showDialogVisible = true;
        }
        //试读文章直接读取
        if (article.tryReading == 1) {
          this.readArticle(article.articleId);
        }
      },
      readArticle: function (articleId) {
        sessionStorage.setItem("monograph", JSON.stringify(this.monograph));
        //跳转到文章页面
        this.$router.push({name: "Article", query: {articleId: articleId}});
      },
      isBuyMonograph: async function () {
        //登陆了
        if (null !== this.customer) {
          const {data: res} = await this.$http.post("MyMonographController/isBuyMonograph", {
            customerId: this.customer.customerId,
            monographId: this.monograph.monographId
          });

          if (!res.meta.access) {
            this.$message.error(res.meta.msg);
          }
          this.hasMonograph = res.data.hasMonograph;
        } else {
          this.hasMonograph = 0;
        }
      },
      subscribeNow: function () {
        //立即订阅
        //判断是否登陆
        if (null == this.customer) {
          //没登陆先登陆
          this.loginDialog.isShow = true
        } else {
          //登陆了跳转到订单中心
          this.$router.push({name: "OrderCenter", query: {monograph: this.monograph}});
        }
      },
    }, created: function () {
      //获取用户
      this.customer = JSON.parse(sessionStorage.getItem("customer"));
      //获取参数
      this.monograph = JSON.parse(sessionStorage.getItem("monograph"));
      //是否购买过此专刊
      this.isBuyMonograph();
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
