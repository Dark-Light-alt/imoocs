<template>
  <div class="practiceCourse">
    <div class="header">
      <div class="header-wrapper">
        <span class="header-icon">
          <el-image :src="require('@/assets/img/practice-course-log.png')"></el-image>
        </span>
      </div>
    </div>
    <div class="main">
      <el-tabs v-model="currentDirectionId" @tab-click="directionClick">
        <el-tab-pane v-for="item in directionList" :key="item.directionId" :label="item.directionName"
                     :name="item.directionId">
          <div class="type">
            <el-tag type="info" v-for="item in typeList" :key="item.typeId" effect="plain"
                    @click="typeClick(item.typeId)" :class="{ischeck: item.typeId == currentTypeId}">
              {{item.typeName}}
            </el-tag>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="content">
        <a class="course-box" v-for="item in courseList" :key="item.courseId" @click="clickCourse(item.courseId)">
          <el-image
            :src="item.cover"></el-image>
          <h3>{{item.courseName}}</h3>
          <div class="evaluation">
            <span>
              <i class="el-icon-user-solid"></i>
              <span>{{item.numberOfStudents}}</span>
            </span>
            <span class="right">
              <span>{{item.evaluates}}</span>
              <span>人评价</span>
            </span>
          </div>
          <p>
            {{item.courseAbout}}
          </p>
          <span class="price">￥{{item.price}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PracticeCourse',
    data: function () {
      return {
        currentDirectionId: 'null',
        directionList: [],
        currentTypeId: null,
        typeList: [],
        courseList: []
      }
    },
    methods: {
      clickCourse: function (courseId) {
        this.$router.push({
          name: 'PracticeCourseBuy',
          query: { courseId: courseId }
        })
      },
      findDirectionList: async function () {
        const { data: res } = await this.$http.get('DirectionController/findAll')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        let direction = [{
          directionId: 'null',
          directionName: '全部'
        }].concat(res.data.directionList)

        this.directionList = direction
      },
      findTypeList: async function (directionId) {
        const { data: res } = await this.$http.get(`TypeController/findByDirectionId/${directionId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        let type = [{
          typeId: null,
          typeName: '不限'
        }].concat(res.data.typeList)
        this.typeList = type
      },
      directionClick: function (tab, event) {
        console.log(tab.name)
        if ('null' == tab.name) {
          this.currentDirectionId = 'null'
          this.currentTypeId = null
        }
        this.currentDirectionId = tab.name
        this.findTypeList(this.currentDirectionId)
        this.typeClick(null)
      },
      typeClick: async function (typeId) {
        console.log(typeof this.currentDirectionId)
        this.currentTypeId = typeId
        let params = {
          isfree: 1,
          directionId: this.currentDirectionId,
          typeId: typeId,
          level: null
        }

        const { data: res } = await this.$http.post('CourseController/findAssignCourse', params)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.courseList = res.data.courseList
      }
    },
    created: function () {
      this.findDirectionList()
      this.findTypeList('null')
      this.typeClick(null)
    }
  }
</script>

<style lang="less" scoped>
  .practiceCourse {
    min-height: 750px;
  }

  .ischeck {
    color: #c80 !important;
    background: rgba(204, 136, 0, .1) !important;
  }

  .header {
    height: 132px;
    background: url('../assets/img/practice-course-background.png') no-repeat;
    background-size: cover;
    box-sizing: border-box;

    .header-wrapper {
      width: 1152px;
      margin-left: auto;
      margin-right: auto;

      .header-icon {
        float: left;
        width: 196px;
        overflow: hidden;
      }
    }
  }

  .main {
    width: 1152px;
    margin: 0 auto;

    .type {
      .el-tag {
        margin: 0 1% 1% 0;
        border: 0;
        font-size: 14px;
        background-color: rgb(243, 245, 246);
        color: #545C63;
      }

      .el-tag:hover {
        background-color: rgb(217, 221, 225);
      }
    }

    .content {
      margin-top: 25px;

      .course-box {
        display: inline-block;
        margin-right: 18px;
        margin-bottom: 36px;
        width: 270px;
        height: 300px;

        .el-image {
          height: 148px;
          max-height: 148px;
          transition: .3s all linear;
          border-radius: 12px;
        }

        h3 {
          margin: 10px 25px 15px 15px;
          width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .evaluation {
          margin: 0 45px 0 10px;
          font-size: 12px;
          color: #93999f;

          span {
            margin-left: 5px;
          }

          .right {
            float: right;
          }
        }

        p {
          margin: 10px 40px 15px 15px;
          font-size: 12px;
          color: #93999f;
          max-height: 48px;
          line-height: 24px;
          word-break: break-all;
          overflow: hidden;
          transition: .3s all linear;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price {
          font-size: 12px;
          color: #f01414;
          line-height: 24px;
          margin-left: 15px;
        }
      }
    }
  }
</style>
