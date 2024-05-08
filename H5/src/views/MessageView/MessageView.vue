<template>
  <div class="outter-box">
    <NavBar :title="$t('Mletter.sitemessage')" :isShowRight="false">
      <template #right>
        <div class="header-right" @click.stop="showEdit" v-show="letType != 3">
          {{ isShowBottemBar == true ? $t('Mletter.canceledit') : $t('Mletter.edit') }}
        </div>
      </template>
    </NavBar>
    <div class="line"></div>
    <van-tabs
      :lazy-render="false"
      animated
      @click-tab="handleTabChange"
      v-model:active="letType"
      swipeable
      :ellipsis="false"
    >
      <van-tab :name="item.type" :title="`${item.unread}`" v-for="item in tablist" :key="item.type">
        <template #title>
          <van-badge :content="item.unread" :show-zero="false">
            <span>{{ item.title }}</span>
          </van-badge>
        </template>
      </van-tab>
    </van-tabs>
    <div class="loading-box" v-show="loading">
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
    </div>

    <MessageSub
      v-show="!loading"
      ref="messageSub"
      :letterListData="letterListData"
      :letType="letType"
      :translateX="translateX"
      :eventUnreadSub="eventUnreadSub"
    />

    <div class="bottem-bar" v-if="isShowBottemBar">
      <div @click="batchOper(3)">{{ $t('Mletter.Markread') }}</div>
      <img src="./img/bin.png" width="17" height="17" />
      <div class="dele-btn" @click="deleAll">{{ $t('Mletter.delete') }}</div>
    </div>

    <EditPopup ref="editPopup"></EditPopup>
  </div>
</template>

<script setup>
import MessageSub from './components/MessageSub.vue'
import eventBus from '@/utils/eventBus'
import EditPopup from './components/popup/EditPopup.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { deleLetterApi, readAllLetterApi, deleAllLetterApi } from '@/api/announcement.js'
import { showConfirmDialog } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/i18n'
import { showToast } from 'vant'
const route = useRoute()
const router = useRouter()
const announcement = useAnnouncementStore()
const messageSub = ref(null)
// 加载状态
const loading = ref(false)
const letType = ref(0) // 站内信类型
const tablist = computed(() => {
  return [
    {
      title: i18n.global.t('Mletter.announce'),
      type: '3',
      unread: 0
    },
    {
      title: i18n.global.t('Mletter.notify'),
      type: '0',
      unread: announcement.AllTypeTotalUnread.announceCount
    },
    {
      title: i18n.global.t('Mletter.Activity'),
      type: '1',
      unread: announcement.AllTypeTotalUnread.activityCount
    },
    {
      title: i18n.global.t('Mletter.Eventannounce'),
      type: '2',
      unread: announcement.AllTypeTotalUnread.eventCount
    }
  ]
})
// 消息列表
const letterListData = computed(() => {
  switch (Number(letType.value)) {
    case 0:
      return announcement.notiList
    case 1:
      return announcement.eventList
    case 2:
      return announcement.sportList
    case 3:
      return announcement.announcementListData
  }
})
// 计算二级菜单未读
const eventUnreadSub = computed(() => {
  let unreadList = [0, 0, 0]
  letterListData.value?.forEach((item) => {
    if (item.status == 0) {
      unreadList[item.gameType]++
    }
  })
  return unreadList
})
// 数据初始化
init()
function init() {
  announcement.getUnreadLetterTypeCount()
  getList()
}
function getList() {
  const currentURLLetterType = route.query.type
  if (!currentURLLetterType) {
    letType.value = 3
  } else {
    letType.value = currentURLLetterType
  }
  geOnetLetterList(letType.value)
}
// 获取单个类型的站内信
async function geOnetLetterList(type) {
  if (type == 3) {
    await announcement.getAnnouncementList()
  } else {
    await announcement.getLetterList(type)
  }
}

const handleTabChange = ({ name }) => {
  geOnetLetterList(name)
  letType.value = name
  router.replace({ name: 'message', query: { type: name } })
  currentMassageType.value = 0
}

// 单独删除
eventBus.on('toDeleLetter', (id) => {
  deleLetterApi({ id: id })
})
// 批量操作  mode = 0（批量已读）1（批量删除已读）2（批量删除选中） 3(已读选中项)
eventBus.on('toBatchOper', (mode) => {
  batchOper(mode)
})
eventBus.on('switchShowBottemBar', () => {
  isShowBottemBar.value = !isShowBottemBar.value
})
// 确认删除弹窗
eventBus.on('toDeleAll', () => {
  deleAll()
})

const batchOper = async (mode) => {
  if (mode == 0) {
    let ids = []
    letterListData.value.forEach((item) => {
      ids.push(item.id)
    })
    await readAllLetterApi({ ids })
    await geOnetLetterList(letType.value)
    announcement.getUnreadLetterTypeCount()
    showToast(i18n.global.t('Mletter.OperationSuccessful'))
    isShowBottemBar.value = false
  }
  if (mode == 1) {
    let ids = []
    letterListData.value.forEach((item) => {
      if (item.status == 1) {
        ids.push(item.id)
      }
    })
    await deleAllLetterApi({ ids })
    await geOnetLetterList(letType.value)
    announcement.getUnreadLetterTypeCount()
    showToast(i18n.global.t('Mletter.OperationSuccessful'))
    isShowBottemBar.value = false
  }
  if (mode == 2) {
    let ids = []
    letterListData.value.forEach((item) => {
      if (item.check) {
        ids.push(item.id)
      }
    })
    await deleAllLetterApi({ ids })
    await geOnetLetterList(letType.value)
    announcement.getUnreadLetterTypeCount()
    showToast(i18n.global.t('Mletter.OperationSuccessful'))
    isShowBottemBar.value = false
  }
  if (mode == 3) {
    let ids = []
    letterListData.value.forEach((item) => {
      if (item.check == true) {
        ids.push(item.id)
      }
    })
    await readAllLetterApi({ ids })
    await geOnetLetterList(letType.value)
    announcement.getUnreadLetterTypeCount()
    showToast(i18n.global.t('Mletter.OperationSuccessful'))
    isShowBottemBar.value = false
  }
}

//切换二层筛选栏
const currentMassageType = ref(0)
provide('messageSubType', currentMassageType)

// 编辑弹窗开关
const editPopup = ref(null)
const showEdit = () => {
  if (isShowBottemBar.value) {
    isShowBottemBar.value = false
    letterListData.value.forEach((item) => {
      item.check = false
    })
  } else {
    editPopup.value.switchShow()
  }
}
// 底部删除栏显示开关
const isShowBottemBar = ref(false)

// 控制信息位置
const translateX = computed(() => {
  if (!isShowBottemBar.value) {
    return '0'
  } else {
    return '-14vw'
  }
})

const deleAll = () => {
  showConfirmDialog({
    title: i18n.global.t('Mletter.Kindtips1'),
    message: i18n.global.t('Mletter.Kindtips2'),
    confirmButtonText: i18n.global.t('Mletter.sure'),
    cancelButtonText: i18n.global.t('Mletter.cancel'),
    className: 'message-confirom'
  })
    .then(() => {
      batchOper(2)
      showEdit()
    })
    .catch(() => {
      console.log('取消')
    })
}

onUnmounted(() => {
  eventBus.off('toDeleLetter')
  eventBus.off('toBatchOper')
  eventBus.off('switchShowBottemBar')
  eventBus.off('toDeleAll')
})
</script>

<style lang="scss" scoped>
:deep() {
  .van-badge--top-right {
    transform: translate(100%, -50%);
  }
}
.outter-box {
  overflow: hidden;
}
.header-right {
  color: var(--neutral-basic, #333);

  font-size: 16px;
  font-weight: 400;
}
.line {
  height: 0.5px;
  background: #f5f5f5;
}
.content-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 113vw;
  gap: 15px;
  height: 675px;
  padding: 15px 7px 0 8px;
  background: #f7f7f7;
  color: #111;
  font-size: 14px;
  font-weight: 400;
  overflow-y: auto;
  overflow-x: hidden;
  .massage-container {
    position: relative;
    width: 361px;
    padding: 8px 10px 10px 10px;
    border-radius: 10px;
    border: 0.5px solid #eee;
    background: #fff;
    .title {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 24px;
      font-weight: 400;
      .logo {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      }
      .tit {
        flex: 1;
      }
    }
    .time-row {
      height: 28px;
      padding: 4px 0 0 42px;
      border-bottom: 0.5px solid #eee;
      color: #999;
      font-size: 12px;
      font-weight: 400;
    }
    .main-content {
      padding-top: 10px;
      line-height: 1.5;
    }
  }
  .empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    padding-top: 88px;
    color: #999;
  }
}
.content-row {
  gap: 10px;
  display: flex;
  position: relative;
}
.massage-container::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 18px;
  top: 11px;
  left: 0;
  border-radius: 0px 60px 60px 0px;
  background: #ff5000;
}
.type-btn-row {
  display: flex;
  gap: 22px;
  height: 28px;
  width: 100%;
  .type-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 28px;
    border-radius: 60px;
    background: rgb(238, 238, 238);
  }
  .type-btn.active {
    border: 0.5px solid #ff5000;
    background: #fff5f0;
    color: #ff5000;
  }
}
.bottem-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 375px;
  height: 48px;
  padding: 0 19px 0 15px;
  background: #fff;
  box-shadow: 0px -2px 8px 1px rgba(0, 0, 0, 0.2);
  img {
    margin-left: auto;
  }
  .dele-btn {
    color: var(--1, #f53f3f);
  }
}
.opacity {
  opacity: 0.5;
}

.loading-box {
  margin-top: -15px;
}
:deep() {
  .van-skeleton__content {
    margin-top: 30px;
  }
  .van-tab--active {
    color: #ff5000;
    font-weight: 600;
  }
}
</style>
<style lang="scss">
.message-confirom {
  .van-dialog__header {
    color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
    text-align: center;

    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
  }
  .van-dialog__message {
    padding: 0px;
    color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
    text-align: center;

    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    border: none;
  }
  .van-dialog__footer {
    justify-content: center;
    align-items: center;
    gap: 12px;
    height: 88px;
    box-shadow: none !important;
    border: none !important;
    padding: 0 24px 0 24px;
  }
  .van-hairline--top:after {
    border: none;
  }

  .van-button {
    height: 40px;
  }
  .van-dialog__cancel {
    border-radius: 6px;
    background: var(--4, #fff5f0);
    color: var(--2, #ff5000);
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  .van-dialog__confirm {
    opacity: 1;
    border-radius: 6px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    color: var(--text-icon-font-wh-1100, #fff);
    text-align: center;

    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }
}
i {
  padding: 0 !important;
}
</style>
