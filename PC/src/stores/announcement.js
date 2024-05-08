import { defineStore } from 'pinia'
import {
  getLetterListApi,
  getAllUnreadApi,
  getAnnouncementListApi,
  getUnreadLetterTypeCountApi
} from '@/api/announcement.js'
import { useUserStore } from '@/stores/user.js'
import { Base64 } from 'js-base64'

export const useAnnouncementStore = defineStore('announcement', () => {
  const user = useUserStore()
  const isLogin = computed(() => user.isLogin)

  // // 站内信 通知
  const notiList = ref([])
  // // 站内信 活动
  const eventList = ref([])
  // //  站内信 赛事公告
  const sportList = ref([])
  // 未读总数量
  const totalUnread = ref(0)
  const AllTypeTotalUnread = reactive({
    activityCount: 0,
    announceCount: 0,
    eventCount: 0
  })
  watchEffect(() => {
    // 有消息更新时，重新计算总未读数
    totalUnread.value =
      AllTypeTotalUnread.activityCount +
      AllTypeTotalUnread.announceCount +
      AllTypeTotalUnread.eventCount
  })
  // 获取总未读数量
  const getAllUnread = () => {
    if (!user.isLogin) {
      return
    }
    getAllUnreadApi().then((res) => {
      totalUnread.value = res.data.totalCount
    })
  }

  // 获取各类型消息未读数
  const getUnreadLetterTypeCount = () => {
    getUnreadLetterTypeCountApi().then((res) => {
      if (res.code === ERR_OK) {
        const { activityCount, announceCount, eventCount } = res.data
        AllTypeTotalUnread.activityCount = activityCount
        AllTypeTotalUnread.announceCount = announceCount
        AllTypeTotalUnread.eventCount = eventCount
      }
    })
  }

  // 获取站内信
  const getLetterList = (num) => {
    return getLetterListApi({ letType: num }).then((res) => {
      if (res.code != 200) {
        return
      }
      res.data.sort((a, b) => {
        if (a.status === '0' && b.status !== '0') {
          return -1
        } else if (a.status !== '0' && b.status === '0') {
          return 1
        } else {
          return 0
        }
      })
      if (num == 0) {
        notiList.value = res.data
        notiList.value.forEach((item) => {
          item.content = Base64.decode(item.content)
          item.check = false
        })
      } else if (num == 1) {
        eventList.value = res.data
        eventList.value.forEach((item) => {
          item.content = Base64.decode(item.content)
          item.check = false
        })
      } else {
        sportList.value = res.data
        sportList.value.forEach((item) => {
          item.content = Base64.decode(item.content)
          item.check = false
        })
      }
    })
  }
  // 一次性获取所有站内信+未读
  const getAllLetter = () => {
    if (!isLogin.value) {
      return
    }
    getLetterList(0)
    getLetterList(1)
    getLetterList(2)
  }

  // 公告
  const announcementListData = ref(null)
  // 获取公告
  const getAnnouncementList = () => {
    getAnnouncementListApi()
      .then((res) => {
        announcementListData.value = res.data
        announcementListData.value.forEach((item) => {
          item.content = Base64.decode(item.content)
        })
        announcementListData.value.sort((a, b) => b.sortNum - a.sortNum)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // 所有公告
  const announcementList = computed(() => {
    if (announcementListData.value) {
      return announcementListData.value
    }
  })
  // 普通公告
  const normalAnn = computed(() => {
    return announcementListData.value?.filter((item) => {
      return item.annType == 0
    })
  })
  // 充提公告
  const deposAnn = computed(() => {
    return announcementListData.value?.filter((item) => {
      return item.annType == 1
    })
  })

  return {
    announcementList,
    announcementListData,
    normalAnn,
    deposAnn,
    notiList,
    eventList,
    sportList,
    totalUnread,
    AllTypeTotalUnread,
    getLetterList,
    getAllLetter,
    getUnreadLetterTypeCount,
    getAnnouncementList,
    getAllUnread
  }
})
