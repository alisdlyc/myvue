<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  let i = parseInt(Math.random()*8+1);
  console.log(i);
  // let i = 23
  export default {
    name: 'App',

    data(){
      return{
        pluginPath: i+"/",
        modelPath: "../static/live2dw/"+i+"/model.json",
      }
    },

    mounted () {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'static/live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: this.pluginPath,
          tagMode: true,
          debug: false,
          model: { jsonPath: this.modelPath},
          display: { position: 'right', width: 240, height: 540 },
          mobile: { show: true },
          log: false,
        })
      }, 1000)
    },
  }

</script>
