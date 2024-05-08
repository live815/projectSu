<template>
  <div class="main-container UserHeader">
    <div class="img-container">
      <template v-if="user.userInfo.role !== 1">
        <img
          v-if="user.userInfo.avatar && avatarList[user.userInfo.avatar]"
          :src="avatarList[user.userInfo.avatar].img"
          width="80"
          height="80"
        />
        <img v-else :src="avatarList[0].img" width="80" height="80" />
      </template>
      <template v-else>
        <img :src="getImgUrl(user.userInfo.avatar)" width="80" height="80" />
      </template>
      <div class="mark">{{$t('SuperAdminCenter.SuperManagement')}}</div>
    </div>
    <div class="admin-name">{{ user.userInfo.nickName }}</div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { getImgUrl } from '@/utils/cache'
import { avatarList } from '@/utils/config'
const user = useUserStore()
</script>

<style lang="scss" scoped>
.UserHeader {
  min-width: 1320px;
  max-width: 1320px;
  display: flex;
  align-items: center;
  height: 128px;
  padding: 24px 0 24px 40px;
  gap: 24px;
  border-radius: 8px;
  background: #272b45;
  .img-container {
    position: relative;
    overflow: hidden;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 80px;
    .mark {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 0;
      width: 80px;
      height: 26px;
      background: linear-gradient(90deg, rgba(255, 133, 1, 0.9) 0%, rgba(255, 89, 1, 0.9) 100%);
      color: #fff;
      
      font-size: 14px;
      font-weight: 400;
    }
  }
  .admin-name {
    color: var(--100, #fff);
    
    font-size: 20px;
    font-weight: 400;
  }
}
</style>
