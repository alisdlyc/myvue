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
                <img :src="book.localImgLink" onerror="javascript:this.src='http://www.alisdlyc.top:5120/uploads/big/7329267c9a4f6ea23ae0a1882875f078.png'" alt="皮卡皮卡" class="bookImg">
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
                <img v-bind:src="book.localImgLink" onerror="javascript:this.src='http://www.alisdlyc.top:5120/uploads/big/7329267c9a4f6ea23ae0a1882875f078.png'" alt="皮卡皮卡" class="bookImg">
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
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
        <div class="scrollTop" v-show="showTop" @click="toTop">
          <div>{{this.hitokoto.hitokoto}}</div>
          <div>--{{this.hitokoto.from}}</div>
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
    margin: -48px 0 28px 244px;
    display: block;
    width: max-content;
    max-lines: 1;
  }

  .pubDate{
    color: #5D5D5D;
    font-size: small;
    font-weight: 300;
    position: relative;
    margin: -20px 0 5px 244px;
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

  .scrollTop {
    margin-top: 15px;
    text-align: center;
    font-size: 23px;
    font-family: 微软雅黑;
    font-weight: 500;
    color: darkgray;
  }
</style>

<script>
  import axios from 'axios';
  export default {
    props: ['msg'],
    name: "BookList",

    data(){
      return {
        // 返回顶部
        scrollTop: 0,
        time: 0,
        dParams: 20,
        scrollState: 0,
        // 接收首次查询的参数
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
        total:10,
        pageSize:10,
        hasNext:null,
        hasPre:null,
        searchMsg: '',

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
      window.addEventListener('scroll', this.getScrollTop);

      let data = new FormData();
      data.append('name', this.qwq);
      data.append('pageIndex', this.searchPage);
      axios.post('http://49.233.166.163:8888/monoid/getSearchRes', data)
        .then(res=>{
          console.log(res.data);
          this.total = res.data.total;
          this.hasNext = res.data.hasNext;
          this.hasPre = res.data.hasPre;
          this.books = res.data.data;
        })

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
        });
    },
    computed:{
      showTop: function(){
        let value = this.scrollTop>200?true:false;
        return value;
      },
    },
    methods: {
      toSearch: function () {
        if(this.searchMsg){
          console.log(this.searchMsg+"当前搜索的内容为"+this.searchMsg);
          let msg = this.searchMsg;
          this.searchMsg = '';
          this.$router.push({name: '/main',params:{msg: msg}})
          location.reload();
        }else{
          // 当搜索框中参数为空时，且由searchPage传回来的参数不为空，传入新的页面下标
          if(this.qwq){
            // 执行搜索方法
            console.log(this.qwq+"搜索页面下标为"+this.searchPage);
            let data = new FormData();
            data.append('name', this.qwq);
            data.append('pageIndex', this.searchPage);

            axios.post('http://49.233.166.163:8888/monoid/getSearchRes', data)
              .then(res=>{
                console.log(res.data);
                this.total = res.data.total;
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
      // 返回顶部
      toTop(e) {
        if(!!this.scrollState){
          return;
        }
        this.scrollState = 1;
        e.preventDefault();
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let _this = this;
        this.time = setInterval(function(){ _this.gotoTop(_this.scrollTop-_this.dParams) }, 10);
      },
      gotoTop(distance){
        this.dParams += 20;
        distance = distance>0 ? distance : 0;
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
        if(this.scrollTop < 10){
          clearInterval(this.time);
          this.dParams = 20;
          this.scrollState = 0;
        }
      },
      getScrollTop() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
    },
  }
</script>
