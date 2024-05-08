<template>
  <div class="animation-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="`${videoType}${$t('live.videoSource')}`"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <!-- 动画Flv: -->
      <div class="paly-url" v-if="cloneRow.animationFlv">
        <span class="url-title">{{ $t('schedule.flvMovie') }}</span>
        <span @click="goVideo(cloneRow.animationFlv)">{{
          cloneRow.animationFlv
        }}</span>
        <el-button
          type="success"
          size="small"
          style="margin-left: 8px"
          v-copyText="cloneRow.animationFlv"
          v-copyText:callback="copyTextSuccess"
          >{{  $t('schedule.copyLink')  }}</el-button
        >
      </div>
      <!-- 动画M3u8: -->
      <div class="paly-url" v-if="cloneRow.animationM3u8">
        <span class="url-title">{{ $t('schedule.movieM3u8') }}</span>
        <span @click="goVideo(cloneRow.animationM3u8)">{{
          cloneRow.animationM3u8
        }}</span>
        <el-button
          type="success"
          size="small"
          style="margin-left: 8px"
          v-copyText="cloneRow.animationM3u8"
          v-copyText:callback="copyTextSuccess"
          >{{ $t('schedule.copyLink') }}</el-button
        >
      </div>
      <!-- 动画链接 -->
      <div class="paly-url" v-if="cloneRow.animationUrl">
        <span class="url-title">{{ $t('schedule.movieLink') }}</span>
        <span @click="goVideo(cloneRow.animationUrl)">{{
          cloneRow.animationUrl
        }}</span>
        <el-button
          type="success"
          size="small"
          style="margin-left: 8px"
          v-copyText="cloneRow.animationUrl"
          v-copyText:callback="copyTextSuccess"
          >{{  $t('schedule.copyLink')  }}</el-button
        >
      </div>
      <!-- 直播Flv -->
      <div class="paly-url" v-if="cloneRow.liveFlv">
        <span class="url-title">{{ $t('schedule.livingFlv') }}</span>
        <span @click="goVideo(cloneRow.liveFlv)">{{ cloneRow.liveFlv }}</span>
        <el-button
          type="success"
          size="small"
          style="margin-left: 8px"
          v-copyText="cloneRow.liveFlv"
          v-copyText:callback="copyTextSuccess"
          >{{  $t('schedule.copyLink')  }}</el-button
        >
      </div>
      <!-- 直播M3u8 -->
      <div class="paly-url" v-if="cloneRow.liveM3u8">
        <span class="url-title">{{ $t('schedule.livingM3u8') }}</span>
        <span @click="goVideo(cloneRow.liveM3u8)">{{ cloneRow.liveM3u8 }}</span>
        <el-button
          type="success"
          size="small"
          style="margin-left: 8px"
          v-copyText="cloneRow.liveM3u8"
          v-copyText:callback="copyTextSuccess"
          >{{  $t('schedule.copyLink')  }}</el-button
        >
      </div>
      <!-- 直播Url -->
      <div class="paly-url" v-if="cloneRow.liveUrl">
        <span class="url-title">{{ $t('schedule.livingLink') }}</span>
        <span @click="goVideo(cloneRow.liveUrl)">{{ cloneRow.liveUrl }}</span>
        <el-button
          type="success"
          size="small"
          style="margin-left: 8px"
          v-copyText="cloneRow.liveUrl"
          v-copyText:callback="copyTextSuccess"
          >{{  $t('schedule.copyLink')  }}</el-button
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel">{{ $t('member.close') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getCurrentInstance } from "vue";

const props = defineProps(["openAnimation", "cloneRow",'videoType']);
const emit = defineEmits(["update:openAnimation"]);

const { proxy } = getCurrentInstance();

const dialogVisible = computed({
  get() {
    return props.openAnimation;
  },
  set(val) {
    emit("update:openAnimation", val);
  },
});
const form = computed({
  get() {
    return props.cloneRow;
  },
});

function goVideo(url) {
  const newPageUrl = `/player?src=${url}`; // 替换为Vue组件的路由路径
  if (url.includes("m3u8") || url.includes("flv")) {
    window.open(newPageUrl, "_blank");
  } else {
    window.open(url);
  }
}
function copyTextSuccess() {
  // proxy.$modal.msgSuccess("复制成功");
}
function cancel() {
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.animation-dialog {
  .paly-url {
    cursor: pointer;
    margin-bottom: 8px;
    .url-title {
      font-weight: 600;
      font-size: 15px;
      margin: 0 10px 0px 0;
    }
    .url-content {
      margin: 0;
    }
  }
  :deep() {
    .el-dialog__body {
      padding-top: 0;
    }
    .el-dialog__title {
      font-weight: 600;
    }
  }
}
</style>
