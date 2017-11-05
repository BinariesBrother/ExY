<template>
  <div id="app">
    <md-toolbar class="md-transparent exy-toolbar app-draggable">
      <md-button class="md-icon-button" @click="toggleDrawerCollapse">
        <md-icon class="icon-collapsible" :class="{ collapsed: drawerCollapsed }">keyboard_capslock</md-icon>
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
    <div class="main-content" :class="{ 'drawer-is-collapsed': drawerCollapsed }">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur eos facilis fugit harum itaque qui reprehenderit tempore voluptatem! Aliquam minima quae quis reprehenderit voluptatum. Eum explicabo nostrum possimus repellat.
    </div>
    <div class="navigation-drawer" :class="{ collapsed: drawerCollapsed }">
    </div>
  </div>
</template>

<script>
  const electron = require('electron')
  const {remote} = electron
  const windowManager = remote.require('electron-window-manager')

  export default {
    name: 'exy',
    data() {
      return {
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
      }

    }
  }
</script>

<style lang="scss">
  $toolbarHeight: 44px;
  $drawerWidth: 280px;
  $drawerWidthCollapsed: 50px;

  .icon-collapsible {
    transform: rotate(-90deg);
    transition: transform 0.3s linear;
    &.collapsed {
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

  .app-draggable {
    -webkit-user-select: none;
    -webkit-app-region: drag;

    button {
      -webkit-app-region: no-drag;
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
      width: $drawerWidthCollapsed;

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
      margin-left: $drawerWidthCollapsed;
    }
  }
</style>
