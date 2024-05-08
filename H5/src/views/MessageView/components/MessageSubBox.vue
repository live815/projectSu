<template>
  <div class="message-box">
    <div
      :class="item.status == 0 || item.annType ? 'massage-container' : 'massage-container readmsg'"
      @click="toMessageDetail(item)"
    >
      <div v-if="item.logo == 1" class="important-icon">{{ $t('Mletter.important') }}</div>
      <div class="title">
        <div class="logo">
          <img src="../img/C_logo.png" />
        </div>
        <div>{{ limitedTitle }}</div>
      </div>
      <div class="time-row">
        {{ item.sendTime || item.shelvesTime }}
      </div>
      <div class="main-content" v-html="limitedHtmlContent"></div>
    </div>
    <label class="dele-box" name="dele" for="van-Checkbox" @click.stop="changeCheck(item)">
      <div class="dele-inter">
        <van-checkbox v-model="item.check" id="van-Checkbox" @click.stop></van-checkbox>
      </div>
    </label>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['item'])

const limitedTitle = computed(() => {
  const plainText = props.item.title
  if (props.item && props.item.title.length > 20) {
    return plainText.slice(0, 20) + '...'
  } else {
    return plainText
  }
})
const limitedHtmlContent = computed(() => {
  // 使用正则表达式去掉 HTML 标签
  if (props.item && props.item.content) {
    const plainText = props.item.content
    // 截取文本并添加省略号
    if (plainText.length > 100 || getLineCount(plainText) > 3) {
      return plainText.slice(0, 80) + '...'
    }
    return props.item.content.replace(/<[^>]+>/g, '') // 如果未超过字符数限制，返回原始 HTML 内容
  }
})

function getLineCount(text) {
  return text.split('\n').length
}

const toMessageDetail = (item) => {
  router.push({
    name: 'messageDetail',
    query: {
      id: item.id,
      isAnn: letType.value
    }
  })
}
const letType = computed(() => {
  if (props.item.annType) {
    return 1
  } else {
    return 0
  }
})

const changeCheck = (item) => {
  item.check = !item.check
}
</script>
<style lang="scss" scoped>
.message-box {
  display: flex;
  gap: 10px;
}
.message-box-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.massage-container {
  position: relative;
  width: calc(100vw - 14px);
  min-height: 159px;
  padding: 8px 10px 10px 10px;
  border-radius: 10px;
  border: 0.5px solid #eee;
  background: #fff;
  white-space: pre-wrap;
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 24px;
    font-weight: 400;
    .logo {
      position: relative;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .time-row {
    height: 28px;
    padding: 4px 0 0 32px;
    border-bottom: 0.5px solid #eee;
    color: #999;
    font-size: 12px;
    font-weight: 400;
  }
  .main-content {
    padding-top: 10px;
    min-height: 80px;
    width: 100%;
    overflow: hidden;
    white-space: pre-wrap;
    color: #666;

    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
}

.massage-container::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 18px;
  top: 11px;
  left: 0;
  border-radius: 0px 60px 60px 0px;
  background: #ff5000;
}

.important-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  min-width: 36px;
  height: 20px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  color: #fff;
  font-size: 12px;
}
.important-icon::after {
  content: '';
  position: absolute;
  left: -5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid #ff9000;
  transform: rotate(-90deg);
}
.dele-box {
  display: inline-block;
  width: 40px;
  height: 159px;
  border-radius: 10px;
  background: #eee;
  justify-content: center;
  align-items: center;
  .dele-inter {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.content-row {
  transition: transform 0.5s;
}
.readmsg {
  opacity: 0.7;
}

:deep() {
  .van-icon {
    padding: 0px !important;
  }
}
</style>
