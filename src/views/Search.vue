<template>
  <div class="painter">
    <el-container>
      <el-aside width="30%" style="margin-top: 60px">
        <template>
          <el-select v-model="schemaDataSource" placeholder="Search DataSource" @change="searchTables">
            <el-option
              v-for="item in dataSource"
              :key="item.value"
              :label="item.label"
              :value="item.label">
              <span style="float: left; color: #8492a6; font-size: 10px">{{ item.value}}</span>
            </el-option>
          </el-select>
          <el-select v-model="selectTableName" placeholder="Search Table" style="width: 40%" @change="searchTableSchema">
            <el-option
              v-for="item in tablesInSource"
              :key="item.value"
              :label="item.label"
              :value="item.label">
              <span style="float: left; color: #8492a6; font-size: 10px">{{ item.value}}</span>
            </el-option>
          </el-select>
        </template>

        <template>
          <el-table
            :data="schemaData"
            border
            style="height: 90%; margin-top: 40px">
            <el-table-column v-for="{prop, label} in schemaConfigs" :key="prop" :prop="prop" :label="label"
            ></el-table-column>
          </el-table>
        </template>
      </el-aside>

      <el-container>
        <el-main >
          <el-select v-model="dataSourceValue" placeholder="请选择数据源">
            <el-option
              v-for="item in dataSource"
              :key="item.value"
              :label="item.label"
              :value="item.label">
              <span style="float: left; color: #8492a6; font-size: 10px">{{ item.value}}</span>
            </el-option>
          </el-select>
          <el-button type="success" v-on:click="submit">提交</el-button>
          <el-button type="primary" v-on:click="excelDownload">下载</el-button>
          <el-button type="primary" v-on:click="toDashBoard">DashBoard</el-button>
          <el-button type="primary" v-on:click="toApply">表权限申请</el-button>
          <codemirror
            ref="mycode"
            v-modle="curCode"
            :options="cmOptions"
            class="code"
          >
          </codemirror>
        </el-main>

        <el-footer height="400px">
          <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="查询信息" name="searchInfo">
                <p style="white-space: pre-line;font-size:16px;color:#777;"> {{searchInfo}}</p>
              </el-tab-pane>
              <el-tab-pane label="查询结果" name="searchResult">
                <template>
                  <el-table
                    id="outTable"
                    :data="colData"
                    height="300"
                    border
                    style="width: 100%">
                    <el-table-column v-for="{prop, label} in colConfigs" :key="prop" :prop="prop" :label="label"
                    ></el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.painter{
  height:100vh;
}
.code {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
}
.text-wrapper {
  white-space: pre-wrap;
}
.p{
  white-space: pre-line;
}

</style>

<script>
import {codemirror} from 'vue-codemirror';
import 'codemirror/theme/liquibyte.css'; //导入选中的theme主题,与初始化theme配置一致
import 'codemirror/addon/hint/show-hint.css'; //导入自动提示核心样式
import 'codemirror/mode/sql/sql.js'; //导入使用的语言语法定义文件，初始化mode配置一致
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/hint/show-hint.js'; //导入自动提示核心文件
import 'codemirror/addon/hint/sql-hint.js'; //导入指定语言的提示文件
import 'codemirror/theme/idea.css'
import axios from 'axios'
import {saveAs} from 'file-saver';

export default {
  name: 'Search',
  data() {
    return {
      dataSource: [{
        value: 'ELASTICSEARCH_CONNECTOR',
        label: 'ElasticSearch'
      }, {
        value: 'CLICKHOUSE_CONNECTOR',
        label: 'ClickHouse'
      }],
      dataSourceValue: '',
      value: '',
      curCode:'',
      cmOptions:{
        theme: "liquibyte",//编辑器样式的主题
        lineNumbers: true,//是否在编辑器左侧显示行号。
        matchBrackets : true,//括号匹配
        autofocus: true,//可用于使CodeMirror将焦点集中在初始化上
        mode: 'text/x-sql',
      },
      colConfigs:[],
      colData: [],
      searchInfo: '',
      activeName: 'searchInfo',
      schemaDataSource: '',
      tablesInSource: [],
      selectTableName: '',
      schemaConfigs:[],
      schemaData: [],
      datatime: ''
    }
  },
  methods: {
    submit: function () {
      this.$data.colData = null
      this.$data.colConfigs = null

      if(this.$data.dataSourceValue === '') {
        this.$message({
          message: '请选择数据源',
          type: 'error',
          duration: 500
        })
      } else {
        this.$message({
          message: '提交成功',
          type: 'success',
          duration: 200
        })
        let sqlContext = this.$refs.mycode.codemirror.getValue();

        this.$data.searchInfo = "SQL: \n" + sqlContext
        let data = new FormData
        data.append("sqlContext", sqlContext)
        data.append("username", this.$cookies.get("username"))
        data.append("dataSource", this.$data.dataSourceValue)
        axios.post('http://127.0.0.1:8080/sql/query', data)
          .then(res => {
            this.$data.searchInfo += "\n查询结束"
            let keys = []
            for(let key in res.data[0]) {
              let str = {}
              str['prop'] = key
              str['label'] = key
              keys.push(str)
            }
            this.$data.colConfigs = keys
            this.$data.colData = res.data
          })
      }
    },

    searchTables: function () {
      let data = new FormData
      data.append("dataSource", this.$data.schemaDataSource)
      axios.post('http://127.0.0.1:8080/sql/showTables', data)
      .then(res => {
        let k = ''
        for(let key in res.data[0]) {
         k = key
        }
        for(let i=0; i < res.data.length; i++) {
          let str = {}
          str["value"] = res.data[i][k]
          str["label"] = res.data[i][k]
          this.$data.tablesInSource.push(str)
        }
      })
    },

    searchTableSchema: function () {
      let data = new FormData
      data.append("dataSource", this.$data.schemaDataSource)
      data.append("table", this.$data.selectTableName)
      axios.post('http://127.0.0.1:8080/sql/showTableSchema', data)
      .then(res => {
        let keys = []
        for(let key in res.data[0]) {
          let str = {}
          str['prop'] = key
          str['label'] = key
          keys.push(str)
        }
        this.$data.schemaConfigs = keys;
        this.$data.schemaData = res.data;
      })
    },

    excelDownload: function () {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      this.$data.datatime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
      let fileName = this.$data.datatime + '.txt'
      var data = JSON.stringify(this.$data.colData)
      let str = new Blob([data], {type: 'text/plain;charset=utf-8'})
      saveAs(str, fileName)
    },

    toDashBoard() {
      if (this.$data.colData.length !== 0) {

        if(this.$data.colConfigs.length !== 2 && this.$data.colConfigs.length !== 3) {
          this.$message.error({
            message: '系统仅支持二维和三维数据的可视化',
            type: 'error',
            duration: 500
          })
        } else {
          let keys = []
          for(let item in this.$data.colConfigs) {
            keys.push(this.$data.colConfigs[item]['prop'])
          }

          if(this.$data.colConfigs.length === 2) {
            let k1 = this.$data.colConfigs[0]['prop']
            let k2 = this.$data.colConfigs[1]['prop']
            let re = []

            for(let item of this.$data.colData) {
              let tmp = {}
              tmp['value'] = item[k2]
              tmp['name'] = item[k1]
              re.push(tmp)
            }
            this.$router.push({
              name: '/dashboard',
              params: {
                re: re,
                dim: "2"
              }
            })
          }

          if(this.$data.colConfigs.length === 3) {
            // Map{k1, [k2, v]}
            let k1 = new Set()
            let k2 = new Set()
            for(let item of this.$data.colData) {
              k1.add(item[keys[0]])
              k2.add(item[keys[1]])
            }

            let timeKeyArr = Array.from(k1)
            let colKeyArr = Array.from(k2)
            let value = {}
            for(let k of colKeyArr) {
              value[k] = {}
            }

            let dic = {}
            for(let index in timeKeyArr) {
              dic[timeKeyArr[index]] = index
            }


            let re = []
            console.log("colData: " + JSON.stringify(this.$data.colData))
            for(let k of colKeyArr) {
              let tmp = {}
              let arr = new Array(timeKeyArr.length)
              for(let item of this.$data.colData) {
                if(item[keys[1]] === k) {
                  arr[dic[item[keys[0]]]] = item[keys[2]]
                }
              }
              tmp['name'] = k
              tmp['type'] = 'line'
              tmp['stack'] = 'Total'
              tmp['data'] = arr
              re.push(tmp)

              this.$router.push({
                name: '/dashboard',
                params: {
                  k1: timeKeyArr,
                  k2: colKeyArr,
                  re: re,
                  dim: "3"
                }
              })
            }
          }
        }
      } else {
        this.$message({
          message: '请先查询数据',
          type: 'error',
          duration: 500
        })
      }
    },

    toApply: function () {
      this.$router.push("/apply")
    }
  },
  components:{
    codemirror
  },

  mounted() {
    this.$refs.mycode.codemirror.setSize("auto", (document.documentElement.clientHeight-550) + "px")
  }
}
</script>


