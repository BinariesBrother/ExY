<template>
  <div class="loader-wrapper">
    <div class="loader-element">
      <div class="loader">
        <div class="loader top">
          <div class="loader right">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loader'
  }
</script>

<style lang="scss" scoped>
  $loaderWidth: 200px;
  $loaderHeight: $loaderWidth;

  .loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes loading90 {
    0% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(450deg);
    }
  }
  @keyframes loading180 {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(540deg);
    }
  }

  .loader-element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: $loaderWidth;
    height: $loaderHeight;
  }

  .loader {
    $border: 8px;
    box-sizing: border-box;
    border: $border solid palevioletred;
    border-top: $border solid transparent;
    border-bottom: $border solid transparent;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    padding: 8px;
    animation: loading 2s infinite linear;

    &.top {
      border-width: $border / 2;
      animation: loading 4s infinite linear;
    }
    &.right {
      border-width: $border / 4;
      animation: loading 4s infinite linear;
    }
  }
</style>