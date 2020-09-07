<template>
  <div class="main">
    <div style="margin: 20px">
      <div style="padding-bottom: 20px">
        <span style="font-size: 19px;font-weight: bold">个人信息</span>
        <el-button style="float: right" icon="el-icon-edit" title="修改" @click="updateDialogVisible = true" round>编辑</el-button>
      </div>
      <el-form :v-model="customerInfo">
      <el-form-item label="昵称：">
        <span>{{ customerInfo.customerNickname }}</span>
      </el-form-item>
      <el-form-item label="电子邮箱：">
        <span>{{ customerInfo.customerEmail }}</span>
      </el-form-item>
      <el-form-item label="联系方式：" >
        <span>{{ customerInfo.customerPhone }}</span>
      </el-form-item>
      <el-form-item label="现居住地：">
        <span>{{ customerInfo.customerAddress }}</span>
      </el-form-item>
      <el-form-item label="性别：">
        <span>{{ customerInfo.customerSex === 0 ? '男' : '女' }}</span>
      </el-form-item>
        <el-form-item label="个人简介：" prop="personalAbout">
          <span>{{ customerInfo.personalAbout}}</span>
        </el-form-item>
        <el-form-item label="职位：" prop="customerInfo.customerPosition.positionName">
          <span>{{ customerInfo.customerPosition.positionName}}</span>
        </el-form-item>
    </el-form>

    <el-dialog title="编辑个人信息" :visible.sync="updateDialogVisible" width="50%" @open="findById">
      <el-form :model="customerInfo" status-icon label-width="100px">
        <el-form-item label="昵称" prop="customerNickname">
          <el-input v-model="customerInfo.customerNickname"></el-input>
        </el-form-item>

        <el-form-item label="电子邮箱" prop="customerEmail">
          <el-input v-model="customerInfo.customerEmail"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="customerPhone">
          <el-input v-model="customerInfo.customerPhone"></el-input>
        </el-form-item>

        <el-form-item label="职位" prop="positionId">
          <el-select v-model="customerInfo.positionId" placeholder="请选择">
            <el-option v-for="item in positionListInfo" :key="item.positionId" :label="item.positionName"
                       :value="item.positionId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地址" prop="customerAddress">
          <el-input v-model="customerInfo.customerAddress"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="customerSex">
          <el-radio-group v-model="customerInfo.customerSex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个人简介" prop="personalAbout">
          <el-input v-model="customerInfo.personalAbout"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialogVisible = false">取消</el-button>
          <el-button @click="update()">确定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "PersonalCenter",
      data() {
        return {
          customerInfo: {
            customerId:'',
            customerNickname: '',
            customerEmail: '',
            customerPhone: '',
            positionId:'',
            customerAddress: '',
            customerSex: null,
            personalAbout:'',
            customerPosition:{
              positionName:''
            }
          },
          positionListInfo:[],
          updateDialogVisible: false
        }
      },
      created: function () {
        this.findById();
      },
      methods: {
        findById: async function () {
          const customerId = JSON.parse(sessionStorage.getItem("customer")).customerId
          const {data: res} = await this.$http.get(`CustomerController/findPosition/${customerId}`)
          if (!res.meta.access) {
            return this.$message.error(res.meta.msg)
          }
          this.customerInfo = res.data.customer
          console.log(res.data.customer)

          const { data: position } = await this.$http.get('CustomerPositionController/findAll')
          if (!position.meta.access) {
            return this.$message.error(position.meta.msg)
          }
          this.positionListInfo = position.data.positionList

          console.log(position.data.positionList)
          console.log(this.positionListInfo[0].positionId)
          console.log(this.positionListInfo[0].positionName)
        },
        update: async function () {
          const {data: res} = await this.$http.put('CustomerController/update', this.customerInfo)
          if (!res.meta.access) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          this.updateDialogVisible = false
          this.findById()
        },
        close:function () {
          this.$router.push("Home")
        }
      }
    }
</script>

<style scoped>
  .main{
    width: 100%;
    overflow-y: auto;
    height: 500px;
    background-color: rgb(255,255,255);
  }
</style>
