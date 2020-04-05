<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside>Aside</el-aside>
        <el-main>
          <h3>{{hitokoto.hitokoto}}</h3>
          <h4>{{hitokoto.from}}</h4>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return{
        hitokoto:{
          id:null,
          hitokoto:null,
          type:null,
          from:null,
          from_who:null,
          creator:null,
          creator_uid:null,
          reviewer:null,
          uuid:null,
          created_at:null,
        }
      }
    },
    mounted() {
      axios({
        url:'https://v1.hitokoto.cn/',
        method:'get',
        data:{
          c:'i',
          encode:'json',
          charset:'utf-8',
        },
        timeout:1000,
      }).then(res=>{
        console.log(res.data);
        this.hitokoto = res.data;
      })
    },
  }
</script>


<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    display: inline;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
