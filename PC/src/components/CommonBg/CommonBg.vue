<template>
  <div class="star-container">
    <div class="moon"></div>
    <div class="change"></div>
    <div class="meteor" style="left: 409.333px; top: 40px; animation-delay: 0s"></div>
    <div class="meteor" style="left: 654.933px; top: 40px; animation-delay: 1.65811s"></div>
    <div class="meteor" style="left: 900.533px; top: 40px; animation-delay: 0.423725s"></div>
    <!-- <div class="meteor" style="left: 1146.13px; top: 40px; animation-delay: 3.24035s"></div>
    <div class="meteor" style="left: 1391.73px; top: 40px; animation-delay: 0.693205s"></div> -->
    <div class="meteor" style="left: 1591.73px; top: 50px; animation-delay: 0.293205s"></div>
    <div class="meteor" style="left: 1791.73px; top: 80px; animation-delay: 1s"></div>
    <div class="meteor" style="left: 1991.73px; top: 80px; animation-delay: 0.5s"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.star-container {
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: no-repeat top / cover url("./img/PC-Bg.png");
}
.star-container .moon {
  width: 100px;
  height: 100px;
  background: url("./img/Moon-ada617fc.svg") no-repeat center center;
  position: fixed;
  animation: myMoon 3s linear forwards;
  top: 140px;
}
.star-container .change {
  width: 50px;
  height: 50px;
  border: none;
  position: absolute;
  left: 81.8%;
  top: 169px;
  animation: myChange 8s linear;
}
.star-container .meteor {
  width: 1px;
  display: block;
  position: absolute;
  background-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
  opacity: 0;
  animation: meteor 15s linear infinite;
}
.star-container .meteor:after {
  content: '';
  display: block;
  border: 1px solid #fff;
  border-width: 0px 90px 2px 90px;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
  transform: rotate(-45deg);
}
@keyframes myMoon {
  0% {
    right: 100px;
    top: 80px;
    opacity: 0;
  }

  to {
    right: 40px;
    top: 140px;
    opacity: 1;
  }
}

@keyframes meteor {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate(-800px, 100vh);
  }
}
@keyframes myChange {
  0% {
    left: 41.8%;
    top: 669px;
    opacity: 0;
  }

  1% {
    left: 42.8%;
    top: 629px;
    opacity: 0;
  }

  10% {
    left: 45.8%;
    top: 619px;
    opacity: 0.1;
  }

  20% {
    left: 49.8%;
    top: 569px;
    opacity: 0.2;
  }

  30% {
    left: 53.8%;
    top: 519px;
    opacity: 0.3;
  }

  40% {
    left: 57.8%;
    top: 469px;
    opacity: 0.4;
  }

  50% {
    left: 61.8%;
    top: 419px;
    opacity: 0.5;
  }

  60% {
    left: 65.8%;
    top: 369px;
    opacity: 0.6;
  }

  70% {
    left: 69.8%;
    top: 319px;
    opacity: 0.7;
  }

  80% {
    left: 73.8%;
    top: 269px;
    opacity: 0.8;
  }

  90% {
    left: 77.8%;
    top: 219px;
    opacity: 0.9;
  }

  to {
    left: 81.8%;
    top: 169px;
    opacity: 1;
  }
}
</style>
