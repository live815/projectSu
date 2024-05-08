<template>
  <!-- <div class="loading"> -->
  <div class="ani"></div>
  <!-- </div> -->
</template>
<script>
export default {}
</script>
<style lang="stylus" scoped>
.ani {
    height 100px
    width 100px
    position relative
    width 94px
    height 136px
    -webkit-animation Q_AB 0.9s step-start infinite
    animation Q_AB 0.9s step-start infinite
    position absolute
    top 50%
    left 50%
    margin-left -50px
    margin-top -50px
  }
.loading {
  position fixed
  z-index $zindex004
  top 0
  bottom 0
  left 0
  right 0
  background rgba(0, 0, 0, 0.5)
  .ani {
    height 100px
    width 100px
    position relative
    width 94px
    height 136px
    -webkit-animation Q_AB 0.9s step-start infinite
    animation Q_AB 0.9s step-start infinite
    position absolute
    top 50%
    left 50%
    margin-left -50px
    margin-top -50px
  }
}
@keyframes Q_AB {
  0% {
    background: url(./img/sprite.png) 0 0
  }

  3.448% {
    background: url(./img/sprite.png) -94px 0
  }

  6.896% {
    background: url(./img/sprite.png) -188px 0
  }

  10.344% {
    background: url(./img/sprite.png) -282px 0
  }

  13.792% {
    background: url(./img/sprite.png) -376px 0
  }

  17.24% {
    background: url(./img/sprite.png) -470px 0
  }

  20.688% {
    background: url(./img/sprite.png) -564px 0
  }

  24.136% {
    background: url(./img/sprite.png) -658px 0
  }

  27.584% {
    background: url(./img/sprite.png) -752px 0
  }

  31.032% {
    background: url(./img/sprite.png) -846px 0
  }

  34.48% {
    background: url(./img/sprite.png) -940px 0
  }

  37.928% {
    background: url(./img/sprite.png) -1034px 0
  }

  41.376% {
    background: url(./img/sprite.png) -1128px 0
  }

  44.824% {
    background: url(./img/sprite.png) -1222px 0
  }

  48.272% {
    background: url(./img/sprite.png) -1316px 0
  }

  51.72% {
    background: url(./img/sprite.png) -1410px 0
  }

  55.168% {
    background: url(./img/sprite.png) -1504px 0
  }

  58.616% {
    background: url(./img/sprite.png) -1598px 0
  }

  62.064% {
    background: url(./img/sprite.png) -1692px 0
  }

  65.512% {
    background: url(./img/sprite.png) -1786px 0
  }

  68.96% {
    background: url(./img/sprite.png) -1880px 0
  }

  72.408% {
    background: url(./img/sprite.png) -1974px 0
  }

  75.856% {
    background: url(./img/sprite.png) -2068px 0
  }

  79.304% {
    background: url(./img/sprite.png) -2162px 0
  }

  82.752% {
    background: url(./img/sprite.png) -2256px 0
  }

  86.2% {
    background: url(./img/sprite.png) -2350px 0
  }

  89.648% {
    background: url(./img/sprite.png) -2444px 0
  }

  93.096% {
    background: url(./img/sprite.png) -2538px 0
  }

  96.544% {
    background: url(./img/sprite.png) -2632px 0
  }

  99.992% {
    background: url(./img/sprite.png) -2726px 0
  }
}
</style>
./Loading.vue
