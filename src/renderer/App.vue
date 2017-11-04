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
  const {screen, remote} = electron
  const windowManager = remote.require('electron-window-manager')
  const Config = remote.require('electron-config')

  const config = new Config()
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
        const currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
        const main = windowManager.get('main')
        config.set('mainWindowState', {
          maximize: main.object.isMaximized(),
          bounds: main.object.getBounds(),
          display: currentDisplay.id,
        })
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
