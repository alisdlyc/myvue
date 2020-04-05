<template>
  <div class="painter">
    <div id="container">
      <el-container>
        <el-header>
          <div class="center">
            <el-row>
              <el-col :span="12" :offset="6">
                <el-input placeholder="请输入书籍名称" v-model="searchMsg" class="input-with-select" @keyup.enter.native="toSearch">
                  <el-button slot="append" icon="el-icon-search" v-on:click="toSearch"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-container>
          <el-aside width="52%">
            <div v-for="book in books">
              <div class="book">
                <input type="hidden" v-bind:placeholder="book.id">
                <img v-bind:src="book.localImgLink" alt="皮卡皮卡" class="bookImg">
                <div class="bookName">
                  {{book.bookName}}
                </div>
                <div class="writer">
                  {{book.writer}}
                </div>
                <div class="press">
                  {{book.press}}
                </div>
                <div class="pubDate">
                  {{book.pubDate}}
                </div>
              </div>
            </div>
          </el-aside>

          <el-main>
            <div v-for="book in books">
              <div class="book">
                <input type="hidden" v-bind:placeholder="book.id">
                <img v-bind:src="book.localImgLink" alt="皮卡皮卡" class="bookImg">
                <div class="bookName">
                  {{book.bookName}}
                </div>
                <div class="writer">
                  {{book.writer}}
                </div>
                <div class="press">
                  {{book.press}}
                </div>
                <div class="pubDate">
                  {{book.pubDate}}
                </div>
              </div>
            </div>
          </el-main>
        </el-container>

        <div class="block">
          <el-pagination
            page-size= 10
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="totalPages">
          </el-pagination>
        </div>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
  .painter{
    position: relative;
  }

  .book{
    position: relative;
    width: 90%;
    height: 120px;
    background: #f6f6f6;
    padding: 5px;
    display: inline-block;
    margin: 10px;
    border-radius: 10px;
    text-align: center;
  }

  .bookImg{
    display: block;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 10px 0 0 110px;
  }

  .bookName{
    font-size: 15px;
    font-weight: 400;
    color: #76a993;
    position: relative;
    margin: -103px 0px 80px 244px;
    display: block;
    width: max-content;
  }

  .writer{
    color: #5D5D5D;
    font-size: small;
    font-weight: 400;
    position: relative;
    margin: -77px 0 53px 244px;
    display: block;
    width: max-content;
    max-lines: 1;
    max-width: 350px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .press{
    color: #5D5D5D;
    font-size: small;
    font-weight: 300;
    position: relative;
    margin: -48px 0px 28px 244px;
    display: block;
    width: max-content;
    max-lines: 1;
  }

  .pubDate{
    color: #5D5D5D;
    font-size: small;
    font-weight: 300;
    position: relative;
    margin: -20px 0px 5px 244px;
    display: block;
    width: max-content;
    max-lines: 1;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    padding: 10px 0 0 0;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: start;
  }

  div > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
    display: inline;
    width: auto;
  }

  .center{
    margin: auto;
  }

  .block{
    margin: 0 auto;
    padding-top: 20px;
  }

  .Sidebar{
    position: relative;
    display: block;
    float: left;
    margin:0 0 0 200px;
    clear: both;
    border-radius: 10px;
  }
</style>

<script>
  import axios from 'axios';
  export default {
    props: ['msg'],
    name: "BookList",

    data(){
      return {
        qwq: this.$route.params.msg,
        searchPage: 1,
        books:[{
          id:null,
          bookName:null,
          writer:null,
          press:null,
          rating:null,
          pubDate:null,
          localImgLink:null,
        }],
        currentPage:1,
        totalPages:null,
        pageSize:10,
        hasNext:null,
        hasPre:null,
        searchMsg: '',
      }
    },
    mounted() {
      axios({
        url:'http://39.107.77.0:3090/monoid/info/'+this.qwq+'/'+this.searchPage,
        method:'get'
      }).then(res=>{

        // this.currentPage = res.data.currentPage;
        this.totalPages = res.data.totalPages*10;
        this.hasNext = res.data.hasNext;
        this.hasPre = res.data.hasPre;
        this.books = res.data.data;
      })
    },
    methods: {
      toSearch: function () {
        if(this.searchMsg){
          let msg = this.searchMsg;
          this.searchMsg = '';
          this.$router.push({name: '/main',params:{msg: msg}})
        }else{
          // 当搜索框中参数为空时，且由searchPage传回来的参数不为空，传入新的页面下标
          if(this.qwq){
            // 执行搜索方法
            axios({
              url:'http://39.107.77.0:3090/monoid/info/'+this.qwq+'/'+this.searchPage,
              method:'get'
            }).then(res=>{
              this.totalPages = res.data.totalPages*10;
              this.hasNext = res.data.hasNext;
              this.hasPre = res.data.hasPre;
              this.books = res.data.data;
            })
          }
        }
      },
      // 当页面下标发生变化时执行该方法
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage) ; //点击第几页
        // 当页面发生变化时可以调用toSearch(),刷新当前页面
        this.searchPage = currentPage;
        this.toSearch();
      },

    },
  }
</script>
