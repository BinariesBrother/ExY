<template>
  <div id="app">
    <md-toolbar class="md-transparent exy-toolbar app-draggable">
      <md-button class="md-icon-button">
        <md-icon class="icon-collapsible">keyboard_capslock</md-icon>
      </md-button>
      <span style="flex: 1;"></span>
      <md-button class="md-icon-button" @click="minimize">
        <md-icon>remove</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="toggleMaximize">
        <md-icon>crop_square</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="close">
        <md-icon>close</md-icon>
      </md-button>
    </md-toolbar>
    <div class="main-content">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur eos facilis fugit harum itaque qui reprehenderit tempore voluptatem! Aliquam minima quae quis reprehenderit voluptatum. Eum explicabo nostrum possimus repellat.
    </div>
  </div>
</template>

<script>
  const electron = require('electron')
  const {remote} = electron
  const windowManager = remote.require('electron-window-manager')
//  import LandingPage from '@/components/LandingPage'

  export default {
    name: 'exy',
//    components: {
//      LandingPage
//    }
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

    }
  }
</script>

<style lang="scss">
  .icon-collapsible {
    transform: rotate(-90deg);
    transition: transform 0.3s linear;
    .collapsed {
      transform: rotate(90deg);
    }
  }

  // Resize md-icon and md-icon-button.
  .md-button.md-icon-button {
    min-width: 30px;
    width: 30px;
    min-height: 30px;
    height: 30px;
  }

  .md-icon {
    font-size: 16px;
    min-height: 16px;
    height: 16px;
    width: 16px;
    min-width: 16px;
  }

  .exy-toolbar {
    position: relative;
    font-size: 16px;
    min-height: 44px;

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

  .app-draggable {
    -webkit-user-select: none;
    -webkit-app-region: drag;

    button {
      -webkit-app-region: no-drag;
    }
  }

  // TODO Remove the below style.
  .main-content {
    padding: 32px;
    box-sizing: border-box;
  }
</style>
