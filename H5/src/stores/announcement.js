import { defineStore } from 'pinia'
import {
  getLetterListApi,
  getAllUnreadApi,
  getAnnouncementListApi,
  getUnreadLetterTypeCountApi
} from '@/api/announcement.js'
import { useUserStore } from '@/stores/user.js'
import { Base64 } from 'js-base64'
import { ERR_OK } from '@/utils/config'
export const useAnnouncementStore = defineStore('announcement', () => {
  const user = useUserStore()
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
      totalUnread.value = res.data?.totalCount
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
    getLetterListApi({ letType: num }).then((res) => {
      if (res.code != 200) {
        return
      }
      if (num == 0) {
        notiList.value = res.data
        notiList.value.forEach((item) => {
          item.content = Base64.decode(item.content)
        })
      } else if (num == 1) {
        eventList.value = res.data
        eventList.value.forEach((item) => {
          item.content = Base64.decode(item.content)
        })
      } else if (num == 2) {
        sportList.value = res.data
        sportList.value.forEach((item) => {
          item.content = Base64.decode(item.content)
        })
      }
    })
  }
  // 一次性获取所有站内信+未读
  const getAllLetter = () => {
    if (!user.isLogin) {
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
        return res
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
    return announcementListData.value
      ?.filter((item) => {
        return item.annType == 0
      })
      .sort((a, b) => b.sortNum - a.sortNum)
  })
  // 充提公告
  const deposAnn = computed(() => {
    return announcementListData.value
      ?.filter((item) => {
        return item.annType == 1
      })
      .sort((a, b) => b.sortNum - a.sortNum)
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
