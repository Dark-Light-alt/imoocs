<template>
  <div class="realNameSystem">
    <div class="page-settings">
      <div class="common-title">实名认证</div>
      <div class="line"></div>
      <div class="content">
        <div class="action" v-if="null === customerReal">
          <el-button @click="dialogVisible = true">开始认证</el-button>
        </div>
        <div class="info" v-if="null !== customerReal">
          <div class="result">
            <p class="r"><i class="el-icon-success"></i>已通过实名认证</p>
            <p class="name">{{customerReal.actualName}}</p>
            <p class="idcard">身份证号：{{customerReal.idcard}}</p>
          </div>
        </div>
        <dl>
          <dt>认证须知</dt>
          <dl>1、实名认证可以提升您在慕课网的个人信息及虚拟财产的安全等级，同时也能够更好的体验慕课网的各项虚拟服务；</dl>
          <dl>2、实名认证通过后，将无法修改和删除，请谨慎填写；</dl>
          <dl>3、我们会确保你所提供的信息均处于严格的保密状态，不会泄露；</dl>
          <dl>4、如存在恶意乱填写姓名，身份证号码，及上传与身份证证件无关图片者，一经发现将冻结慕课网账号。</dl>
        </dl>
      </div>
    </div>

    <el-dialog title="身份证认证" :visible.sync="dialogVisible" width="30%">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:8081/CustomerRealController/authentication"
        :limit="1"
        :data="{customerId: this.customerId}"
        :on-success="success"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'RealNameSystem',
    data: function () {
      return {
        dialogVisible: false,
        customerReal: null,
        customerId: JSON.parse(sessionStorage.getItem('customer')).customerId
      }
    },
    methods: {
      findCustomerReal: async function () {
        const { data: res } = await this.$http.get(`CustomerRealController/findByCustomer/${this.customerId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.customerReal = res.data.customerReal
      },
      success: function (res, file, fileList) {
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.dialogVisible = false
        this.findCustomerReal()
      }
    },
    created: function () {
      this.findCustomerReal()
    }
  }
</script>

<style lang="less" scoped>
  .page-settings {
    .common-title {
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
    }

    .content {
      padding-top: 28px;

      .action {
        min-height: 112px;
        background-color: #f3f5f7;
        text-align: center;

        .el-button {
          margin-top: 30px;
          width: 120px;
          height: 48px;
          background-color: #00b43c;
          color: #fff;
          font-size: 16px;
        }
      }

      .info {
        min-height: 112px;
        background-color: #f3f5f7;
        overflow: hidden;

        .result {
          margin: 32px;

          .r {
            font-size: 16px;
            margin-bottom: 14px;
            font-weight: 700;

            i {
              color: #00b43c;
              margin-right: 5px;
            }
          }

          .name {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 12px;
            padding-top: 10px;
            line-height: 18px;
          }

          .idcard {
            color: #4d555d;
          }
        }
      }
    }
  }

  .line {
    height: 1px;
    border-top: 1px solid #d9dde1;
  }
</style>
