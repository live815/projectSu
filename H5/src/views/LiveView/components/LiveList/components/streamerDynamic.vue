<template>
  <div class="dongtaiList" v-for="(item, index) in list" :key="index">
    <router-link to="/anchor-infor/14">
      <img class="avatar" :src="getImg(item.avatar) || defaultIcon" />
    </router-link>
    <div class="right-box">
      <div class="top-box">
        <h1>{{ item.nickName }}</h1>
        <div class="great">
          <IconLikeActive v-if="getLikeStatus(item.id)" @click="like(item)" />
          <IconLike v-else @click="like(item)" />
          {{ item.likeNum }}
        </div>
      </div>
      <div class="time">{{ dayjs(item.createTime).format('MM-DD HH:mm:ss') }}</div>
      <p>{{ item.content }}</p>
      <div class="image-list">
        <img
          v-for="(items, index) in getPhotoWall(item.imageUrl)"
          @click="showImage(getPhotoWall(item.imageUrl), index)"
          :key="index"
          :src="items"
          :class="{ photo: getPhotoWall(item.imageUrl).length === 1 }"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { showImagePreview, showToast } from 'vant'
import 'vant/es/image-preview/style'
import defaultIcon from '@/assets/img/default-team-logo.png'
import { getDynamicsList, dynamicLikes, getLikesList, cancelLikes } from '@/api/live'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/user.js'
import { getImg } from '@/utils'
import { getToken } from '@/utils/cache'
import i18n from '@/i18n'

const list = ref()
const likedItems = ref()
const user = useUserStore()
const isLogin = getToken()

const showImage = (items, index) => {
  showImagePreview({
    images: items,
    startPosition: index,
    showIndicators: true,
    showIndex: false
  })
}
// 获取已点赞动态列表
const getLikesLists = () => {
  getLikesList({
    memberId: user.userInfo.id
  }).then((res) => {
    likedItems.value = res.data
  })
}
getLikesLists()
// 获取全部主播动态
getDynamicsList().then((res) => {
  list.value = res.data.records
})

const getLikeStatus = (id) => {
  return likedItems.value?.some((item) => item.dynamicsId === id)
}

const like = (item) => {
  if (!isLogin) {
    showToast(i18n.global.t('Activity.Newbie.label21'))
    return
  }
  if (getLikeStatus(item.id)) {
    // 取消点赞
    cancelLikes({
      dynamicsId: item.id,
      memberId: user.userInfo.id
    }).then(() => {
      item.likeNum -= 1
      getLikesLists()
    })
  } else {
    // 点赞
    dynamicLikes({
      dynamicsId: item.id,
      memberId: user.userInfo.id
    }).then(() => {
      item.likeNum += 1
      getLikesLists()
    })
  }
}
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
</script>
<style lang="scss" scoped>
.dongtaiList {
  margin: 16px 12px;
  margin-bottom: 32px;
  display: flex;

  .avatar {
    width: 45px;
    height: 45px;
    clip-path: circle(50% at 50% 50%);
  }
  .right-box {
    margin-left: 16px;
    h1 {
      color: #333;

      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }
    .time {
      margin-top: 4px;
      color: #999;

      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
    }
    p {
      margin-top: 8px;
      color: #404040;
      text-align: justify;

      font-size: 15px;
      line-height: 24px;
      width: 290px;
    }
    .image-list {
      margin-top: 8px;
      img {
        width: 72px;
        height: 72px;
        border-radius: 8px;
        margin-right: 7px;
      }
      .photo {
        width: 150px;
        height: 150px;
      }
    }
    .top-box {
      display: flex;
      justify-content: space-between;
    }
    .great {
      color: #999;
      font-size: 12px;
      svg {
        margin-bottom: -2px;
      }
    }
  }
}
</style>
