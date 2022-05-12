<template>
  <el-container class="painter">
    <el-main class="painter">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="height: 95%" >
        <el-tab-pane label="权限申请" name="requestForPermission">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人: ">
              <el-select v-model="selectedUser" placeholder="Search DataSource">
                <el-option
                  v-for="item in superUser"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                  <span style="float: left; color: #8492a6; font-size: 10px">{{ item.value}}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据源: ">
              <el-select v-model="selectedSource" placeholder="Search DataSource" @change="searchTables">
                <el-option
                  v-for="item in dataSource"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                  <span style="float: left; color: #8492a6; font-size: 10px">{{ item.value}}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据表: ">
              <el-select v-model="selectedTable" placeholder="Search Table">
                <el-option
                  v-for="item in dataTable"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                  <span style="float: left; color: #8492a6;">{{ item.value}}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加</el-button>
            </el-form-item>
          </el-form>

          <template>
            <el-table
              :data="submitData"
              max-height="500">
              <el-table-column
                fixed
                prop="fromUser"
                label="申请人"
                width="150">
              </el-table-column>
              <el-table-column
                prop="toUser"
                label="审批人"
                width="120">
              </el-table-column>
              <el-table-column
                prop="dataSource"
                label="数据源"
                width="120">
              </el-table-column>
              <el-table-column
                prop="dataTable"
                label="数据表"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, submitData)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <el-button type="success" @click="submitAndReturn" style="margin-top: 20px">提交申请</el-button>
          <el-button type="success" @click="returnSearchPage" style="margin-top: 20px">返回</el-button>
        </el-tab-pane>
        <el-tab-pane label="申请历史" name="requestHistory">
          <el-table
            id="outTable"
            :data="requestHistoryColData"
            border
            style="width: 100%">
            <el-table-column v-for="{prop, label} in requestHistoryColConfig" :key="prop" :prop="prop" :label="label"
            ></el-table-column>
          </el-table>
        </el-tab-pane>


        <el-tab-pane  label="权限审批" name="permitHistory" class="painter" style="height: 90%">
          <el-tabs type="border-card" v-model="permitSwitch" style="height: 80%">
            <el-tab-pane label="待审批" name="todoTab" style="height: 100%">
              <el-table
                :data="permitHistoryColData"
                border
                style="width: 100%">
                <el-table-column v-for="{prop, label} in permitHistoryColConfig" :key="prop" :prop="prop" :label="label"
                >
                </el-table-column>

                <el-table-column
                  label="access"
                  width="120"
                  class="demo-form-inline">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="accessSubmit(scope.$index)"
                      type="text"
                      size="small">
                      批准权限
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="deby"
                  width="120"
                  class="demo-form-inline">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="denySubmit(scope.$index)"
                      type="text"
                      size="small">
                      驳回申请
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="已审批" name="doneTab">
              <el-table
                :data="permitHistoryColDoneData"
                height="300"
                border
                style="width: 100%">
                <el-table-column v-for="{prop, label} in permitHistoryColConfig" :key="prop" :prop="prop" :label="label"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

      </el-tabs>


    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "Apply",
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      superUser: [],
      dataSource: [],
      dataTable: [],
      selectedUser: '',
      selectedSource: '',
      selectedTable: '',
      submitData: [],
      activeName: 'requestForPermission',
      requestHistoryColConfig: [],
      requestHistoryColData: [],
      permitHistoryColData: [],
      permitHistoryColConfig: [],
      permitHistoryColDoneData: [],
      permitSwitch: 'todoTab'
    }
  },
  methods: {
    onSubmit() {
      let tmp = {}
      tmp['fromUser'] = this.$cookies.get("username")
      tmp['toUser'] = this.$data.selectedUser
      tmp['dataSource'] = this.$data.selectedSource
      tmp['dataTable'] = this.$data.selectedTable

      let flag = true
      let data = this.$data.submitData
      for (let i = 0; i < data.length; i++) {
        if(data[i]['fromUser'] === tmp['fromUser']
          && data[i]['toUser'] === tmp['toUser']
          && data[i]['dataSource'] === tmp['dataSource']
          && data[i]['dataTable'] === tmp['dataTable']) {
          flag = false
          break
        }
      }
      if(flag) this.$data.submitData.push(tmp)
    },
    initData: function() {
      axios.post('http://localhost:8080/user/superuser').then(res => {
        let data = res.data
        for(let i = 0; i < data.length; i++) {
          let tmp = {}
          tmp['label'] = data[i]
          tmp['value'] = data[i]
          this.$data.superUser.push(tmp)
        }
      });
      axios.post('http://localhost:8080/sql/showDataSource').then(res => {
        let data = res.data
        for(let i = 0; i < data.length; i++) {
          let tmp = {}
          tmp['label'] = data[i]
          tmp['value'] = data[i]
          this.$data.dataSource.push(tmp)
        }
      })
    },
    searchTables: function () {
      let data = new FormData
      data.append("dataSource", this.$data.selectedSource)
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
            this.$data.dataTable.push(str)
          }
        })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    submitAndReturn() {
      this.$message({
        message: '提交成功',
        type: 'success',
        duration: 1000
      })
      let formData = new FormData;
      formData.append('submitData', JSON.stringify(this.$data.submitData))
      axios.post('http://localhost:8080/permission/submit', formData).then(res => {
        this.submitData = []
      })
    },

    returnSearchPage() {
      this.$router.push("/search")
    },

    searchSubmissionHistory() {
      console.log("申请历史")
    },

    handleClick(targetName, event) {
      if (targetName.index == 0) {
      }
      if (targetName.index == 1) {
        let formData = new FormData
        formData.append("fromUser", this.$cookies.get("username"))
        axios.post('http://localhost:8080/permission/requestHistory', formData).then(res => {
          let keys = []
          for (let key in res.data[0]) {
            let str = {}
            str['prop'] = key
            str['label'] = key
            keys.push(str)
          }
          let re = []
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i]["fromUser"] === this.$cookies.get("username")) {
              re.push(res.data[i])
            }
          }
          this.$data.requestHistoryColConfig = keys
          this.$data.requestHistoryColData = re
        })
      }
      if (targetName.index == 2) {
        let formData = new FormData
        formData.append("toUser", this.$cookies.get("username"))
        axios.post('http://localhost:8080/permission/permitHistory', formData).then(res => {
          let keys = []
          for (let key in res.data[0]) {
            let str = {}
            str['prop'] = key
            str['label'] = key
            keys.push(str)
          }
          let re = []
          let doneRe = []
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i]["toUser"] === this.$cookies.get("username")
                && res.data[i]["status"] === "待审批") {
              re.push(res.data[i])
            } else if(res.data[i]["toUser"] === this.$cookies.get("username")) {
              doneRe.push(res.data[i])
            }
          }
          this.$data.permitHistoryColConfig = keys
          this.$data.permitHistoryColData = re
          this.$data.permitHistoryColDoneData = doneRe
        })
      }
    },

    accessSubmit(index) {
      let formData = new FormData
      formData.append("isPass", "1")
      formData.append("colData", JSON.stringify(this.permitHistoryColData[index]) )
      this.permitHistoryColData.splice(index, 1);

      axios.post("http://localhost:8080/permission/approve", formData).then(res => {
      })

    },

    denySubmit(index) {
      let formData = new FormData
      formData.append("isPass", "0")
      formData.append("colData", JSON.stringify(this.permitHistoryColData[index]) )
      this.permitHistoryColData.splice(index, 1);

      axios.post("http://localhost:8080/permission/approve", formData).then(res => {
      })
    }

  },

  async created() {
    await this.initData()
  },
}
</script>

<style scoped>
.painter{
  height:100vh;
}
</style>
