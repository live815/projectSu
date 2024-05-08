import { onMounted } from 'vue'
import SVGA from 'svgaplayerweb'

export function useAnimation() {
    // SVGA播放器和解析器
    let player = null
    let parser = null
    let isPlaying = false
    const giftQueue = [] // 用于存储待播放的礼物

    onMounted(() => {
        player = new SVGA.Player('#svgaWrapper')
        parser = new SVGA.Parser('#svgaWrapper')
        player.loops = 1

        // 动画播放完成后的回调

        player.onFinished(() => {
            isPlaying = false
            playNextAnimation()
        })
        player.onFrame(() => {
            isPlaying = true
        })
    })

    // 播放单个动画
    const playSvga = (url) => {
        parser.load(url, (videoItem) => {
            player.setVideoItem(videoItem)
            player.startAnimation()
        })
    }

    // 预加载
    const preloading = (urls) => {
        urls.forEach(url => {
            parser.load(url)
        })
    }

    // 接收动画消息并添加到队列中
    const onReceiveAnimationMessage = (svgaUrl) => {
        if (svgaUrl.endsWith('.svga')) {
            giftQueue.push(svgaUrl) // 将礼物添加到队列
            // 如果没有正在播放的动画，启动播放队列的第一个动画
            if (!isPlaying) {
                playNextAnimation()
                isPlaying = true
            }
        }
    }

    // 播放下一个动画
    const playNextAnimation = () => {
        if (player && !isPlaying && giftQueue.length > 0) {
            const svgaUrl = giftQueue.shift()
            if (svgaUrl.endsWith('.svga')) {
                parser.load(svgaUrl, (videoItem) => {
                    player.setVideoItem(videoItem)
                    player.startAnimation()
                })
            }
        }
    }
    return {
        playSvga,
        preloading,
        onReceiveAnimationMessage
    };
}