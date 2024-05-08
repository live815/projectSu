<template>
  <div class="main-outter">
    <div>
      <NavBar :title="$t('setview.set')" border />
    </div>
    <div class="menu-content">
      <div class="item">
        <div class="area-selection">
          <div class="text-box">{{ $t('setview.Handicapset') }}</div>
          <div class="selection-box">
            <div
              @click="fbStore.settings.oddsFormat = 1"
              class="item"
              :class="{ active: fbStore.settings.oddsFormat === 1 }"
            >
              {{ $t('common.Decimal') }}
            </div>
            <div
              @click="fbStore.settings.oddsFormat = 2"
              class="item"
              :class="{ active: fbStore.settings.oddsFormat === 2 }"
            >
              {{ $t('common.HongKong') }}
            </div>
          </div>
        </div>
        <h4>{{ $t('setview.Betset') }}</h4>
        <!-- <div class="bet-setting">
          <div
            class="sport"
            :class="{ activebtn: currentIndex === index }"
            v-for="(item, index) in list"
            :key="item.id"
            @click="setCurrentIndex(index)"
          >
            {{ item.name }}
          </div>
        </div> -->
        <van-radio-group v-model="fbStore.settings.oddsChange" class="bet-group mb-15">
          <van-radio :name="1">
            {{ $t('common.acceptBetter') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
          <van-radio :name="2">
            {{ $t('common.acceptAny') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template> </van-radio
          ><van-radio :name="0">
            {{ $t('common.dontAcceptAny') }}
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
        </van-radio-group>
        <van-cell v-if="IS_DEV" :title="$t('setview.tip11')" class="mode-setting">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #extra>
            <van-switch v-model="appStore.darkMode" />
          </template>
        </van-cell>
      </div>
    </div>
    <div class="item-box">
      <!-- <van-cell title="清理缓存" value="58.1MB" clickable @click="PopUp(clearCachePop)" /> -->
      <div class="update-box">
        <van-cell
          class="update-text"
          :title="$t('setview.currentversion')"
          :value="`v${version}`"
        />
        <!-- <div class="update-icon">有更新</div> -->
      </div>
    </div>
    <div class="item-box">
      <van-cell
        v-if="IS_DEV"
        :title="$t('setview.language')"
        is-link
        :value="language"
        @click="goLanguage"
      />
      <van-cell :title="$t('setview.aboutus')" is-link value="" @click="goAboutUs" />
      <van-cell :title="$t('setview.DeviceInformation')" is-link value="" @click="goDeviceInfo" />
    </div>
    <div class="quit-btn">
      <van-button type="primary" block v-if="user.isLogin" color="#ccc" @click="confirmLogOut">{{
        $t('setview.signout')
      }}</van-button>
    </div>
    <ClearCachePop ref="clearCachePop"></ClearCachePop>
    <UpdatePop ref="updatePop"></UpdatePop>
  </div>
</template>

<script setup>
import { IS_DEV } from '@/utils/config'
import { ref } from 'vue'
import { version } from '@/utils/config'
import { showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores/user'
import ClearCachePop from './components/ClearCachePop/ClearCachePop.vue'
import UpdatePop from './components/UpdatePop/UpdatePop.vue'
import { useRouter } from 'vue-router'
import { useFBStore } from '@/stores/fb'
import { useAppStore } from '@/stores/app'
import { langList } from '@/i18n'
import i18n from '@/i18n'
const appStore = useAppStore()
const fbStore = useFBStore()
const router = useRouter()
const user = useUserStore()
const activeIcon = ref(new URL('./img/checked.png', import.meta.url).href)
const inactiveIcon = ref(new URL('./img/unchecked.png', import.meta.url).href)
const language = computed(() => {
  return langList.find((lang) => lang.value === appStore.language)?.title
})
const goLanguage = () => {
  router.push('/LanguageSetting')
}
const goAboutUs = () => {
  router.push('/aboutus')
}
const goDeviceInfo = () => {
  router.push('/deviceinfo')
}

const confirmLogOut = () => {
  showConfirmDialog({
    title: i18n.global.t('setview.tip12')
  })
    .then(() => {
      // on confirm
      user.logOutAction(true)
    })
    .catch(() => {
      // on cancel
    })
}
// const modeState = ref(false)
// const currentIndex = ref(0)
// const list = ref([
//   { id: 1, name: i18n.global.t('setview.Csports') },
//   { id: 2, name: i18n.global.t('setview.FBsports') },
//   { id: 3, name: i18n.global.t('setview.FMsports') }
// ])

// const setCurrentIndex = (index) => {
//   currentIndex.value = index
// }

const clearCachePop = ref(null)
const updatePop = ref(null)

watchEffect(() => {
  fbStore.setSettings(fbStore.settings)
})
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}
.menu-content {
  padding: 0 15px 0px 15px;
  background-color: #fff;
  .item {
    padding-bottom: 10px;
    .area-selection {
      display: flex;
      width: 100%;
      height: 60px;
      padding: 15px 0 15px 0;
      margin-bottom: 14px;
      border-bottom: 1px solid #eee;
      .text-box {
        color: #111;

        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 28px;
      }
      .selection-box {
        display: flex;
        margin-left: auto;
        // width: 152px;
        width: auto;
        height: 28px;
        border-radius: 80px;
        background: #f5f5f5;
        .item {
          // width: 76px;
          width: auto;
          padding: 0px 5px;
          height: 28px;
          color: #111;
          text-align: center;

          font-size: 14px;
          font-weight: 400;
          line-height: 28px;
          &.active {
            border-radius: 20px;
            background: var(--color-primary);
            color: #fff;
          }
        }
      }
    }

    h4 {
      font-weight: 600;
      color: #111;
      font-size: 14px;
      line-height: 16px;
    }
    .mode-setting {
      color: #111;

      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }
  }

  .bet-setting {
    display: flex;
    padding-top: 12px;
    padding-bottom: 15px;

    .sport {
      color: #111;
      font-size: 14px;
      width: 74px;
      height: 30px;
      border-radius: 6px;
      border: 1px solid #eee;
      background: #f5f5f5;
      text-align: center;
      line-height: 30px;
      font-weight: 400;
      margin-right: 10px;
    }

    .activebtn {
      border: 1px solid #ff5000;
      background: #fff5f0;
      color: #ff5000;
    }
  }

  .bet-group {
    margin-bottom: 15px !important;
    border-bottom: 1px solid #eee;
    @at-root ::v-deep() .van-radio__label {
      color: #666;
    }

    @at-root ::v-deep() [aria-checked='true'] {
      .van-radio__label {
        color: #111;
      }
    }
  }

  .mb-15 {
    .van-radio {
      margin-bottom: 15px;
    }
  }
}
.item-box {
  margin-top: 8px;
  background-color: #fff;
  padding: 0 15px 0px 15px;

  .update-box {
    display: flex;
    .update-icon {
      width: 45px;
      height: 16px;
      margin-top: 22px;
      align-items: center;
      border-radius: 999px;
      background: var(--1, #f53f3f);
      color: var(--text-icon-font-wh-1100, #fff);
      text-align: center;

      font-size: 10px;
      font-weight: 400;
      line-height: 16px;
    }
  }
  .van-cell {
    --van-cell-font-size: 15px;
    --van-cell-line-height: 60px;
  }
}
.quit-btn {
  margin: 20px 25px;
}

.bet-group {
  margin-top: 15px;
  img {
    width: 18px;
  }
  :deep() {
    .van-radio__label {
      color: #666;
    }
  }
  :deep() {
    [aria-checked='true'] {
      .van-radio__label {
        color: #111;
      }
    }
  }
}
</style>
