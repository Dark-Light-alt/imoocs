<template>
    <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="我的专刊" name="first">
            <div v-for="(item,index) in myMonographs" :key="index">
              <div class="content">
                <!--专刊头像-->
                <div class="img">
                  <a @click="monographDetials(item.monograph)">
                    <el-image :src="item.monograph.cover"></el-image>
                  </a>
                </div>
                <div class="detials">
                  <h3 @click="monographDetials(item.monograph)">{{item.monograph.monographName}}</h3>
                  <h5>{{item.monograph.highlights}}</h5>
                  <el-tag type="danger" v-if="item.monograph.offShelf==3">已下架</el-tag>
                  <el-tag type="danger" v-if="item.monograph.offShelf!=3">已学习</el-tag>
                  <div style="float: right;">
                    <el-button type="danger" round @click="monographDetials(item.monograph)" v-if="item.monograph.offShelf!=3">查看详情</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
      name: "MyMonograph",
      data:function(){
        return {
          activeName:"first",
          myMonographs:[]
        }
      },
      methods:{
        findAll:async function(){
          let customer = JSON.parse(sessionStorage.getItem("customer"));
          const {data:res}=await this.$http.get(`MyMonographController/findMonographByCustomerId/${customer.customerId}`);
          if(!res.meta.access){
            this.$message.error(res.meta.msg)
          }
          this.myMonographs = res.data.myMonographs;
          console.log(this.myMonographs);
        },
        monographDetials:function(item){
          if(item.offShelf==3){
            this.$message.warning("专刊已下架");
          }else{
            sessionStorage.setItem("monograph",JSON.stringify(item));
            //跳转到专刊详情页面
            this.$router.push({name:"MonographDetials"});
          }
        }
      },
      created:function(){
        this.findAll();
      }
    }
</script>

<style scoped>
  .content{
    height: 200px;
    padding-bottom: 20px;
  }

  .img{
    height: 200px;
    width: 15%;
    float: left;
  }

  .detials{
    height: 200px;
    width: 80%;
    float: left;
    margin-left: 20px;
    border-bottom: 3px solid rgb(245,245,245);
  }


</style>
