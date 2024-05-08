<template>
  <div class="client-img">
    <div class="client">
      <div class="port">{{ $t('newbie.form.label36') }}</div>
      <ImageUpload
        v-model:modelValue="queryParams.appPlayImg"
        :fileSize="0.5"
        :fileType="['png']"
        @update:modelValue="(e) => updateImage('appPlayImg', e)"
      />
      <div>
        <p>{{ $t('newbie.hint2') }}</p>
        <p>{{ $t('newbie.hint3') }}</p>
      </div>
    </div>
    <div class="client">
      <div class="port">{{ $t('newbie.form.label37') }}</div>
      <ImageUpload
        v-model:modelValue="queryParams.pcPlayImg"
        :fileSize="0.5"
        :fileType="['png']"
        @update:modelValue="(e) => updateImage('pcPlayImg', e)"
      />
      <div>
        <p>{{ $t('newbie.hint2') }}</p>
        <p>{{ $t('newbie.hint3') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImgURI } from '@/utils'
const props = defineProps({
  queryParams: {
    type: Object,
    default: { appPlayImg: '', pcPlayImg: '', appTitleImg: '' }
  }
})
const updateImage = (img, e) => (props.queryParams[img] = getImgURI(e))
</script>

<style lang="scss" scoped>
.client-img {
  display: flex;
  .client {
    margin-right: 50px;
    text-align: center;
  }
}
</style>
