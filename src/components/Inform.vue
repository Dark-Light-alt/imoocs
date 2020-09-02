<template>
  <div class="inform">
    <el-card>
      <el-tabs value="sysNotice" @tab-click="click">
        <el-tab-pane name="sysNotice" label="系统通知">
          <div class="sys-top">
            <p>系统自动清理三个月前的已读通知</p>
            <el-button @click="markReadAll">全部标为已读</el-button>
          </div>
          <el-table :data="sysNoticeList">
            <el-table-column prop="title" label="信息来源">
              <template slot-scope="scope">
                <el-tag type="info">{{scope.row.title}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="createTime" label="发送时间"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.isreading == 0">未读</el-tag>
                <el-tag v-if="scope.row.isreading == 1">已读</el-tag>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <i class="el-icon-delete-solid" @click="removeById(scope.row.sysNoticeId)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="privateMessage" label="私信">
          私信
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Inform',
    data: function () {
      return {
        sysNoticeList: []
      }
    },
    methods: {
      click: function (tab, event) {
        if (tab.name === 'sysNotice') {
          this.findSysNotice()
        }
      },
      findSysNotice: async function () {
        let customerId = JSON.parse(sessionStorage.getItem('customer')).customerId
        const { data: res } = await this.$http.get(`SysNoticeController/findAllByCustomerId/${customerId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.sysNoticeList = res.data.sysNoticeList
      },
      removeById: async function (sysNoticeId) {
        const { data: res } = await this.$http.delete(`SysNoticeController/removeById/${sysNoticeId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.findSysNotice()
      },
      markReadAll: async function () {
        let customerId = JSON.parse(sessionStorage.getItem('customer')).customerId
        const { data: res } = await this.$http.get(`SysNoticeController/markReadAll/${customerId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.findSysNotice()
      }
    },
    created: function () {
      this.findSysNotice()
    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    padding-left: 6%;
    padding-right: 6%;
    min-height: 750px;

    .sys-top {
      background-color: rgb(243, 245, 247);
      overflow: hidden;
      padding-left: 15px;
      padding-right: 15px;

      p {
        height: 30px;
        line-height: 30px;
        float: left;
      }

      .el-button {
        position: relative;
        top: 10px;
        float: right;
      }
    }
  }
</style>
