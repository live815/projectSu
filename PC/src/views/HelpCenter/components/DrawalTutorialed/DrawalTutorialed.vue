<template>
  <div class="slideTab">
    <p>{{ props.title }}</p>
    <SlideTab :tuId="props.tuId" />
  </div>
</template>

<script setup>
import SlideTab from './components/SlideTab.vue'
const props = defineProps(['tuId', 'title'])
</script>
<style lang="scss" scoped>
:deep() {
  .swiper-slide {
    width: auto;
  }
}
.slideTab {
  width: 100%;

  > p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 30px;
    color: #fff;
    line-height: normal;
  }

  .disabled {
    opacity: 0.5;
    cursor: no-drop;
  }
  .swiper-slideActive {
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #ffffff;
  }

  .swiperBox {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
    .leftBtn {
      position: absolute;
      left: 0;
      width: 30px;
      height: 40px;
      display: flex;
      align-items: center;
    }
    .margin {
      margin: 0 32px;
    }
    .swiper-item {
      width: 93%;
      // width:100%;
      position: absolute;
      overflow: hidden;
      display: flex;
      height: 40px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 16px;
      .swiper-wrapper {
        .tab-box {
          height: 40px;
          text-align: center;
          padding: 10px 12px;
          border-right: 1px solid #52556a;
          border-top: 1px solid #52556a;
          border-bottom: 1px solid #52556a;
          white-space: nowrap;
          cursor: pointer;
        }
        .tab-box-vi {
          width: 380px;
        }
        div:last-child {
          border-radius: 0px 6px 6px 0px;
        }
        div:first-child {
          border-left: 1px solid #52556a;
          border-radius: 6px 0px 0px 6px;
        }
      }
    }
    .rightBtn {
      position: absolute;
      right: 0;
      width: 30px;
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
