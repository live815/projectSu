<template>
  <div class="betResult">
    <div class="rang-qiu">
      <div class="rang-left">
        <div class="left-text">
          <text class="touzhu" v-if="props.activeIndex == 1 || props.activeIndex == 5"
            >{{$t('HelpCenter.Bet')}}&nbsp;</text
          >
          <text class="team-name">{{ resultData.team }}&nbsp;</text
          ><text>{{ resultData.num1 }}&nbsp;</text>@<text>{{ resultData.num2 }}</text>
        </div>
        <div class="team-note">{{ resultData.resultText }}</div>
      </div>
      <div class="rang-right">
        <img :src="resultData.resultImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resultObj: {
    type: Object
  },
  activeIndex: {
    type: Number
  }
})
const resultData = computed(() => props.resultObj)
</script>

<style lang="scss" scoped>
.betResult {
  
  .rang-qiu {
    border-radius: 6px;
    background: var(--unnamed, #1d223c);
    height: 78px;
    display: flex;
    justify-content: space-between;
    .rang-left {
      padding: 16px 0 16px 16px;
      .left-text {
        color: var(--unnamed, #f35f1b);
        font-size: 14px;
        margin-bottom: 10px;
        .touzhu {
          color: #ffffff;
        }
        .team-name {
          color: #ffffff !important;
        }
      }
      .team-note {
        font-size: 14px !important;
        color: var(--60, rgba(255, 255, 255, 0.6));
      }
    }
    .rang-right {
      padding: 9px 0 9px 0;
      margin-right: 36px;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
