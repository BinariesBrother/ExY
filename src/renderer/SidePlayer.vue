<template>
  <div id="side_player">
    <youtube :video-id="videoId" @ready="ready"></youtube>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueYouTubeEmbed from 'vue-youtube-embed'
  const ipc = require('electron').ipcRenderer;

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
        ipc.on('side-player/toggle-play', () => {
          this.togglePlay();
        })
        ipc.on('side-player/change-video', (data,arg) => {
          this.videoId = arg;
        })
      },
      togglePlay() {
        if ( this.player.getPlayerState() == 1 ) { // if playing
          this.player.pauseVideo();
        }
        else if ( this.player.getPlayerState() == 2 || this.player.getPlayerState() == 5 ) { // if paused
          this.player.playVideo();
        }
      }
    }
  }
</script>
<style>
  #side_player {
    width: 100%;
    min-height: 100vh;
    margin:0;
    padding:0;
    background-color: black;
  }
</style>
