<template>
  <div class="orderCenter">
    <el-tabs v-model="orderStatus" @tab-click="handleClick">
      <el-tab-pane label="全部" name="-1">
        <el-card v-for="order in orderList" :key="order.orderId">
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>{{order.orderNumber}}</span>
            <span class="time">{{order.orderTime}}</span>
            <i class="el-icon-delete-solid delete" @click="changeIsenable(order.orderId)"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="order.course.cover"></el-image>
            <div class="goods-name">
              <p>{{order.course.courseName}}</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ {{order.orderMoney}}</span>
            </div>
            <div class="buttons" v-if="order.orderStatus == 0">
              <el-button class="pay" @click="pay(order.orderId)">立即支付</el-button>
              <el-button @click="changeStatus(order.orderNumber)">取消订单</el-button>
            </div>
            <div class="order-status" v-if="order.orderStatus == 1">已完成</div>
            <div class="order-status" v-if="order.orderStatus == 2">已失效</div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="未支付" name="0">
        <el-card v-for="order in orderList" :key="order.orderId">
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>{{order.orderNumber}}</span>
            <span class="time">{{order.orderTime}}</span>
            <i class="el-icon-delete-solid delete" @click="changeIsenable(order.orderId)"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="order.course.cover"></el-image>
            <div class="goods-name">
              <p>{{order.course.courseName}}</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ {{order.orderMoney}}</span>
            </div>
            <div class="buttons" v-if="order.orderStatus == 0">
              <el-button class="pay" @click="pay(order.orderId)">立即支付</el-button>
              <el-button @click="changeStatus(order.orderNumber)">取消订单</el-button>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="1">
        <el-card v-for="order in orderList" :key="order.orderId">
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>{{order.orderNumber}}</span>
            <span class="time">{{order.orderTime}}</span>
            <i class="el-icon-delete-solid delete" @click="changeIsenable(order.orderId)"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="order.course.cover"></el-image>
            <div class="goods-name">
              <p>{{order.course.courseName}}</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ {{order.orderMoney}}</span>
            </div>
            <div class="order-status" v-if="order.orderStatus == 1">已完成</div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="已失效" name="2">
        <el-card v-for="order in orderList" :key="order.orderId">
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>{{order.orderNumber}}</span>
            <span class="time">{{order.orderTime}}</span>
            <i class="el-icon-delete-solid delete" @click="changeIsenable(order.orderId)"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="order.course.cover"></el-image>
            <div class="goods-name">
              <p>{{order.course.courseName}}</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ {{order.orderMoney}}</span>
            </div>
            <div class="order-status" v-if="order.orderStatus == 2">已失效</div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'OrderCenter',
    data: function () {
      return {
        orderStatus: '-1',
        orderList: []
      }
    },
    methods: {
      handleClick: function (tab, event) {
        this.orderStatus = tab.name
        this.findAllOrder()
      },
      pay: function (orderId) {
        this.$router.push({
          name: 'Pay',
          query: { orderId: orderId }
        })
      },
      changeIsenable: async function (orderId) {
        const result = await this.$confirm('删除后，将无法再查看该订单，请谨慎操作！', '您确定要删除该订单吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if (result !== 'confirm') {
          return
        }

        const { data: res } = await this.$http.get(`OrdersController/changeIsenable/${orderId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
        this.findAllOrder()
      },
      changeStatus: async function (orderNumber) {
        const { data: res } = await this.$http.get(`OrdersController/changeStatus/${orderNumber}/2`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
        this.findAllOrder()
      },
      findAllOrder: async function () {
        let params = {
          customerId: JSON.parse(sessionStorage.getItem('customer')).customerId,
          orderStatus: this.orderStatus
        }
        const { data: res } = await this.$http.post('OrdersController/findAllOrder', params)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.orderList = res.data.orderList
      }
    },
    created: function () {
      this.findAllOrder()
    }
  }
</script>

<style lang="less" scoped>
  .orderCenter {
    width: 1200px;
    margin: 0 auto;
  }

  .el-card {
    margin-bottom: 25px;

    .order-number {
      padding: 5px 0 19px;
      font-weight: 700;
      color: #4d555d;
      border-bottom: 1px solid #b7bbbf;
      font-size: 12px;
      line-height: 12px;
      box-sizing: border-box;

      .time {
        color: #93999f;
        font-weight: 500;
        margin-left: 25px;
      }

      .delete {
        float: right;
        margin-right: 25px;
      }
    }

    .goods-infos {
      margin: 25px;
      overflow: hidden;

      .el-image {
        width: 160px;
        height: 90px;
        background-size: cover;
        float: left;
      }

      .goods-name {
        float: left;
        margin-left: 15px;
        padding-right: 30px;
        width: 300px;
        border-right: 1px solid #d9dde1;
        height: 90px;
      }

      .goods-price {
        float: left;
        margin-left: 30px;
        padding-right: 30px;
        width: 200px;
        border-right: 1px solid #d9dde1;
        height: 90px;
        line-height: 90px;

        .price {
          color: #f01414;
        }
      }

      .buttons {
        float: left;
        margin-left: 30px;
        width: 300px;
        height: 90px;
        line-height: 90px;
        text-align: center;

        .pay {
          width: 120px;
          color: #fff;
          background: rgba(240, 20, 20, .8);
          border: 0;
        }

        .el-button {
          border-radius: 18px;
        }
      }

      .order-status {
        height: 90px;
        line-height: 90px;
        text-align: center;
        color: #93999f;
      }
    }
  }
</style>
