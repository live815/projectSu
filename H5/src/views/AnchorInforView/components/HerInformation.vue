<template>
  <div class="info-content">
    <div>
      <van-cell-group>
        <van-cell
          :title="$t('AnchorinforView.Height')"
          size="large"
          :value="personalInfo?.height ? personalInfo?.height : '-'"
        />
        <van-cell
          :title="$t('AnchorinforView.Weight')"
          size="large"
          :value="personalInfo?.weight ? personalInfo?.weight : '-'"
        />
        <van-cell
          :title="$t('AnchorinforView.Birthday')"
          size="large"
          :value="personalInfo?.birthday ? personalInfo?.birthday : '-'"
        />
        <van-cell
          :title="$t('AnchorinforView.Hobby')"
          size="large"
          :value="personalInfo?.hobby ? personalInfo?.hobby : '-'"
        />
        <van-cell
          :title="$t('AnchorinforView.EmotionalState')"
          size="large"
          :value="
            emotionMap(i18n)[personalInfo?.emotion] ? emotionMap(i18n)[personalInfo?.emotion] : '-'
          "
        />
        <van-cell :title="$t('AnchorinforView.PhotoWall')" size="large">
          <template #label>
            <div class="lap-content">
              <img
                class="photo-Wall"
                v-for="(item, index) in photoWall"
                :key="index"
                :src="getImg(item)"
                @click="showImagesPreview(index)"
              />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { getImg } from '@/utils'
import { emotionMap } from '@/utils/config.js'
import { showImagePreview } from 'vant'
import i18n from '@/i18n'

const props = defineProps(['personalInfo'])

const photoWall = computed(() => {
  if (props.personalInfo?.photoWall === '') {
    return []
  } else {
    return props.personalInfo?.photoWall?.split(',')
  }
})

const showImagesPreview = (index) => {
  const imageUrls = photoWall.value.map((img) => {
    return getImg(img)
  })

  // 调用vant的showImagePreview方法，传入处理后的图片数组
  showImagePreview({
    images: imageUrls,
    startPosition: index
  })
}
</script>

<style lang="scss" scoped>
.info-content {
  margin-top: 2px;
}
.lap-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  .photo-Wall {
    width: 109px;
    height: 109px;
    border-radius: 8px;
    object-fit: cover;
  }
}
:deep() {
  .van-cell__title {
    color: var(--color-text);
    font-size: 14px;
  }
  .van-cell__value {
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
