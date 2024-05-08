<template>
  <div class="item">
    <div class="left">
      <div class="icon">
        <div class="icon-img" :style="`background-image: url(${getImg(item.logo)})`"></div>
      </div>
      <div class="text">
        <h3 v-if="item.type == 1">{{ $t('BusinessAgentView.WeChat') }}</h3>
        <h3 v-if="item.type == 2">QQ</h3>
        <h3 v-if="item.type == 3">whatsapp</h3>
        <h3 v-if="item.type == 4">telegram</h3>
        <h3 v-if="item.type == 5">{{ $t('BusinessAgentView.Email') }}</h3>
        <h3 v-if="item.type == 6">{{ $t('BusinessAgentView.Service66') }}</h3>
        <h3 v-if="item.type == 7">skype</h3>
        <!-- <h3 v-if="item.title">{{ item.title }}</h3> -->
        <p>{{ item.contact }}</p>
      </div>
    </div>
    <div class="right">
      <SmallBtn
        v-if="item.downloadUrl"
        style="margin-bottom: 6px"
        @click="$emit('download', item.downloadUrl)"
        >{{ $t('BusinessAgentView.DownLoad') }}</SmallBtn
      >
      <SmallBtn v-clipboard="item.contact">{{ $t('BusinessAgentView.Copy') }}</SmallBtn>
    </div>
  </div>
</template>

<script setup>
import vClipboard from '@/directives/clipboard'
import { getImg } from '@/utils/index'

defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  .left {
    display: flex;
    align-items: center;
    .icon {
      height: 25px;
      width: 25px;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
      // background:var(--color-primary);
      img {
        width: 100%;
        height: 100%;
      }
      .icon-img {
        width: 25px;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 50%;
      }
    }
    .text {
      h3 {
        color: var(--color-text-light);
        margin-bottom: 5px;
      }
      color: var(--color-text-dark);
    }
  }
  .right {
    display: flex;
    flex-direction: column;
  }
}
</style>
