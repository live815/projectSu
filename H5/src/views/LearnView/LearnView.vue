<template>
  <div>
    <div id="svgaWrapper"></div>
    <button @click="playSvg(this.url1)">{{ $t('Lletter.playsvga') }}</button>
    <button @click="playSvgMore">{{ $t('Lletter.teamplaysvga') }}</button>
    <p>isPlaying:{{ isPlaying }}</p>
    <p>{{ animationQueue }}</p>
  </div>
</template>

<script>
import SVGA from 'svgaplayerweb'
export default {
  data() {
    return {
      url1: 'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/ningmengshui.svga',
      url2: ' https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/bingkele.svga',
      url3: 'https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/ningmengshui.svga',
      url4: ' https://svga-1318421703.cos-website.ap-guangzhou.myqcloud.com/bingkele.svga',
      animationQueue: [],
      isPlaying: false
    }
  },
  mounted() {
    this.player = new SVGA.Player('#svgaWrapper')
    this.parser = new SVGA.Parser('#svgaWrapper')
    this.player.loops = 1
    this.player.onFinished(() => {
      this.isPlaying = false
      this.playNextAnimation()
    })
    this.player.onFrame(() => {
      this.isPlaying = true
    })
  },
  methods: {
    playSvg(svga) {
      this.parser.load(svga, (videoItem) => {
        this.player.setVideoItem(videoItem)
        this.player.startAnimation()
      })
    },
    playSvgMore() {
      // this.onReceiveAnimationMessage(this.url1)

      // setTimeout(() => {
      //   this.onReceiveAnimationMessage(this.url2)
      // }, 20)
      // setTimeout(() => {
      //   this.onReceiveAnimationMessage(this.url3)
      // }, 60)
      // setTimeout(() => {
      //   this.onReceiveAnimationMessage(this.url4)
      // }, 80)
      ;[this.url1, this.url2, this.url3, this.url4].forEach((url) => {
        this.onReceiveAnimationMessage(url)
      })
    },
    onReceiveAnimationMessage(svgaUrl) {
      this.animationQueue.push(svgaUrl)
      if (!this.isPlaying) {
        this.playNextAnimation()
        this.isPlaying = true
      }
    },
    playNextAnimation() {
      // 如果当前没有动画正在播放，并且队列中有待播放的动画
      if (!this.isPlaying && this.animationQueue.length > 0) {
        var svgaUrl = this.animationQueue.shift() // 取出队列中的下一个动画
        this.parser.load(svgaUrl, (videoItem) => {
          this.player.setVideoItem(videoItem)
          this.player.startAnimation()
        })
      }
    }
  },
  watch: {
    animationQueue() {}
  }
}
</script>

<style lang="scss" scoped>
#svgaWrapper {
  height: 300px;
  width: 300px;
  border: 1px solid red;
  overflow: hidden;
}
</style>
