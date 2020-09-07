<template>
  <div class="home">
    <el-carousel :interval="7000" arrow="always" height="400px">
      <el-carousel-item v-for="item in carouselList" :key="item.carouselId">
        <el-image :src="item.cover"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-card>
      <h2>新上好课</h2>
      <div class="new-course-box" v-for="course in newCourseList" :key="course.courseId"
           @click="goPracticeCourse(course.courseId)">
        <el-image :src="course.cover"></el-image>
        <div class="new-course-content">
          <h3>{{course.courseName}}</h3>
          <div class="new-course-bottom">
            <div class="new-course-info">
              <span v-if="course.courseLevel == 0">入门</span>
              <span v-if="course.courseLevel == 1">初级</span>
              <span v-if="course.courseLevel == 2">中级</span>
              <span v-if="course.courseLevel == 3">高级</span>
              <span>
                <i class="el-icon-user-solid"> {{course.numberOfStudents}}</i>
              </span>
              <span style="float: right;">{{course.evaluates}} 人评价</span>
            </div>
            <div class="course-price">￥ {{course.price}}</div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card>
      <h2>学习路线</h2>
      <el-tabs v-model="directionId" @tab-click="directionClick">
        <el-tab-pane v-for="direction in directionList" :label="direction.directionName" :name="direction.directionId"
                     :key="direction.directionId">
          <div class="course-by-direction-container" v-for="course in courseByDirectionList" :key="course.courseId"
               @click="goFreeCourseLearn(course.courseId)">
            <el-image :src="course.cover"></el-image>
            <div>
              <h4>{{course.courseName}}</h4>
              <p>{{course.courseAbout}}</p>
              <div class="ourse-by-direction-info">
                <i class="el-icon-user-solid"> {{course.numberOfStudents}} 学习人数</i>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card>
      <h2>热门课程</h2>
      <el-tabs value="1" @tab-click="hotClick">
        <el-tab-pane label="实战课程" name="1">
          <div class="hot-course-box" v-for="course in hotCourseList" :key="course.courseId"
               @click="goPracticeCourse(course.courseId)">
            <el-image :src="course.cover"></el-image>
            <div class="hot-course-content">
              <h3>{{course.courseName}}</h3>
              <div class="hot-course-bottom">
                <div class="hot-course-info">
                  <span v-if="course.courseLevel == 0">入门</span>
                  <span v-if="course.courseLevel == 1">初级</span>
                  <span v-if="course.courseLevel == 2">中级</span>
                  <span v-if="course.courseLevel == 3">高级</span>
                  <span>
                    <i class="el-icon-user-solid"> {{course.numberOfStudents}}</i>
                  </span>
                  <span style="float: right;">{{course.evaluates}}人评价</span>
                </div>
                <div class="course-price">￥ {{course.price}}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="免费课程" name="0">
          <div class="hot-course-box" v-for="course in hotCourseList" :key="course.courseId"
               @click="goFreeCourseLearn(course.courseId)">
            <el-image :src="course.cover"></el-image>
            <div class="hot-course-content">
              <h3>{{course.courseName}}</h3>
              <div class="hot-course-bottom">
                <div class="hot-course-info">
                  <span v-if="course.courseLevel == 0">入门</span>
                  <span v-if="course.courseLevel == 1">初级</span>
                  <span v-if="course.courseLevel == 2">中级</span>
                  <span v-if="course.courseLevel == 3">高级</span>
                  <span>
                    <i class="el-icon-user-solid"> {{course.numberOfStudents}}</i>
                  </span>
                  <span style="float: right;">{{course.evaluates}}人评价</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card>
      <h2>慕课专栏</h2>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: function () {
      return {
        directionId: '707f78577890b01ae3b48847b602f9b0',
        carouselList: [],
        directionList: [],
        newCourseList: [],
        courseByDirectionList: [],
        hotCourseList: []
      }
    },
    methods: {
      // 查询轮播
      findCarouselList: async function () {
        const { data: res } = await this.$http.get('CarouselController/findAllList')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.carouselList = res.data.carouselList
      },
      // 查询课程方向
      findDirectionList: async function () {
        const { data: res } = await this.$http.get('DirectionController/findAll')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.directionList = res.data.directionList
        this.directionId = this.directionList[0].directionId
        this.findCourseByDirection(this.directionId)
      },
      // 课程方向被选中
      directionClick: function (tab, event) {
        this.findCourseByDirection(tab.name)
      },
      // 根据课程方向查询课程
      findCourseByDirection: async function (directionId) {
        let params = {
          num: 6,
          isfree: 0,
          directionId: directionId,
          news: false,
          numberOfStudents: false
        }
        const { data: res } = await this.$http.post('CourseController/findCourseByCondition', params)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.courseByDirectionList = res.data.courseList
      },
      // 热门课程被选中
      hotClick: function (tab, event) {
        this.findHotCourse(tab.name)
      },
      // 查询热门课程
      findHotCourse: async function (isfree) {
        let params = {
          num: 8,
          isfree: isfree,
          directionId: null,
          news: false,
          numberOfStudents: true
        }
        const { data: res } = await this.$http.post('CourseController/findCourseByCondition', params)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.hotCourseList = res.data.courseList
      },
      // 查看新上好课
      findNewCourse: async function () {
        let params = {
          num: 8,
          isfree: 1,
          directionId: null,
          numberOfStudents: true,
          news: true
        }
        const { data: res } = await this.$http.post('CourseController/findCourseByCondition', params)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.newCourseList = res.data.courseList
      },
      // 实战课程被选中，跳转页面
      goPracticeCourse: function (courseId) {
        this.$router.push({
          name: 'PracticeCourseBuy',
          query: { courseId: courseId }
        })
      },
      // 免费课程被选中 跳转页面
      goFreeCourseLearn: function (courseId) {
        this.$router.push({
          name: 'FreeCourseLearn',
          query: { courseId: courseId }
        })
      }
    },
    created: function () {
      this.findCarouselList()
      this.findDirectionList()
      this.findHotCourse(1)
      this.findNewCourse()
    }
  }
</script>

<style lang="less" scoped>
  .el-carousel {
    border-radius: 15px;
    margin: 35px 160px 35px 160px;
  }

  .el-card {
    padding-left: 6%;
    padding-right: 6%;
    margin-bottom: 30px;
  }

  .course-by-direction-container {
    float: left;
    margin-left: 1%;
    margin-bottom: 24px;
    width: 49%;
    height: 148px;

    .el-image {
      float: left;
      position: relative;
      width: 140px;
      height: 140px;
      border-radius: 8px;
    }

    h4 {
      margin: 8px 0;
      margin-left: 32%;
      font-size: 16px;
      color: #1C1F21;
      line-height: 20px;
      min-height: 20px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    p {
      margin-left: 32%;
      font-size: 14px;
      color: #545C63;
      letter-spacing: 0;
      line-height: 20px;
      height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .ourse-by-direction-info {
      margin-left: 32%;
      font-size: 12px;
      color: #9199A1;
      height: 18px;
      line-height: 18px;
    }
  }

  .new-course-box {
    width: 21%;
    display: inline-block;
    margin-right: 4%;

    .el-image {
      width: 105%;
      height: 148px;
      position: relative;
      border-radius: 8px;
    }

    .new-course-content {
      padding: 8px;

      h3 {
        margin: 0px;
        padding: 0px;
        font-size: 16px;
        color: #07111B;
        line-height: 24px;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: all .3s;
        font-weight: bold;
        height: 46px;
      }

      .new-course-bottom {
        position: relative;

        .new-course-info {
          font-size: 12px;
          color: #9199A1;
          line-height: 18px;
          margin-top: 4px;
          font-weight: 400;

          span {
            display: inline-block;
            margin-right: 12px;
          }
        }

        .new-course-price {
          font-size: 12px;
          color: #f01414;
        }
      }
    }
  }

  .hot-course-box {
    width: 21%;
    display: inline-block;
    margin-right: 4%;

    .el-image {
      width: 105%;
      height: 148px;
      position: relative;
      border-radius: 8px;
    }

    .hot-course-content {
      padding: 8px;

      h3 {
        margin: 0px;
        padding: 0px;
        font-size: 16px;
        color: #07111B;
        line-height: 24px;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: all .3s;
        font-weight: bold;
        height: 46px;
      }

      .hot-course-bottom {
        position: relative;

        .hot-course-info {
          font-size: 12px;
          color: #9199A1;
          line-height: 18px;
          margin-top: 4px;
          font-weight: 400;

          span {
            display: inline-block;
            margin-right: 12px;
          }
        }
      }
    }
  }

  .course-price {
    font-size: 12px;
    color: #f01414;
  }
</style>
