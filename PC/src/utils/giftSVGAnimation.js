import { ref, onMounted } from 'vue'
import SVGA from 'svgaplayerweb'

export default function useAnimation() {
    // SVGA播放器和解析器
    let player = null
    let parser = null
    const giftQueue = [] // 用于存储待播放的礼物
    let animationTimer = ref(null) // 用于存储动画播放的定时器ID

    onMounted(() => {
        player = new SVGA.Player('#svgaWrapper')
        parser = new SVGA.Parser('#svgaWrapper')
        player.loops = 1

        // 动画播放完成后的回调
        player.onFinished(() => {
            playNextAnimation()
        })
    })

    // 播放单个动画
    const playSvga = (url) => {
        parser.load(url, (videoItem) => {
            player.setVideoItem(videoItem)
            player.startAnimation()
        })
    }

    // 队列播放多个SVGA动画
    const queuePlaySvga = (giftArray) => {
        giftArray.forEach((url) => {
            onReceiveAnimationMessage(url)
        })
    }

    // 接收动画消息并添加到队列中
    const onReceiveAnimationMessage = (svgaUrl) => {
        giftQueue.push(svgaUrl) // 将礼物添加到队列

        // 如果没有正在播放的动画，启动播放队列的第一个动画
        if (!animationTimer.value) {
            animationTimer.value = setTimeout(() => {
                playNextAnimation()
                animationTimer.value = null // 清除定时器ID
            }, 100)
        }
    }

    // 播放下一个动画
    const playNextAnimation = () => {
        if (player && !player.isPlaying && giftQueue.length > 0) {
            const svgaUrl = giftQueue.shift()
            parser.load(svgaUrl, (videoItem) => {
                player.setVideoItem(videoItem)
                player.startAnimation()
            })
        }
    }
    return {
        playSvga,
        queuePlaySvga
    };
}