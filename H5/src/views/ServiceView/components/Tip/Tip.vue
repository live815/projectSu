<template>
  <div>
    <p class="service-online">
      {{ $t('serviceview.onlineservice') }}
    </p>
    <p class="service-all-time">{{ $t('serviceview.content2') }}</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.service-online {
  color: #111;
  // text-align:center;
  font-size: 19px;
  font-weight: 600;
  margin-top: 40px;
}
.service-all-time {
  color: #555;
  font-size: 14px;

  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
