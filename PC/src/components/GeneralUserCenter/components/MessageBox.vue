<template>
  <div class="announcement" v-loading="loading">
    <div class="announcement-details">
      <div><img src="../img/Frame.png" @click="handleGoback" /></div>
      <div @click="handleGoback">
        <!-- {{
          typeId * 1 === 3
            ? $t('GeneralUserCenter.Announcement')
            : $t('GeneralUserCenter.Information')
        }} {{ $t('GeneralUserCenter.Details') }} -->
        <span v-if="typeId * 1 === 3">{{ $t('GeneralUserCenter.AnnouncementDetails') }}</span>
        <span v-else>{{ $t('GeneralUserCenter.InformationDetails') }}</span>
      </div>
    </div>
    <div class="details">
      <div class="details-border">
        <div class="content-header">
          <div>{{ messageData.title }}</div>
          <div class="details-img">
            <img
              class="delete-style"
              v-show="typeId * 1 !== 3"
              @click="toSureDeleteLetter"
              src="../img/icon_dlrt.png"
            />
            <!--            <img src="../img/Vector_1.png" @click="handleViewPre" />-->
            <!--            <img src="../img/Vector_2.png" @click="handleViewNext" />-->
          </div>
        </div>
        <div>{{ messageData.sendTime || messageData.updateTime }}</div>
      </div>
      <div class="editor">
        <div class="ql-container">
          <div class="ql-editor">
            <div v-html="messageContent" class="content v-html-content"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="pop-up-layer">
      <el-dialog v-model="dialogVisible" :title="$t('GeneralUserCenter.Delete')" width="30%">
        <span>{{ $t('GeneralUserCenter.DeleteTips_1') }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button class="cancel" @click="dialogVisible = false">{{
              $t('GeneralUserCenter.Cancel')
            }}</el-button>
            <el-button class="sure" type="primary" @click="deleteLetter">
              {{ $t('GeneralUserCenter.Sure') }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAnnouncementStore } from '@/stores/announcement'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Base64 } from 'js-base64'
import {
  deleLetterApi,
  getannounceDetailApi,
  getLetterDetailApi,
  readLetterApi
} from '@/api/announcement.js'

const announcement = useAnnouncementStore()
const emit = defineEmits(['goBack'])
const props = defineProps(['messageId', 'typeId', 'idArr'])
const messageData = ref({})
// 加载
const loading = ref(true)
// 删除
const dialogVisible = ref(false)

onMounted(() => {
  getMessageDetail()
})

const getMessageDetail = (id) => {
  if (props?.['typeId'] * 1 === 3) {
    getannounceDetailApi({ id: id ?? props.messageId }).then((res) => {
      if (res?.['code'] === 200) messageData.value = res.data
      loading.value = false
    })
  } else {
    getLetterDetailApi({ id: id ?? props.messageId }).then(async (res) => {
      if (res?.['code'] === 200) {
        messageData.value = res.data
        if (res.data.status * 1 === 0) {
          readLetterApi({ id: props.messageId }).then((res) => {
            if (res?.['code'] === 200) {
              // --未读数
              minus()
            }
          })
        }
      }
    })
    loading.value = false
  }
}

const messageContent = computed(() => {
  if (messageData.value?.['content']) {
    return Base64.decode(messageData.value?.['content']) || ''
  }
})
const handleGoback = () => {
  emit('goBack')
}

function minus() {
  if (announcement.totalUnread > 0) {
    switch (Number(props?.['typeId'])) {
      case 0:
        return announcement.AllTypeTotalUnread.announceCount--
      case 1:
        return announcement.AllTypeTotalUnread.activityCount--
      case 2:
        return announcement.AllTypeTotalUnread.eventCount--
    }
  }
}

const toSureDeleteLetter = () => {
  dialogVisible.value = true
}
const deleteLetter = () => {
  dialogVisible.value = false
  loading.value = true
  deleLetterApi({ id: props.messageId }).then(() => {
    emit('goBack')
  })
}

let current = !!props?.['idArr']['length'] && props?.['idArr']['indexOf'](props.messageId)
const nextId = ref(current)

// const handleViewPre = () => {
//   console.log('current', current)
//   const pre = props?.['idArr'][current - 1]
//   console.log('pre', pre)
//   current !== 0 && getMessageDetail(pre)
// }
//
// const handleViewNext = () => {
//   console.log('current', current)
//   console.log("props?.['idArr']['length']", props?.['idArr']['length'])
//   nextId.value <= props?.['idArr']['length'] - 1 && nextId.value++
//   const next = props?.['idArr'][nextId.value]
//   console.log('nextId', nextId.value)
//   console.log('next', next)
//   nextId.value <= props?.['idArr']['length'] - 1 && getMessageDetail(next)
// }
</script>

<style lang="scss" scoped>
.announcement {
  min-height: 600px;
  .announcement-details {
    display: flex;
    width: 1240px;
    margin: 0 auto;
    padding: 30px 0 28px 0;
    div {
      cursor: pointer;
      > img {
        width: 24px;
        height: 24px;
        margin-top: 2px;
      }
    }
    div:nth-child(2) {
      margin-left: 10px;
      color: var(--100, #fff);
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }
  }

  .details {
    width: 1240px;
    margin: 0 auto;
    .details-border {
      border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      padding-bottom: 10px;
      div:nth-child(2) {
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 25px;
      }
      .content-header {
        display: flex;
        div:nth-child(1) {
          width: 100%;
          color: var(--100, #fff);
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .details-img {
          display: flex;
          align-items: center;
          gap: 28px;
          cursor: pointer;
          > img {
            width: 24px;
            height: 24px;
            margin-top: 2px;
          }
          > img.delete-style {
            margin-right: 10px;
          }
        }
      }
    }
  }
  :deep(.content) {
    p {
      color: #ffffff;
    }
    img {
      max-width: 100%;
    }
  }
}
:deep() {
  .el-loading-mask {
    background-color: transparent;
  }
  .el-button.cancel {
    border-radius: 4px;
    background: var(--unnamed, #171a2f);
    border: none;
  }
  .el-button.sure {
    border-radius: 4px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    border: none;
    color: var(--color-white, #fff);

    font-size: 14px;
    font-weight: 400;
  }
}
.v-html-content {
  font-family: PingFang SC Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
.v-html-box :deep() {
  p {
    color: var(--100, #fff) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 22px !important;
  }
  span {
    color: var(--100, #fff) !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 22px !important;
  }
}
</style>
