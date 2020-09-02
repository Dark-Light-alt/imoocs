<template>
  <div class="freeCourse">
    <div class="wrap">
      <div class="top">
        <div class="course-top">
                <span class="top-header">
                  <el-image :src="require('@/assets/img/free-course-log.png')"></el-image>
                </span>
          <div class="course-banner">
          </div>
        </div>
        <div class="course-content">
          <div class="course-nav-box">
            <div class="course-direction">
              <span class="title">方向：</span>
              <div>
                <el-tag type="info" v-for="item in directionList" :key="item.directionId" effect="plain"
                        @click="directionClass(item.directionId)" :class="{ischeck:item.directionId==directionCurrent}">
                  {{item.directionName}}
                </el-tag>
              </div>
            </div>
            <div class="course-type">
              <span class="title">分类：</span>
              <div>
                <el-tag type="info" v-for="item in typeList" :key="item.typeId" effect="plain"
                        @click="typeClass(item.typeId)" :class="{ischeck:item.typeId==typeCurrent}">{{item.typeName}}
                </el-tag>
              </div>
            </div>
            <div class="course-level">
              <span class="title">难度：</span>
              <div>
                <el-tag type="info" v-for="item in levelList" :key="item.level" effect="plain"
                        @click="levelClass(item.level)" :class="{ischeck:item.level==levelCurrent}">{{item.label}}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="course-list">
        <div class="course-card-container" v-for="item in courseList" :key="item.id">
          <a class="course-card">
            <div class="course-card-top">
              <el-image :src="item.cover"></el-image>
            </div>
            <div class="course-card-content">
              <h3>{{item.courseName}}</h3>
              <div class="course-card-bottom">
                <div class="course-card-info">
                  <span v-if="item.courseLevel == 0">入门</span>
                  <span v-if="item.courseLevel == 1">初级</span>
                  <span v-if="item.courseLevel == 2">中级</span>
                  <span v-if="item.courseLevel == 3">高级</span>
                  <span>
                    <i class="el-icon-user"></i>
                    <span>{{item.peoples}}</span>
                  </span>
                </div>
                <p class="course-card-desc">{{item.courseAbout}}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FreeCourse',
    data: function () {
      return {
        directionCurrent: '-1',
        directionList: [],
        typeCurrent: '-1',
        typeList: [],
        levelCurrent: '-1',
        levelList: [
          {
            level: '-1',
            label: '全部'
          },
          {
            level: 0,
            label: '入门'
          },
          {
            level: 1,
            label: '初级'
          },
          {
            level: 2,
            label: '中级'
          },
          {
            level: 3,
            label: '高级'
          }
        ],
        courseList: []
      }
    },
    methods: {
      findDirectionList: async function () {
        const { data: res } = await this.$http.get('DirectionController/findAll')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        let direction = [{
          directionId: '-1',
          directionName: '全部'
        }].concat(res.data.directionList)

        this.directionList = direction
      },
      findTypeList: async function () {
        const { data: res } = await this.$http.get('TypeController/findAll')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        let type = [{
          typeId: '-1',
          typeName: '全部'
        }].concat(res.data.typeList)
        this.typeList = type
      },
      findByDirectionId: async function (directionId) {
        const { data: res } = await this.$http.get(`TypeController/findByDirectionId/${directionId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        let type = [{
          typeId: '-1',
          typeName: '全部'
        }].concat(res.data.typeList)
        this.typeList = type
      },
      findAssignFreeCourse: async function () {
        let request = {
          directionId: this.directionCurrent,
          typeId: this.typeCurrent,
          level: this.levelCurrent
        }
        const { data: res } = await this.$http.post('CourseController/findAssignFreeCourse', request)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.courseList = res.data.courseList
      },
      directionClass: function (directionId) {
        if ('-1' === directionId) {
          this.typeCurrent = '-1'
          this.levelCurrent = '-1'
          this.findTypeList()
        } else {
          this.findByDirectionId(directionId)
        }
        this.directionCurrent = directionId
        this.findAssignFreeCourse()
      },
      typeClass: function (typeId) {
        this.typeCurrent = typeId
        this.findAssignFreeCourse()
      },
      levelClass: function (level) {
        this.levelCurrent = level
        this.findAssignFreeCourse()
      }
    },
    created: function () {
      this.findDirectionList()
      this.findTypeList()
      this.findAssignFreeCourse()
    }
  }
</script>

<style lang="less" scoped>
  .freeCourse {
    padding-bottom: 20px;
    min-height: 750px;
  }

  .wrap {
    width: 100%;
    background-color: #fff;
    padding-bottom: 12px;
    box-shadow: 0 4px 8px 0 rgba(28, 31, 33, .1);

    .top {
      max-width: 91%;
      margin: auto;

      .course-top {
        padding-top: 20px;
        clear: both;
        border-bottom: 1px solid rgba(28, 31, 33, .2);
      }

      .course-banner {
        max-width: 240px;
        min-width: 60px;
        height: 60px;
        margin-left: 16px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        z-index: 899;
        display: none;
        float: left;
        line-height: 0;
      }
    }
  }

  .course-direction, .course-type, .course-level {
    overflow: hidden;
    border-bottom: 1px solid rgba(28, 31, 33, .2);

    .title {
      width: 52px;
      height: 20px;
      line-height: 30px;
      font-weight: 700;
      font-size: 14px;
      color: #07111b;
      text-align: left;
    }

    div {
      float: left;
      width: 100%;

      .el-tag {
        margin: 0 1% 1% 0;
        border: 0;
        font-size: 14px;
      }

      .el-tag:hover {
        color: #f20d0d;
      }
    }
  }

  .ischeck {
    background: rgba(242, 13, 13, .06);
    border-radius: 6px;
    font-weight: 700;
    color: #f20d0d;
  }

  .container {
    width: 1200px;
    margin: 20px auto;

    .course-list {
      padding: 10px 0 20px;
      overflow: hidden;

      .course-card-container {
        float: left;
        margin: 0 0 18px 18px;
        height: 286px;
        z-index: 0;
        font-size: 0;
        width: 216px;
        position: relative;
        transition: .3s all linear;

        .course-card {
          .course-card-top {
            width: 216px;
            height: 120px;
            position: relative;
            border-radius: 8px;
            transition: all .3s;

            .el-image {
              width: 100%;
              height: 100%;
              background-color: #f3f5f7;
              border-radius: 8px;
            }
          }

          .course-card-content {
            padding: 8px;

            h3 {
              margin: 0;
              padding: 0;
              font-size: 16px;
              color: #07111b;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              transition: all .3s;
              font-weight: 700;
              height: 46px;
            }

            .course-card-bottom {
              .course-card-info {
                font-size: 12px;
                color: #93999f;
                line-height: 24px;
                margin-top: 2px;
                font-weight: 400;

                span {
                  display: inline-block;
                  margin-right: 12px;
                }
              }

              .course-card-desc {
                font-size: 12px;
                font-weight: 300;
                color: #9199a1;
                line-height: 18px;
                margin-top: 4px;
                margin-bottom: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: 36px;
              }
            }
          }
        }
      }
    }
  }
</style>
