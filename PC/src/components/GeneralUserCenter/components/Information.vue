<template>
  <div class="main-container Information">
    <div class="empty-icon" v-if="currentDisplay.length === 0">
      <NoList />
    </div>
    <div>
      <div class="possession" v-if="!showMessageBox">
        <!-- 信息分类头列表 -->
        <div class="possession-header">
          <el-badge
            v-for="(item, index) in btnDate"
            :key="index"
            :hidden="!item.unread"
            :value="item.unread"
            class="item"
            :class="{ active: currentType == item.value }"
          >
            <div @click="changeType(item)">
              {{ item.label }}
            </div>
          </el-badge>
        </div>

        <!-- 信息列表 -->
        <div class="message-container">
          <!-- loading -->
          <div class="loading-overlay" v-show="loading">
            <div class="loading-gif"></div>
          </div>

          <!-- 公告分类头 普通公告|充值公告 -->
          <div class="announcement-selector" v-if="currentType == 3">
            <div
              class="small-text"
              @click="changeSecType(0)"
              :class="{ 'selected-text': secondType == 0 }"
            >
              {{ $t('GeneralUserCenter.GeneralAnnouncement') }}
            </div>
            <div
              class="small-text"
              @click="changeSecType(1)"
              :class="{ 'selected-text': secondType == 1 }"
            >
              {{ $t('GeneralUserCenter.RechargeAnnouncement') }}
            </div>
          </div>
          <!-- 赛事公告分类头 V体育|FB体育|DB体育  -->
          <div class="sport-selector" v-if="currentType == 2">
            <div
              class="small-text"
              @click="changeSecType(0)"
              :class="{ 'selected-text': secondType == 0 }"
            >
              {{ $t('GeneralUserCenter.Csport') }}
            </div>
            <div
              class="small-text"
              @click="changeSecType(1)"
              :class="{ 'selected-text': secondType == 1 }"
            >
              {{ $t('GeneralUserCenter.FBsport') }}
            </div>
            <div
              class="small-text"
              @click="changeSecType(2)"
              :class="{ 'selected-text': secondType == 2 }"
            >
              {{ $t('GeneralUserCenter.DBsport') }}
            </div>
          </div>

          <!-- items -->
          <div class="possession-central" v-for="(item, index) in currentDisplay" :key="index">
            <div class="possession-border">
              <div class="central-back">
                <div v-show="isEdit" class="checkbox"><el-checkbox v-model="item.check" /></div>
                <div
                  v-show="!isEdit && currentType != 3"
                  class="dot"
                  :class="{ readed: Number(item.status) }"
                ></div>
              </div>
              <div class="central-header" @click="toMessage(item)">
                <div>{{ item.title }}</div>
                <div class="logo" v-if="item.logo == 1">
                  {{ $t('GeneralUserCenter.Important') }}
                </div>
                <div class="letter-date">{{ item.sendTime || item.updateTime }}</div>
              </div>
              <div class="central-content" @click="toMessage(item)">
                {{ item.preContent }}
              </div>
            </div>
          </div>
        </div>

        <div class="foot-Pagination">
          <div class="foot-button" v-show="currentType != 3">
            <div @click="readAll">{{ $t('GeneralUserCenter.AllRead') }}</div>
            <div @click="dialogVisible = true">{{ $t('GeneralUserCenter.DeleteRead') }}</div>
            <div @click="openEdit">{{ $t('GeneralUserCenter.Edit') }}</div>
            <div v-show="isEdit" class="blue-text" @click="checkAllRead">
              {{ $t('GeneralUserCenter.MarkAsRead') }}
            </div>
            <div v-show="isEdit" class="blue-text" @click="dialogVisible = true">
              {{ $t('GeneralUserCenter.Delete') }}
            </div>
            <div v-show="isEdit" class="blue-text" @click="closeEdit">
              {{ $t('GeneralUserCenter.Cancel') }}
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              background
              :current-page="currentPage"
              layout="prev, pager, next"
              :page-size="5"
              :total="total"
              :hide-on-single-page="total <= 5"
              @current-change="changePage"
            />
          </div>
        </div>
        <!-- 弹出框 -->
        <div class="pop-up-layer">
          <el-dialog v-model="dialogVisible" :title="$t('GeneralUserCenter.Cancel')" width="30%">
            <span>{{ $t('GeneralUserCenter.DeleteTips_1') }}</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button class="cancel" @click="dialogVisible = false">{{
                  $t('GeneralUserCenter.Cancel')
                }}</el-button>
                <el-button class="sure" type="primary" @click="toDele">
                  {{ $t('GeneralUserCenter.Sure') }}
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
      <div class="message-box" v-else>
        <MessageBox
          :messageId="messageId"
          :idArr="idArr"
          :typeId="currentType"
          @goBack="goBack"
        ></MessageBox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import MessageBox from './MessageBox.vue'
import { useAnnouncementStore } from '@/stores/announcement'
import NoList from '@/components/NoList/NoList.vue'
import { readAllletterApi, deleAllLetterApi } from '@/api/announcement.js'

// 编辑
const isEdit = ref(false)
// 一级类型按钮
const currentType = ref(3)
const idArr = ref([])
// 删除已读
const dialogVisible = ref(false)
// 消息详情
const showMessageBox = ref(false)
const messageId = ref()
const loading = ref(true)
// 分页器
const currentPage = ref(1)
// 二级类型按钮
const secondType = ref(0)
const showListNum = ref([0, 5])
const announcement = useAnnouncementStore()
// 确认按钮
const toDele = () => {
  !!isEdit.value ? batchDele() : deleAllRead()
}
// 批量删除
const batchDele = () => {
  let ids = []
  currentDisplay.value.forEach((item) => {
    if (item.check === true) {
      ids.push(item.id)
    }
  })
  if (ids.length === 0) {
    ElMessage.success(i18n.global.t('GeneralUserCenter.chooseLetter'))
    dialogVisible.value = false
    return
  }
  deleAllLetterApi({ ids }).then(() => {
    getLetterList()
    ElMessage.success(i18n.global.t('GeneralUserCenter.SuccessfullyDeleted'))
    dialogVisible.value = false
    closeEdit()
    announcement.getUnreadLetterTypeCount()
  })
}
// 批量选中已读
const checkAllRead = () => {
  let ids = []
  currentTypeList.value.forEach((item) => {
    if (item.check) {
      ids.push(item.id)
    }
  })
  if (ids.length === 0) {
    ElMessage.success(i18n.global.t('GeneralUserCenter.NoLetterToRead'))
    dialogVisible.value = false
    return
  }
  readAllletterApi({ ids }).then(() => {
    getLetterList()
    ElMessage.success(i18n.global.t('GeneralUserCenter.AllReaded'))
    announcement.getUnreadLetterTypeCount()
  })
}
// 删除所有已读
const deleAllRead = () => {
  let ids = []
  currentTypeList.value.forEach((item) => {
    if (item.status == 1) {
      ids.push(item.id)
    }
  })
  if (ids.length === 0) {
    ElMessage.success(i18n.global.t('GeneralUserCenter.NoLetterisRead'))
    dialogVisible.value = false
    return
  }
  deleAllLetterApi({ ids }).then(() => {
    getLetterList()
    ElMessage.success(i18n.global.t('GeneralUserCenter.SuccessfullyDeleted'))
    dialogVisible.value = false
    announcement.getUnreadLetterTypeCount()
  })
}
// 全部已读
const readAll = () => {
  let ids = []
  currentTypeList.value.forEach((item) => {
    ids.push(item.id)
  })
  if (ids.length === 0) {
    dialogVisible.value = false
    return
  }
  readAllletterApi({ ids }).then(() => {
    getLetterList()
    ElMessage.success(i18n.global.t('GeneralUserCenter.AllReaded'))
    announcement.getUnreadLetterTypeCount()
  })
}

const openEdit = () => {
  isEdit.value = true
}

const closeEdit = () => {
  isEdit.value = false
  currentDisplay.value.forEach((item) => {
    item.check = false
  })
}

onMounted(async () => {
  announcement.getUnreadLetterTypeCount()
  await announcement.getAnnouncementList()
  loading.value = false
})
// 普通公告
const normalAnn = computed(() => {
  return announcement.normalAnn || []
})
// 充提公告
const deposAnn = computed(() => {
  return announcement.deposAnn || []
})
// 通知站内信
const notiList = computed(() => {
  return announcement.notiList || []
})
// 活动站内信
const eventList = computed(() => {
  return announcement.eventList || []
})
// 赛事站内信
const sportList = computed(() => {
  return announcement.sportList || []
})
// 当前显示内容
const currentTypeList = computed(() => {
  let temp = []
  if (currentType.value == 3) {
    if (secondType.value == 0) {
      temp = normalAnn.value
    } else {
      temp = deposAnn.value
    }
  }
  if (currentType.value == 1) {
    temp = eventList.value
  }
  if (currentType.value == 0) {
    temp = notiList.value
  }
  if (currentType.value == 2) {
    if (secondType.value == 0) {
      temp = sportList.value.filter((item) => {
        return item.gameType == 0
      })
    } else if (secondType.value == 1) {
      temp = sportList.value.filter((item) => {
        return item.gameType == 1
      })
    } else {
      temp = sportList.value.filter((item) => {
        return item.gameType == 2
      })
    }
  }
  return temp
})

const currentDisplay = computed(() => {
  idArr.value = []
  let temp = currentTypeList.value
  temp = temp.slice(showListNum.value[0], showListNum.value[1])
  temp.forEach((item) => {
    item.check = false
    idArr.value.push(item.id)
    item.preContent = item.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
    if (item.content.length > 80) item.preContent = item.preContent.slice(0, 70) + '...'
  })
  return temp
})

// 获取数据
const getLetterList = () => {
  if (currentType.value === 3) {
    announcement.getAnnouncementList()
  } else {
    announcement.getLetterList(currentType.value)
  }
}

const changeType = async (n) => {
  console.log('关闭啊')
  closeEdit()
  currentType.value = n.value
  secondType.value = 0
  loading.value = true
  getLetterList()
  loading.value = false
}

const btnDate = computed(() => {
  return [
    {
      label: i18n.global.t('GeneralUserCenter.Announcement'),
      value: 3
    },
    {
      label: i18n.global.t('GeneralUserCenter.Activity'),
      value: 1,
      unread: announcement.AllTypeTotalUnread.activityCount
    },
    {
      label: i18n.global.t('GeneralUserCenter.Notify'),
      value: 0,
      unread: announcement.AllTypeTotalUnread.announceCount
    },
    {
      label: i18n.global.t('GeneralUserCenter.EventAnnouncement'),
      value: 2,
      unread: announcement.AllTypeTotalUnread.eventCount
    }
  ]
})

function changeSecType(n) {
  secondType.value = n
}

const total = computed(() => {
  return currentTypeList.value.length
})

const changePage = (n) => {
  getLetterList()
  currentPage.value = n
  showListNum.value[0] = (n - 1) * 5
  showListNum.value[1] = n * 5
}

function toMessage(item) {
  messageId.value = item.id
  showMessageBox.value = true
  closeEdit()
}
// 返回
function goBack() {
  getLetterList()
  setTimeout(() => {
    showMessageBox.value = false
  }, 300)
}
</script>

<style lang="scss" scoped>
.message-container {
  position: relative;
  margin-top: 30px;
  height: 480px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f35f1b;
  // fill: var(--60, rgba(255, 255, 255, 0.6));
}
.readed.dot {
  background-color: rgba(255, 255, 255, 0.6);
}
.announcement-selector,
.sport-selector {
  display: flex;
  align-items: center;
  width: 1214px;
  height: 36px;
  padding-left: 30px;
  margin-top: 30px;
  gap: 40px;
  border-top: 1px solid var(--20, rgba(255, 255, 255, 0.2));
  background: var(--unnamed, #171a2f);
  .small-text {
    color: var(--40, rgba(255, 255, 255, 0.4));
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
  }

  .small-text.selected-text {
    color: var(--100, #fff);
    font-weight: 500;
  }
}

.Information {
  position: relative;
  min-width: 1320px;
  margin-top: 5px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  background: #272b45;
  border-radius: 8px;
  padding-bottom: 30px;
  .possession {
    margin-left: 60px;
    .possession-header {
      display: flex;
      padding-top: 40px;
      .item {
        min-width: 112px;
        width: auto;
        padding: 0 10px;
        height: 40px;
        text-align: center;
        justify-content: center;
        align-items: center;
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px;
        border-radius: 4px;
        border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
        margin-right: 20px;
        cursor: pointer;
      }

      .active {
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
        color: #fff;
        border: none;
        width: auto;
        border-radius: 4px;
        margin-right: 20px;
        padding: 0 10px;
      }
    }

    .possession-central {
      width: 100%;
      padding-top: 10px;
      padding-left: 10px;
      height: 79px;
      cursor: pointer;
      div:nth-child(3) {
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
      }

      .possession-border {
        width: 96%;
        border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
        padding-bottom: 15px;
        position: relative;
        .central-back {
          position: absolute;
          height: 100%;
          width: 31px;
          top: 28px;
          left: -25px;
        }

        .central-header {
          display: flex;
          gap: 15px;
          align-items: center;
          div:nth-child(1) {
            color: var(--100, #fff);
            font-size: 14px;
            font-weight: 500;
            line-height: 40px;
            cursor: pointer;
          }
          .logo {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            // width: 36px;
            width: auto;
            padding: 0 5px;
            height: 19px;
            border-radius: 2px;
            background: var(--unnamed, #ff9000);
            color: #fff;
            font-size: 12px;
          }
          .logo::before {
            content: '';
            position: absolute;
            left: -4px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 3px 4px 3px 0;
            border-color: transparent var(--unnamed, #ff9000) transparent transparent;
          }
          .letter-date {
            margin-left: auto;
            color: var(--60, rgba(255, 255, 255, 0.6));
            font-size: 12px;
          }
        }
      }
    }

    .foot-Pagination {
      padding-top: 20px;
      display: flex;
      position: relative;
      .foot-button {
        display: flex;
        color: var(--unnamed, #f35f1b);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        div {
          margin-right: 30px;
          cursor: pointer;
        }
      }
      .pagination {
        position: absolute;
        right: 48px;
      }
    }
  }
}

.cancel,
.sure {
  border: none;
  background-color: var(--unnamed, #171a2f);
}

.empty-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  img {
    width: 137px;
    height: 144px;
  }
}

.blue-text {
  color: #409eff;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #272b45;
  z-index: 1000;
  .loading-gif {
    position: relative;
    margin: 250px auto;
    border: 8px solid #404566;
    border-top: 8px solid rgb(24, 26, 44);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.checkbox {
  position: relative;
  top: -3px;
  left: -3px;
}

:deep() {
  .is-checked .el-checkbox__inner {
    background-color: #f35f1b;
    border: none;
  }

  .el-dialog {
    --el-dialog-width: 25% !important;
    --el-dialog-margin-top: 36vh;
    --el-dialog-bg-color: #232949;
    border-radius: 8px;
  }

  .el-dialog__header {
    margin-right: 0;
    background-color: #323c6f;
    border-radius: 8px 8px 0 0;
    padding: 10px 0 10px 20px;
  }

  .el-dialog__headerbtn {
    position: absolute;
    top: -2px;
  }

  .el-dialog__title {
    color: var(--100, #fff);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
  }

  .el-dialog__body {
    color: var(--60, rgba(255, 255, 255, 0.6));
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.01px;
  }

  .el-button {
    color: var(--40, rgba(255, 255, 255, 0.4));
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .el-button:hover {
    background-color: #f35f1b !important;
    border: none;
    color: var(--color-white, #fff) !important;
  }

  .el-select .el-input__wrapper.is-focus {
    box-shadow: none;
  }

  .el-select el-input.is-focus .el-input__wrapper {
    box-shadow: none;
  }

  .el-select {
    --el-select-border-color-hover: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pager li {
    color: var(--60, rgba(255, 255, 255, 0.6));
    background-color: #272b45;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pager li.is-active {
    color: #f35f1b;
  }

  .el-pager li:hover {
    color: #f35f1b;
    border: 1px solid #f35f1b;
  }

  .el-pagination button.is-disabled,
  .el-pagination button:disabled {
    background-color: #272b45;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pagination button {
    background-color: #272b45;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--60, rgba(255, 255, 255, 0.6));
  }

  .el-input__wrapper {
    background-color: #272b45;
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .el-pagination {
    --el-pagination-hover-color: #f35f1b;
  }

  .el-pagination.is-background .el-pager li.is-active {
    color: #f35f1b;
    border: 1px solid #f35f1b;
    // background-color: var(--100, #fff);
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: #272b45;
    color: var(--100, #fff);
  }
}
</style>
