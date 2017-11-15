<template>
  <div id="app">
    <md-toolbar class="md-transparent exy-toolbar app-draggable" style="z-index: 1000">
      <md-button class="md-icon-button" @click="toggleDrawerCollapse" title="Collapsed the playlists">
        <md-icon class="icon-collapsible" :class="{ collapsed: drawerCollapsed }">keyboard_capslock</md-icon>
      </md-button>
      <span style="flex: 1;"></span>
      <md-button class="md-icon-button" @click="minimize" title="Minimize">
        <md-icon>remove</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="toggleMaximize" title="Maximize">
        <md-icon>crop_square</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="close" title="Quit ExY">
        <md-icon>close</md-icon>
      </md-button>
    </md-toolbar>
    <div class="main-content" :class="{ 'drawer-is-collapsed': drawerCollapsed }">
      <button @click="openSidePlayer">SIDE PLAYER</button>
      <button @click="closeSidePlayer">CLOSE PLAYER</button>
      <button @click="toggleSidePlayerPlay">TOGGLE PLAY</button>
      <button @click="changeVideo">CHANGE VIDEO</button>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur eos facilis fugit harum itaque qui reprehenderit tempore voluptatem! Aliquam minima quae quis reprehenderit voluptatum. Eum explicabo nostrum possimus repellat.
    </div>
    <div class="navigation-drawer" :class="{ collapsed: drawerCollapsed }">
    </div>
    <div class="bottom-drawer"></div>
    <!--<Loader></Loader>-->
  </div>
</template>

<script>
  import Loader from './Loader'
  import electron from 'electron'
//  const electron = require('electron')
  const {remote} = electron
  const windowManager = remote.require('electron-window-manager')
  const ipc = require('electron').ipcRenderer;

  export default {
    name: 'exy',
    components: {
      Loader
    },
    data() {
      return {
        connected: false,
        drawerCollapsed: false,
      }
    },
    methods: {
      minimize() {
        windowManager.minimize('main')
      },

      toggleMaximize() {
        windowManager.maximize('main')
      },

      close() {
        windowManager.close('main')
      },

      toggleDrawerCollapse() {
        this.drawerCollapsed = !this.drawerCollapsed
      },

      openSidePlayer() {
        ipc.send('side-player/open')
      },

      closeSidePlayer() {
        ipc.send('side-player/close')
      },

      toggleSidePlayerPlay() {
        ipc.send('side-player/toggle-play')
      },

      changeVideo() {
        ipc.send('side-player/change-video', 'i4HMVxE7las')
      }

    }
  }
</script>

<style lang="scss">
  @import '~@/assets/scss/variables';
  @import '~@/assets/scss/theme';


  .icon-collapsible {
    transform: rotate(-90deg);
    transition: transform 0.3s linear;
    &.collapsed {
      transform: rotate(90deg);
    }
  }

  .exy-toolbar {
    position: relative;
    font-size: 16px;
    min-height: $toolbarHeight;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background: linear-gradient(to right, #424242, transparent);
    }
  }

  .navigation-drawer {
    position: absolute;
    top: $toolbarHeight;
    left: 0;
    width: $drawerWidth;
    height: calc(100vh - #{$toolbarHeight});
    background-color: white;
    overflow-x: hidden;
    transition: width 0.3s linear;
    border-right: 1px solid #424242;

    &.collapsed {
      width: $drawerCollapsedWidth;

      &:hover {
        width: $drawerWidth;
      }
    }
  }

  .main-content {
    padding: 32px;
    box-sizing: border-box;
    height: calc(100vh - #{$toolbarHeight});
    overflow-y: auto;
    margin-left: $drawerWidth;
    transition: margin-left 0.3s linear;

    &.drawer-is-collapsed {
      margin-left: $drawerCollapsedWidth;
    }
  }

  .bottom-drawer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 32px;
    background-color: rgba(0,0,0,0.6);
    transform: translateY(50%);
    transition: transform 0.3s linear;
    color: white;

    &:hover {
      transform: translateY(0%);
    }
  }
</style>
