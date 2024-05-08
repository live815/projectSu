<template>
  <div class="container">
    <span class="left">{{ left }}</span>
    <router-link :to="to">
      <span class="right"
        >{{ right }}
        <IcoArrowRight />
      </span>
    </router-link>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
defineProps({
  left: { type: String },
  right: { type: String, default: i18n.global.t('Lletter.more') },
  to: { type: String }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  align-items: center;
  .left {
    color: var(--color-text-dark);

    font-size: 15px;
    font-style: normal;
    line-height: 16px; /* 100% */
  }
  .right {
    color: var(--color-text-light);
    text-align: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px; /* 100% */
    img {
      vertical-align: top;
    }
  }
}
</style>
