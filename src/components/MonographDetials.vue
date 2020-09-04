<template>
  <div class="monograph">
    <div class="header">
        <div class="inner">
          <el-image :src="monograph.cover"></el-image>
          <div style="border:1px solid red;margin-left: 180px;color: white;margin-top: 25px">
            <div style="border:1px solid blue;font-size: 25px;padding: 5px 0 5px 0">{{monograph.monographName}}</div>
            <div style="border:1px solid blue;padding: 5px 0 5px 0">
              {{monograph.highlights}}
              <span style="padding: 0 25px 0 25px;color: rgb(129,159,179)">|</span>
              <!--查看作者主页的连接-->
              <a><span style="color: rgb(129,159,179);font-size: 15px">{{monograph.employeeInfo.employeeName}} / {{monograph.employeeInfo.position.positionName}}</span></a>
            </div>
            <div style="font-size: 22px;color: white;padding: 5px 0 5px 0">￥ {{monograph.price}}</div>
            <el-button type="primary" round>立即订阅</el-button>
            <el-button round style="color: rgb(51,119,255);font-weight: bold">试读</el-button>
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
            <div class="mo">
              <h3>适合人群</h3>
              <div style="border: 1px solid red;margin-left: 40px"><ul style="list-style-type: disc">
                <li>有一定 React 基础，想要进一步学习 React 编程的在校生</li>
                <li>工作 1-5 年，接触过 React，想要深入了解内部原理的同学</li>
                <li>对技术有追求，想要在面试中提高自己竞争力的同学</li>
                <li>对 React 底层源码感兴趣的爱好者</li>
              </ul>
              </div>
            </div>
            <div class="mo">
              <h3>购买须知</h3>
              <div>
                <div><ol>
                  <li>本专栏为图文形式内容服务，共计 30 小节，上线时间为 2020 年 8 月 11 日 ，大概 2020 年 9 月底完成更新</li>
                  <li>本专栏上线即更新完成，形式为图文；</li>
                  <li>订阅成功后，用户即可通过慕课网 PC 端、App 端、WAP 端享有永久阅读的权限；</li>
                  <li>慕课专栏为虚拟内容服务，订阅成功后概不退款；</li>
                  <li>在专栏阅读过程中，如有任何问题，请邮件联系kf@imooc.com；</li>
                  <li>慕课专栏版权归本平台所有，任何机构、媒体、网站或个人未经本网协议授权不得转载、链接、转贴或以其他方式复制发布/发表，违者将依法追究责任。</li>
                </ol>
                </div>
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
                  <div>
                    <span>0{{index+1}}&nbsp;{{article.articleName}}</span>
                    <el-button round style="float: right;color: rgb(51,119,255);font-weight: bold"
                    v-if="article.tryReading==1">试读</el-button>
                    <div style="color: rgb(145,153,170);padding-top: 5px;font-size: 13px;">{{article.createTime}}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>

      <div class="wisdom">
        <div>————     造烛求明，读书求理     ————</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MonographDetials',
    data: function () {
      return {
        monograph:{},
        chapters:{}
      }
    },
    methods:{
      //查询专刊
      findChapter: async function (monographId) {
       const {data: res} = await this.$http.post('MonographController/previewMonograph',{
          monographId:monographId
       });
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        console.log(res.data.monograph);
        this.chapters = res.data.monograph;
        console.log(res.data.monograph);
      }
    },created:function(){
      //获取参数
      this.monograph = this.$route.query.monograph;
      this.findChapter(this.monograph.monographId);
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

  .el-image {
    float: left;
    height: 200px;
    width: 150px;
  }

  .main {
    width: 1152px;
    margin: 0 auto;
    margin-top: 28px;
    position: relative;
    min-height: 750px;
  }

  .el-card{
    width: 1000px;
  }

  .mo{
    border-top: 2px solid rgb(249,249,249);
    padding-bottom: 20px;
  }

  .chapter{
    border: 1px solid green;
    padding-top: 15px;
  }

  .article{
    border: 1px solid red;
    padding: 15px 0 10px 0;
  }

  .wisdom{
    border: 1px solid yellow;
    color: rgb(145,153,161);
    font-size: 13px;
    text-align: center;
    height: 100px;
    line-height: 100px;
  }

</style>
