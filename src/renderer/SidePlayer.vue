<template>
  <div id="side_player">
    <h1>Side Player Component</h1>
    <youtube :video-id="videoId" @ready="ready" @playing="playing"></youtube>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueYouTubeEmbed from 'vue-youtube-embed'
  Vue.use(VueYouTubeEmbed)

  export default {
    name: 'sidePlayer',
    data() {
      return {
        videoId: 'yKizp0pDFtA'
      }
    },
    methods: {
      ready(player) {
        this.player = player
      }
    }
  }
</script>
<style>

</style>
