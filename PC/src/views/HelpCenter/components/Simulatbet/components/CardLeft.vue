<template>
  <div class="left-content">
    <div class="card-left">
      <div class="item-box">
        <div class="logo-img">
          <img :src="cardData.imgOne" />
        </div>
        <div class="logo-text">{{ cardData.teamOne }}</div>
      </div>
      <div class="item-box">
        <div class="mid-title">{{$t('HelpCenter.Result')}}</div>
        <div class="mid-num">{{ cardData.gameResult }}</div>
      </div>
      <div class="item-box">
        <div class="logo-img"><img :src="cardData.imgTwo" /></div>
        <div class="logo-text">{{ cardData.teamTwo }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardLeft: {
    type: Object
  }
})
const cardData = computed(() => props.cardLeft)
</script>

<style lang="scss" scoped>
.left-content {
  width: 433px;
  padding: 28px 0px 26px 60px;

  .card-left {
    height: 68px;
    display: flex;
    justify-content: space-between;
    border-right: 1px solid #52556a;
    padding-right: 123px;
    .item-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 68px;
      .logo-img {
        margin-bottom: 10px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .logo-text {
        font-size: 14px;
        color: var(--100, #fff);
      }
      .mid-title {
        font-size: 12px;
        color: var(--60, rgba(255, 255, 255, 0.6));
        margin-bottom: 8px;
      }
      .mid-num {
        color: var(--100, #fff);
        font-size: 24px;
        font-weight: 700;
      }
    }
  }
}
</style>
