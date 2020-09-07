<template>
  <div class="myFavorite">
    <el-tabs v-model="isfree" @tab-click="handleClick">
      <el-tab-pane label="全部" name="null">
        <div class="courseitem" v-for="item in favoriteList" :key="item.favoriteId">
          <div class="img-box">
            <el-image :src="item.cover"></el-image>
          </div>
          <div class="info-box">
            <div class="title">
              <span v-if="item.isfree == 0">免费课程</span>
              <span v-if="item.isfree == 1">实战课程</span>
              <span class="course-name">{{item.courseName}}</span>
            </div>
            <div class="course-info"><p class="course-about">{{item.courseAbout}}</p></div>
            <div class="operation"><a class="cancel" @click="cancel(item.favoritesId)">取消收藏</a></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="免费课程" name="0">
        <div class="courseitem" v-for="item in favoriteList" :key="item.favoriteId">
          <div class="img-box">
            <el-image :src="item.cover"></el-image>
          </div>
          <div class="info-box">
            <div class="title">
              <span v-if="item.isfree == 0">免费课程</span>
              <span v-if="item.isfree == 1">实战课程</span>
              <span class="course-name">{{item.courseName}}</span>
            </div>
            <div class="course-info"><p class="course-about">{{item.courseAbout}}</p></div>
            <div class="operation">
              <a class="cancel" @click="cancel(item.favoritesId)">取消收藏</a>
              <el-button @click="courseLearn(item.courseId)">开始学习</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实战课程" name="1">
        <div class="courseitem" v-for="item in favoriteList" :key="item.favoriteId">
          <div class="img-box">
            <el-image :src="item.cover"></el-image>
          </div>
          <div class="info-box">
            <div class="title">
              <span v-if="item.isfree == 0">免费课程</span>
              <span v-if="item.isfree == 1">实战课程</span>
              <span class="course-name">{{item.courseName}}</span>
            </div>
            <div class="course-info"><p class="course-about">{{item.courseAbout}}</p></div>
            <div class="operation">
              <a class="cancel" @click="cancel(item.favoritesId)">取消收藏</a>
              <el-button @click="confirmOrder(item.courseId)">立即购买</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MyFavorite',
    data: function () {
      return {
        isfree: 'null',
        favoriteList: []
      }
    },
    methods: {
      handleClick: function (tab, event) {
        this.isfree = tab.name
        this.findFavorite()
      },
      findFavorite: async function () {
        let params = {
          customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
          isfree: this.isfree
        }
        const { data: res } = await this.$http.post('FavoritesController/findByCustomer', params)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.favoriteList = res.data.favoritesList
      },
      courseLearn: function (courseId) {
        this.$router.push({
          name: 'FreeCourseLearn',
          query: { courseId: courseId }
        })
      },
      confirmOrder: function (courseId) {
        this.$router.push({
          name: 'ConfirmOrder',
          query: { courseId: courseId }
        })
      },
      cancel: async function (favoritesId) {
        const { data: res } = await this.$http.delete(`FavoritesController/remove/${favoritesId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.findFavorite()
      }
    },
    created: function () {
      this.findFavorite()
    }
  }
</script>

<style lang="less" scoped>

  .courseitem {
    position: relative;
    display: flex;
    flex-direction: row;

    .img-box {
      width: 200px;
      margin-right: 30px;
    }

    .info-box {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #d9dde1;
      position: relative;
      padding-bottom: 28px;
      width: 800px;

      .title {
        display: flex;
        flex-direction: row;
        align-items: center;

        span:first-child {
          background: #f5f7fa;
          border-radius: 2px;
          width: 62px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          color: #9199a1;
          font-weight: 400;
          margin-right: 12px;
        }

        .course-name {
          font-size: 20px;
          color: #07111b;
          font-weight: 700;
          line-height: 36px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .course-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 12px;

        .course-about {
          font-size: 14px;
          color: #4d555d;
          line-height: 24px;
          width: 727px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      .operation {
        text-align: right;

        .cancel {
          font-size: 13px;
          color: #1c1f21;
          line-height: 20px;
        }

        .cancel:hover {
          color: #f20d0d;
        }

        .el-button {
          background: #f01414;
          border-radius: 18px;
          color: #fff;
          width: 104px;
          height: 36px;
          margin-left: 48px;
          border: 0px;
        }
      }
    }
  }

</style>
