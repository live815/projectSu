<template>
  <CustomizeDialog
    :dialogShow="activeShow"
    :width="600"
    :title="$t('Components.ChangeAvatar')"
    v-if="activeShow"
    :alignCenter="true"
    @closeBtn="closeBtn"
    v-loading="loading"
  >
    <div class="heads-imgBox">
      <div
        class="heads-imgBox-item"
        v-for="(item, index) in avatarList"
        :class="{ active: activeIcon === index }"
        :key="item.id"
        @click="onClickActive(item, index)"
      >
        <img :src="item.img" />
        <img class="activeIcon-imgs" v-if="activeIcon == index" :src="activeIcons" />
      </div>
    </div>
    <div class="footer-btn" @click="onClickConfirm">{{ $t('Components.Save') }}</div>
  </CustomizeDialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import activeIcons from './img/activeIcons.png'
import { getUpdateAvatar } from '@/api/bindInfo'
import eventBus from '@/utils/eventBus'
const user = useUserStore()

const activeShow = ref(false)
const loading = ref(false)

const activeIcon = ref(0)

const activeImg = ref('')

// 头像信息
const avatarList = reactive([
  {
    id: 1,
    img: new URL('@/assets/img/headImg/avatar0.png', import.meta.url).href
  },
  {
    id: 2,
    img: new URL('@/assets/img/headImg/avatar1.png', import.meta.url).href
  },
  {
    id: 3,
    img: new URL('@/assets/img/headImg/avatar2.png', import.meta.url).href
  },
  {
    id: 4,
    img: new URL('@/assets/img/headImg/avatar3.png', import.meta.url).href
  },
  {
    id: 5,
    img: new URL('@/assets/img/headImg/avatar4.png', import.meta.url).href
  },
  {
    id: 6,
    img: new URL('@/assets/img/headImg/avatar5.png', import.meta.url).href
  },
  {
    id: 7,
    img: new URL('@/assets/img/headImg/avatar6.png', import.meta.url).href
  },
  {
    id: 8,
    img: new URL('@/assets/img/headImg/avatar7.png', import.meta.url).href
  },
  {
    id: 9,
    img: new URL('@/assets/img/headImg/avatar8.png', import.meta.url).href
  },
  {
    id: 10,
    img: new URL('@/assets/img/headImg/avatar9.png', import.meta.url).href
  }
])
// 选择头像
const onClickActive = (item, index) => {
  activeIcon.value = index
  activeImg.value = item.id
}

// 保存按钮
const onClickConfirm = () => {
  loading.value = true
  const params = {
    avatar: activeIcon.value
  }
  getUpdateAvatar(params)
    .then(() => {
      loading.value = false
      user.getUserInfoAction()
    })
    .catch(() => {
      loading.value = false
    })
  activeShow.value = false
}

eventBus.on('isActiveShow', () => {
  activeShow.value = true
  user.getUserInfoAction()
  if (user.userInfo?.avatar) {
    // 判断是否有图片，有让当前高亮定位到图片位置
    activeIcon.value = user.userInfo.avatar
  }
})

onUnmounted(()=>{
  eventBus.off('isActiveShow')
})

// 关闭弹窗
const closeBtn = () => {
  activeShow.value = false
}
</script>
<style lang='scss' scoped>
.heads-imgBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8px;
  .heads-imgBox-item {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 13px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
    .activeIcon-imgs {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
.footer-btn {
  width: 200px;
  height: 40px;
  border-radius: 4px;
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  line-height: 40px;
  margin: 30px auto 20px;
}
</style>