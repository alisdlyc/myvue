<template>
  <div id="App">
    <el-container>
      <el-header height="290px">
        <el-row type="flex" justify="center">
          <el-col :span="8"></el-col>
            <el-image :src="src" fit="scale-down"></el-image>
          <el-col :span="8"></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="8" :offset="8">
            <el-input placeholder="请输入书籍名称" v-model="searchMsg" class="input-with-select" @keyup.enter.native="toSearch" id="el_input">
              <el-button slot="append" icon="el-icon-search" v-on:click="toSearch"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
      name: "Search",
      data(){
        return{
          src: 'http://www.alisdlyc.top:5120/uploads/big/b48ff30c757a4211fad863bba22ff1de.jpg',
          searchMsg: '',
        }
      },
      methods: {
        toSearch: function () {
          if(this.searchMsg){
            let msg = this.searchMsg;
            this.searchMsg = '';
            this.$router.push({name: '/main',params:{msg: msg}})
          }
        }
      }
    }
</script>

<style scoped>
  .el-container{
    margin-top: 160px;
  }

  #el_input{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }


</style>
