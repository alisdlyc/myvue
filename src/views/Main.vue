<template>
  <div>
    <el-row class="login">
      <el-col :span="8"><div class="grid-content"></div></el-col>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="usr">
          <template slot="prepend">username</template>
        </el-input>

        <el-input placeholder="请输入内容" v-model="pwd">
          <template slot="prepend">password</template>
        </el-input>

        <el-button type="success" v-on:click="toLogin">login</el-button>
      </el-col>
      <el-col :span="8"><div class="grid-content"></div></el-col>
    </el-row>
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
  top: 400px
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      usr: '',
      pwd: '',
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
