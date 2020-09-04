<template>
  <div class="orderCenter">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="全部">
        <el-card>
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>2008191126282789</span>
            <span class="time">2020-09-03 20:00:25</span>
            <i class="el-icon-delete-solid delete"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="image"></el-image>
            <div class="goods-name">
              <p>Java全栈工程师：从Java后端到全栈，高级电商全栈系统大课</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ 42.00</span>
            </div>
            <div class="buttons" v-if="false">
              <el-button class="pay">立即支付</el-button>
              <el-button>取消支付</el-button>
            </div>
            <div class="order-status">已过期</div>
          </div>
        </el-card>
        <el-card>
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>2008191126282789</span>
            <span class="time">2020-09-03 20:00:25</span>
            <i class="el-icon-delete-solid delete"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="image"></el-image>
            <div class="goods-name">
              <p>Java全栈工程师：从Java后端到全栈，高级电商全栈系统大课</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ 42.00</span>
            </div>
            <div class="buttons" v-if="false">
              <el-button class="pay">立即支付</el-button>
              <el-button>取消支付</el-button>
            </div>
            <div class="order-status">已过期</div>
          </div>
        </el-card>
        <el-card>
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>2008191126282789</span>
            <span class="time">2020-09-03 20:00:25</span>
            <i class="el-icon-delete-solid delete"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="image"></el-image>
            <div class="goods-name">
              <p>Java全栈工程师：从Java后端到全栈，高级电商全栈系统大课</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ 42.00</span>
            </div>
            <div class="buttons" v-if="false">
              <el-button class="pay">立即支付</el-button>
              <el-button>取消支付</el-button>
            </div>
            <div class="order-status">已过期</div>
          </div>
        </el-card>
        <el-card>
          <p class="order-number">
            <i class="el-icon-cpu"></i>
            <span>订单编号：</span>
            <span>2008191126282789</span>
            <span class="time">2020-09-03 20:00:25</span>
            <i class="el-icon-delete-solid delete"></i>
          </p>
          <div class="goods-infos">
            <el-image :src="image"></el-image>
            <div class="goods-name">
              <p>Java全栈工程师：从Java后端到全栈，高级电商全栈系统大课</p>
            </div>
            <div class="goods-price">
              <span>实付：</span>
              <span class="price">￥ 42.00</span>
            </div>
            <div class="buttons" v-if="false">
              <el-button class="pay">立即支付</el-button>
              <el-button>取消支付</el-button>
            </div>
            <div class="order-status">已过期</div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="未支付" name="未支付">未支付</el-tab-pane>
      <el-tab-pane label="已完成" name="已完成">已完成</el-tab-pane>
      <el-tab-pane label="已失效" name="已失效">已失效</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'OrderCenter',
    data: function () {
      return {
        activeName: '全部',
        image: 'https://imoocs.oss-cn-shanghai.aliyuncs.com/img/d14e1b2d-5556-4d5f-9b09-1f55213c5ae7.jpg'
      }
    },
    methods: {
      handleClick: function (tab, event) {

      }
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
