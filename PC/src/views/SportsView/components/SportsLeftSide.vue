<template>
  <div class="SportsLeftSide">
    <div class="SportsLeftSide-wrap">
      <div class="SportsLeftSide-top">
        <div class="top-up">
          <div class="user-name">
            <p class="name">
              {{ $t('SportsView.Account') }}
              <label class="level-icon">
                <img
                  :src="getLevelLogoPath(user.userInfo.vipLevel)"
                  :alt="`${user.userInfo.vipLevel} Level Logo`"
                  width="20"
                  height="20"
                />
              </label>
            </p>
            <p>{{ user.userInfo.userName }}</p>
          </div>
          <div>
            <p class="balance">
              <Balance v-if="isEyesOpen" />
              <span v-else>***</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 我的关注、快速投注、赛事菜单、冠军、热门赛事部分 -->
      <Navigation />
    </div>
  </div>
</template>

<script setup>
import Balance from '@/components/Balance'
import Navigation from './Navigation.vue'
const user = useUserStore()
const isEyesOpen = ref(true)
// vip等级logo
const getLevelLogoPath = (level) => {
  if (level) {
    return new URL(`/src/views/SportsView/img/level-v${level}.png`, import.meta.url).href
  } else {
    return new URL(`/src/views/SportsView/img/level-v0.png`, import.meta.url).href
  }
}
</script>

<style lang="scss" scoped>
.SportsLeftSide {
  .SportsLeftSide-wrap {
    width: 100%;
    .num {
      display: flex;
      width: 30px;
      height: 25px;
      align-items: center;
      font-size: 12px;
      background: var(--unnamed, #1d223c);
      margin-right: 5px;
      justify-content: center;
    }
    .SportsLeftSide-top {
      display: flex;
      flex-direction: row;
      background: #171a2f;
      height: 60px;
      border-radius: 2px;
      width: 240px;
      position: relative;
      .top-up {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
      }
      .user-name {
        margin-left: 10px;
        line-height: 20px;
        text-align: left;
        .name {
          display: flex;
          align-items: center;
          label {
            height: 20px;
            margin-left: 5px;
          }
        }
      }
      .balance {
        display: flex;
        align-items: center;
        padding: 3px 10px;
        text-align: center;
        line-height: 30px;
        border-radius: 30px;
        height: 30px;
        background: #0d0f1c;
        margin-right: 10px;
        img {
          margin-left: 5px;
        }
        .refresh {
          margin-right: 10px;
          cursor: pointer;
        }
        .eyeopen {
          cursor: pointer;
        }
        /* 添加旋转的动画效果 */
        .rotating {
          animation: rotateAnimation 1s infinite linear;
        }
        @keyframes rotateAnimation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}
</style>