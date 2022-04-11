<template style="position: absolute">
    <div style="position: absolute; width: 100%; height: 100%">
      <div class="block" style="position: absolute; width: 100%; height: 90%">
        <el-image :src="src" :fit="contain" style="width: 100%; height: 100%">
        </el-image>
      </div>
      <div class="login" style="position: absolute;" >
        <el-tabs type="border-card">
          <el-tab-pane label="登录" style="margin-top: 20px">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable>
            </el-input>

            <el-input placeholder="请输入密码" v-model="input" show-password style="margin-top: 20px"></el-input>
            <el-button type="success" v-on:click="toLogin" style="margin-top: 20px">login</el-button>
          </el-tab-pane>

          <el-tab-pane label="注册">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable style="margin-top: 20px">
            </el-input>
            <el-input placeholder="请输入密码" v-model="input" show-password style="margin-top: 20px"></el-input>
            <el-input placeholder="请输入密码" v-model="input" show-password style="margin-top: 20px"></el-input>
            <el-button type="success" v-on:click="toLogin" style="margin-top: 20px">register</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<style>

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.left {
  left: 200px;
}
.login {
  width: 40%;
  z-index: 1;
  left: 30%;
  top: 30%
}
.block {
  margin-top: 40px;
  z-index: -1;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      usr: '',
      pwd: '',
      src: 'static/images/bg02.jpg',
      login: {
        backgroundImage:"url(" + require("../../static/images/bg.jpg") + ")"
      }
    }
  },

  methods: {
    toLogin: function () {
      let data = new FormData();
      data.append('username', this.usr)
      data.append("password", this.pwd)
      axios.post('http://127.0.0.1:8080/user/confirm', data)
      .then(res => {
        if(res.data === -1) {
          console.log("未找到该用户")
          this.$alert('用户名或密码错误', '登录失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        } else {
          this.$router.push("/search");
          this.$cookies.set("username", this.$data.usr, "1d")
        }
      })
    },
  }
}
</script>
