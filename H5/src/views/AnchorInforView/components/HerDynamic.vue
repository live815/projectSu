<template>
  <template v-if="list.length">
    <div class="tab-content" v-for="item in list" :key="item.id">
      <div class="lap-date">
        <div class="month-date">{{ dayjs(item.createTime).format('MM-DD') }}</div>
        <div class="date-time">{{ dayjs(item.createTime).format('HH:mm:ss') }}</div>
      </div>
      <div class="lap-img">
        <div class="copywriting">{{ item.content }}</div>
        <div class="lap-content">
          <div
            :class="{
              'img-box': getPhotoWall(item.imageUrl).length > 1,
              'img-box-one': getPhotoWall(item.imageUrl).length == 1
            }"
            v-for="(items, index) in getPhotoWall(item.imageUrl)"
            :key="items"
            @click="showImage(getPhotoWall(item.imageUrl), index)"
          >
            <img :src="items" />
          </div>
        </div>
        <div class="likes">
          <IconLike v-if="!item.status" @click="toggleLike(item)" />
          <IconLikeActive v-else @click="toggleLike(item)" />
          <text>{{ item.likeNum }}</text>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
  </template>
  <NoResult v-else :noTxt="$t('Lletter.Nodata')" />
</template>

<script setup>
import { showImagePreview } from 'vant'
import { getDynamicsInfo } from '@/api/live'
import { useRoute } from 'vue-router'
import { getImg } from '@/utils'
import dayjs from 'dayjs'
import { dynamicLikes, cancelLikes } from '@/api/live'
import { useUserStore } from '@/stores/user.js'
import NoResult from '@/components/NoResult/NoResult.vue'

const user = useUserStore()
const route = useRoute()
const list = ref([])
getDynamicsInfo(route.params.id).then((res) => {
  list.value = res.data || []
})
const getPhotoWall = (data) => {
  const dataArray = data.split(',')
  if (dataArray[0] === '') {
    return []
  }
  const processedArray = dataArray.map((item) => {
    return getImg(item)
  })
  return processedArray
}

// 点赞时间
const toggleLike = (item) => {
  // 如果当前消息的点赞状态为false，则切换为点赞状态
  if (!item.status) {
    // 点赞
    dynamicLikes({
      dynamicsId: item.id,
      memberId: user.userInfo.id
    }).then(() => {
      item.likeNum += 1
      item.status = true
    })
  } else {
    // 取消点赞
    cancelLikes({
      dynamicsId: item.id,
      memberId: user.userInfo.id
    }).then(() => {
      item.likeNum -= 1
      item.status = false
    })
  }
}
// 图片预览点击
const showImage = (items, index) => {
  showImagePreview({
    images: items,
    startPosition: index,
    showIndicators: true,
    showIndex: false
  })
}
</script>

<style lang="scss" scoped>
.tab-content {
  display: flex;
  margin: 16px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  .lap-date {
    margin-right: 16px;
    .month-date {
      color: #333;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      white-space: nowrap;
    }
    .date-time {
      color: #999;
      font-size: 12px;
      line-height: 12px;
    }
  }
  .lap-img {
    color: #404040;
    font-size: 15px;
    line-height: 24px;
    .copywriting {
      width: 290px;
    }
    .lap-content {
      display: flex;
      flex-wrap: wrap;
      .img-box {
        padding: 7px 7px 0 0;
        img {
          width: 72px;
          height: 72px;
          border-radius: 8px;
        }
      }
      .img-box-one {
        width: 150px;
        height: 150px;
        padding-top: 8px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
    }
    .likes {
      margin-top: 16px;
      display: flex;
      align-items: center;
      float: right;
      text {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
.box {
  margin-top: 100px;
}
</style>
