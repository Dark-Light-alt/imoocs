<template>
  <div class="pay">
    <div class="header">
      <div class="header-content">
        <h1>支付中心</h1>
      </div>
    </div>
    <div class="content">
      <el-card class="top">
        <p>订单：{{order.orderNumber}}</p>
        <div class="course-info">
          <el-image :src="order.course.cover"></el-image>
          <div class="course-name">{{order.course.courseName}}</div>
          <div class="course-price">￥{{order.orderMoney}}</div>
        </div>
        <div class="button">
          <p>应付：<span class="price">￥{{order.orderMoney}}</span></p>
          <el-button @click="pay">立即支付</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConfirmOrder',
    data: function () {
      return {
        orderId: this.$route.query.orderId,
        order: {}
      }
    },
    methods: {
      findOrder: async function () {
        const { data: res } = await this.$http.get(`OrdersController/findOrder/${this.orderId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.order = res.data.order
      },
      pay: async function () {
        let payDto = {
          out_trade_no: this.order.orderNumber,
          subject: this.order.course.courseName,
          total_amount: this.order.orderMoney
        }
        sessionStorage.setItem('order', JSON.stringify(this.order))
        const { data: res } = await this.$http.post('OrdersController/pay', payDto)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        const divForm = document.getElementsByTagName('div')
        if (divForm.length) {
          document.body.removeChild(divForm[0])
        }
        const div = document.createElement('div')
        div.innerHTML = res.data.payform
        document.body.appendChild(div)
        document.forms[0].submit()
      },
    },
    created: function () {
      this.findOrder()
    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 160px;
    background-color: #e3e6e9;
    background: url('../assets/img/shoppingCart-background.jpg') repeat-x left bottom;

    .header-content {
      width: 1104px;
      height: 120px;
      line-height: 120px;
      margin-left: auto;
      margin-right: auto;
      font-size: 14px;

      h1 {
        margin: 0;
        font-size: 32px;
        line-height: 115px;
        margin-right: 25px;
        color: #07111b;
        font-weight: 200;
      }
    }
  }

  .content {
    .top {
      width: 1152px;
      padding: 0 36px 32px;
      background-color: #fff;
      margin-top: -40px;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 0 8px 16px 0 rgba(7, 17, 27, .1);
      border-radius: 8px;
      box-sizing: border-box;

      .course-info {
        padding: 24px;
        box-sizing: border-box;
        background: #f3f5f7;
        overflow: hidden;

        .el-image {
          height: 155px;
          width: 260px;
          float: left;
          margin-right: 24px;
        }

        .course-name {
          float: left;
          padding-top: 60px;
        }

        .course-price {
          float: right;
          padding-right: 150px;
          padding-top: 60px;
          font-size: 19px;
          color: #f01414;
        }
      }

      .button {
        margin-top: 25px;
        overflow: hidden;

        p {
          float: left;

          .price {
            color: #f01414;
            font-size: 24px;
            font-weight: 700;
          }
        }

        .el-button {
          float: right;
          background: #f01414;
          border-radius: 24px;
          font-size: 16px;
          color: #fff;
          letter-spacing: 0;
          line-height: 24px;
          padding: 12px 48px;
          border: 0;
        }
      }
    }
  }
</style>
