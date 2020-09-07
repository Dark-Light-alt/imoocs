<template>
  <el-dialog :visible.sync="isShow" width="450px" custom-class="class" :before-close="cancel"
             :close-on-click-modal="false" @close="dialogClose" title="举报">
    <el-checkbox-group v-model="checked" :max="1">
      <el-checkbox v-for="item in reportReasonList" :key="item.reportReasonId" :label="item.reportReasonId">
        {{item.reportReasonName}}
      </el-checkbox>
    </el-checkbox-group>
    <br/>
    <el-input type="textarea" v-model="reportReview.reportDescribe" :rows="4" maxlength="100" show-word-limit
              placeholder="写下举报理由..."></el-input>
    <el-button @click="submit">提交</el-button>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Report',
    props: {
      isShow: {
        type: Boolean
      },
      reportType: {
        type: Number
      },
      personBeReport: {
        type: String
      },
      resourceBeReport: {
        type: String
      }
    },
    data: function () {
      return {
        reportReasonList: [],
        reportReview: {
          reportReasonId: null,
          reportDescribe: null,
          reportPerson: JSON.parse(sessionStorage.getItem('customer')).customerId,
          personBeReport: null,
          reportType: null,
          resourceBeReport: null
        },
        checked: []
      }
    },
    methods: {
      submit: async function () {
        this.reportReview.reportReasonId = this.checked[0]
        this.reportReview.personBeReport = this.personBeReport
        this.reportReview.reportType = this.reportType
        this.reportReview.resourceBeReport = this.resourceBeReport

        const { data: res } = await this.$http.put('ReportReviewController/append', this.reportReview)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.refresh()
      },
      findReportReason: async function () {
        const { data: res } = await this.$http.get('ReportReasonController/findAll')
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.reportReasonList = res.data.reportReasonList
      },
      cancel: function () {
        this.$emit('dialog-cancel')
      },
      dialogClose: function () {
        this.checked = []
        this.reportReview.reportDescribe = null
      },
      refresh: function () {
        this.$router.push({
          path: '/refresh',
          query: { path: this.$route.fullPath }
        })
      }
    },
    created: function () {
      this.findReportReason()
    }
  }
</script>

<style lang="less" scoped>
  .el-button {
    margin-left: 342px;
    margin-top: 15px;
    background: rgba(240, 20, 20, .8);
    font-size: 14px;
    color: #fff;
    border: 0;
  }
</style>
