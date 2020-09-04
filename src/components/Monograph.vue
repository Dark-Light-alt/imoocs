<template>
  <div class="monograph">
    <div class="header">
        <div class="inner">
        <el-image :src="require('@/assets/img/monograph-log.png')"></el-image>
        <p>
          共
          <span>{{monographList.length}}</span>
          个专刊
        </p>
      </div>
    </div>
    <div class="main">
      <el-card v-for="(item,index) in monographList" :key="index">
        <div class="content">
          <!--专刊头像-->
          <a @click="monographDetials(item)">
            <el-image :src="item.cover"></el-image>
          </a>
          <div class="info">
            <h3 @click="monographDetials(item)">{{item.monographName}}</h3>
            <h5>{{item.highlights}}</h5>
            <div v-for="(chapter,index) in item.chapterList" :key="index">
              <span class="article" v-for="article in chapter.articleList" :key="article.articleId" @click="readArticle(article.articleId)">
                <el-tag v-if="article.tryReading==1" type="primary" size="mini">试读</el-tag>
                <span>{{article.articleName}}</span>
              </span>
            </div>
            <!--员工头像-->
            <el-image :src="item.photo"></el-image>
            <span class="name">{{item.employeeInfo.employeeName}}</span> /
            <span>{{item.employeeInfo.position.positionName}}</span>
            <span class="price">￥ {{item.price}}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Monograph',
    data: function () {
      return {
        monographList: []
      }
    },
    methods:{
      //查询所有专刊
      findMonographList: async function () {
        const {data: res} = await this.$http.get('MonographController/listAllMonograph');
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        console.log(res.data.monographList);
        this.monographList = res.data.monographList;
      },readArticle:function(articleId){
        //跳转到文章页面
        this.$router.push({name:"Article",query:{articleId:articleId}});
      },monographDetials(monograph){
        console.log(monograph);
        //跳转到专刊详情页面
        this.$router.push({name:"MonographDetials",query:{monograph:monograph}});
      }
    },created:function(){
      this.findMonographList();
    }
  }
</script>

<style lang="less" scoped>
  .header {
    background: #fff;
    width: 100%;
    padding: 4px 0;
    box-shadow: 0 2px 4px 0 rgba(28, 31, 33, .06);
    border-top: 1px solid #f3f5f6;
    box-sizing: border-box;

    .inner {
      width: 1152px;
      margin: 0 auto;
      padding-right: 296px;
      overflow: hidden;
      box-sizing: border-box;
      height: 60px;

      .el-image {
        float: left;
        height: 60px;
        width: 296px;
      }

      p {
        float: right;
        margin-left: 22px;
        font-size: 14px;
        color: #9199a1;
        line-height: 60px;

        span {
          font-size: 14px;
          color: #9199a1;
          line-height: 60px;
        }
      }
    }
  }

  .main {
    width: 1152px;
    margin: 0 auto;
    margin-top: 28px;
    position: relative;
    min-height: 750px;

    .el-card {
      margin-bottom: 15px;

      .content {
        width: 100%;
        box-sizing: border-box;

        a {
          .el-image {
            margin-left: 50px;
            width: 138px;
            height: 157px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            box-sizing: border-box;
            -webkit-transition: all .5s;
          }
        }

        .info {
          width: 598px;
          padding: 0 0 16px 0;
          float: right;
          margin-right: 25%;

          .el-image {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: top center;
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
          }

          h3:hover {
            color: rgb(51, 119, 255);
          }

          .name {
            font-weight: bold;
          }

          .price {
            float: right;
            font-weight: bold;
            font-size: 20px;
            color: rgb(51, 119, 255);
          }
        }
      }
    }

    .article {
      font-size: 13px;
      margin-right: 15px;
      line-height: 30px;
    }

    .article:hover {
      color: rgb(51, 119, 255);
    }
  }
</style>
