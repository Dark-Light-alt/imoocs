<template>
  <div class="successPay">
    <div class="main">
      <div class="top">
        <i class="el-icon-success"></i>
        <p>您已成功购买 1 门课程！</p>
      </div>
      <div class="content">
        <dl>
          <dl>订单号：{{order.orderNumber}}</dl>
          <dl>实付金额：<span class="price">￥ {{order.orderMoney}}</span></dl>
          <dl>购买课程：{{order.course.courseName}}</dl>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SuccessPay',
    data: function () {
      return {
        order: JSON.parse(sessionStorage.getItem('order'))
      }
    },
    methods: {
      returns: async function () {
        const { data: res } = await this.$http.post('OrdersController/returns', { orderNumber: this.order.orderNumber })
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        sessionStorage.removeItem('order')
      }
    },
    created: function () {
      this.returns()
    }
  }
</script>

<style lang="less" scoped>
  .main {
    width: 1100px;
    min-height: 750px;
    background-color: white;
    margin: 0 auto;

    .top {
      padding-top: 100px;
      padding-left: 50px;
      overflow: hidden;
      height: 150px;
      border-bottom: 1px solid #b5b9bc;

      i {
        font-size: 90px;
        color: #00b33b;
        float: left;
      }

      p {
        float: left;
        font-size: 28px;
        margin-left: 15px;
      }
    }

    .content {
      padding-top: 15px;
      padding-left: 50px;

      dl {
        height: 40px;
      }

      .price {
        font-weight: bold;
        font-size: 20px;
        color: #3377ff;
      }
    }
  }
</style>
