<template>
  <div class="practiceCourse">
    <div class="header">
      <div class="header-wrapper">
        <span class="header-icon">
          <el-image :src="require('@/assets/img/practice-course-log.png')"></el-image>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PracticeCourse'
  }
</script>

<style lang="less" scoped>
  .practiceCourse {
    min-height: 750px;
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

        .el-image {
          margin-top: 15px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
