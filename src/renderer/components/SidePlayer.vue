<template>
  <div id="side_player">
    <youtube :video-id="videoId" @ready="ready"></youtube>
  </div>
</template>
<script>
  /*
    SidePlayer component reacts to electron IPC messages.
     - 'side-player/toggle-play'
     - 'side-player/change-video','[VIDEO-ID]'
  */
  import Vue from 'vue'
  import VueYouTubeEmbed from 'vue-youtube-embed'
  const electron = require('electron');
  const ipc = electron.ipcRenderer;
  const remote = electron.remote;
  const windowManager = remote.require('electron-window-manager');

  function reactEvent(ev, fun) {
    ipc.on(ev, fun); // react from server events
    windowManager.bridge.on(ev, fun); // react from client events
  }

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
        this.player = player;

        reactEvent('side-player/toggle-play', (data,arg) => {
          this.togglePlay();
        });
        reactEvent('side-player/change-video', (data,arg) => {
          this.videoId = arg;
        });

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
