<template>
  <div class="shoppingCart">
    <div class="header">
      <div class="header-content">
        <h1>我的购物车</h1>
      </div>
    </div>
    <div class="content">
      <el-card class="top">
        <el-table :data="shoppingList" ref="cart" @selection-change="selectChange">
          <el-table-column type="selection" label="全选"></el-table-column>
          <el-table-column label="课程">
            <template slot-scope="scope">
              <el-image :src="scope.row.course.cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="详情">
            <template slot-scope="scope">
              <router-link to="/">{{scope.row.course.courseName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="price">
            <template slot-scope="scope">
              <span class="price">￥ {{scope.row.course.price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="el-icon-close" @click="remove(scope.row.shoppingCartId)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="bottom">
        <div class="pay">
          <span>共计金额：</span>
          <span class="total-price">￥ {{totalPrice}}</span>
          <el-button @click="goPay">去结算</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShoppingCart',
    data: function () {
      return {
        shoppingList: [],
        totalPrice: 0
      }
    },
    methods: {
      findAll: async function () {
        let customerId = JSON.parse(sessionStorage.getItem('customer')).customerId
        const { data: res } = await this.$http.get(`ShoppingCartController/findAll/${customerId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }

        this.shoppingList = res.data.shoppingList
      },
      remove: async function (shoppingCartId) {
        const { data: res } = await this.$http.delete(`ShoppingCartController/remove/${shoppingCartId}`)
        if (!res.meta.access) {
          return this.$message.error(res.meta.msg)
        }
        this.findAll()
      },
      selectChange: function (rows) {
        let total = 0
        for (let i = 0; i < rows.length; i++) {
          total += Number.parseFloat(rows[i].course.price)
        }
        this.totalPrice = total
      },
      goPay: function () {
        let select = this.$refs.cart.store.states.selection
        if (select.length == 0) {
          return this.$message.error('未选中商品')
        }
        if (select.length > 1) {
          return this.$message.error('一次只能结算一个商品')
        }

        this.$router.push({
          name: 'ConfirmOrder',
          query: { courseId: select[0].courseId }
        })
      }
    },
    created: function () {
      this.findAll()
    }
  }
</script>

<style lang="less" scoped>
  .shoppingCart {
    min-height: 750px;
  }

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
    }

    .bottom {
      width: 1152px;
      margin: 15px auto;

      .pay {
        float: right;
        line-height: 60px;

        .total-price {
          font-size: 16px;
          color: #f01414;
          line-height: 24px;
          font-weight: 700;
        }

        .el-button {
          margin-left: 15px;
          background: #f01414;
          color: white;
          border: 0;
        }
      }
    }
  }

  a {
    text-decoration: none;
    color: #1C1F21;
    font-size: 15px;
  }

  .price {
    font-size: 16px;
    font-weight: bold;
  }

  i {
    font-size: 25px;
  }

  i:hover {
    color: rgb(92, 182, 255);
  }
</style>
